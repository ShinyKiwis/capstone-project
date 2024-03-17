"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import {
  Button,
  Input,
  MultiSelect,
  NativeSelect,
  NumberInput,
  TextInput,
} from "@mantine/core";
import MantineRichText from "@/app/_components/MantineRichText";
import ProfileSelector from "@/app/_components/ProfileSelector";
import { StudentProfileSelector } from "@/app/_components";
import { ScrollArea } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { GeneralDataContext } from "@/app/providers/GeneralDataProvider";
import { InputLabel, InputFieldTitle } from "../ProjCEComponents";

const CreateProject = () => {
  // Background data initialization
  const generalDataValues = useContext(GeneralDataContext);
  if (!generalDataValues) return <div>Fetching general data...</div>;

  const { supervisorOpts, projectStages, programBranches } = generalDataValues;
  const programOptions = programBranches.map((progbranch) => {
    return {
      label: progbranch.name,
      value: progbranch.id.toString(),
    };
  });
  function getBranchOptions() {
    let programIds: string[] = form.values.majors;
    if (Array.isArray(programIds) && programIds.length === 0) return [];
    if (programBranches.length === 0) return [];

    const programBranchesFiltered = programBranches.filter((program) =>
      programIds.includes(program.id.toString()),
    );

    const branchesArrays = programBranchesFiltered.map(
      (program) => program.branches,
    );

    // Find common branches
    const commonBranches = branchesArrays.reduce(
      (accumulator, currentBranches) => {
        return accumulator.filter((branch) =>
          currentBranches.some(
            (currentBranch) => currentBranch.id === branch.id,
          ),
        );
      },
    );

    const mappedBranches = commonBranches.map((branch) => ({
      label: branch.name,
      value: branch.id.toString(),
    }));

    return mappedBranches;
  }

  const form = useForm<ProjectFormProps>({
    initialValues: {
      name: "",
      stage: "1",
      majors: [],
      branches: [],
      supervisors: [],
      limit: "1",
      students: [],
      description: "",
      tasks: "",
      references: "",
      requirements: "",
      status: "WAITING_FOR_DEPARTMENT_HEAD",
      semester: {
        year: 2023,
        no: 2,
      },
      owner: { id: 3 },
    },
    validate: {
      name: (value) => (value.length < 1 ? "Project title is required" : null),
      majors: (value) =>
        value.length < 1 ? "Must select at least 1 Program" : null,
      branches: (value) =>
        value.length < 1 ? "Must select at least 1 Branch" : null,
      description: (value) =>
        value.length < 1 ? "Description can not be empty" : null,
      tasks: (value) => (value.length < 1 ? "Tasks can not be empty" : null),
      references: (value) =>
        value.length < 1 ? "References can not be empty" : null,
      supervisors: (value) =>
        value.length < 1 ? "Must select at least 1 Instructor" : null,
    },
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  async function handleFormSubmit(values: any) {
    // Check fields
    if (form.validate().hasErrors) {
      console.error("Form validation failed");
      return;
    }

    // Transform data according to api's requirements
    let newProjectBody = { ...values };
    newProjectBody.majors = values.majors.map((majorid: string) => {
      return { id: majorid };
    });
    newProjectBody.branches = newProjectBody.branches.map(
      (branchid: string) => {
        return { id: branchid };
      },
    );
    newProjectBody.supervisors = newProjectBody.supervisors.map(
      (supervisorid: string) => {
        return { id: supervisorid };
      },
    );
    newProjectBody.students = newProjectBody.students.map((jsonVal: string) => {
      return { userId: JSON.parse(jsonVal).userId };
    });
    newProjectBody.stage = parseInt(newProjectBody.stage);
    newProjectBody.limit = parseInt(newProjectBody.limit);
    delete newProjectBody.requirements; // API currently dont work with reqs

    console.log("Submit:", newProjectBody);
    axios
      .post("http://localhost:3500/projects", newProjectBody)
      .then((res) => {
        console.log("Project submitted successful");
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
        router.push(
          `/project?project=${newProjectBody.stage === 1 ? "specialized" : "capstone"}`,
        );
      })
      .catch((error) => {
        console.error("Error posting project:", error.response);
      });
  }

  // Main return
  return (
    <div className="h-full w-full bg-white">
      <ScrollArea h={"100%"} type="scroll" offsetScrollbars>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {/* title section */}
          <TextInput
            variant="unstyled"
            placeholder="Input project title"
            classNames={{
              input: "max-h-[5em] text-center text-3xl font-semibold",
              wrapper: "border-b-2 py-2 pb-4 pt-8 focus:outline-none",
            }}
            {...form.getInputProps("name")}
          />

          <div className="mt-8 w-full">
            {/* metadata table & req section */}
            <div className="flex h-fit gap-4">
              <div className="flex w-1/3 flex-col gap-4">
                <InputFieldTitle title="Project's information" />
                <TextInput
                  label="Project ID"
                  disabled
                  value={"System generated"}
                />
                <TextInput
                  label="Project owner"
                  disabled
                  value={"current user's name"}
                />
                <NativeSelect
                  label="Project Stage"
                  data={projectStages.map((stage) => {
                    return {
                      label: stage.name,
                      value: stage.id.toString(),
                    };
                  })}
                  aria-placeholder="Select project stage"
                  required
                  {...form.getInputProps("stage")}
                />
                <MultiSelect
                  label="Program"
                  placeholder="Pick project program"
                  data={programOptions}
                  required
                  {...form.getInputProps("majors")}
                  onChange={(val) => {
                    form.getInputProps("majors").onChange(val);
                    form.setValues({ branches: [] });
                  }}
                />
                <MultiSelect
                  label="Branch"
                  placeholder={
                    form.values.majors.length < 1
                      ? "Select program(s) first"
                      : "Select available branches"
                  }
                  data={getBranchOptions()}
                  required
                  {...form.getInputProps("branches")}
                />
                <NumberInput
                  label="Number of members"
                  defaultValue={1}
                  min={1}
                  max={20}
                  clampBehavior="strict"
                  required
                  {...form.getInputProps("limit")}
                />
              </div>
              <div className="w-2/3">
                <div className="flex h-full flex-col">
                  <InputFieldTitle title="Requirements" />
                  <MantineRichText
                    content={form.getInputProps("requirements").value}
                    onChange={form.getInputProps("requirements").onChange}
                    error={form.getInputProps("requirements").error}
                  />
                </div>
              </div>
            </div>

            {/* instructors and desc section */}
            <div className="mt-4 flex h-fit gap-4">
              <div className="h-fit min-h-[16rem] w-1/3">
                <InputFieldTitle title="Instructors" required />
                <ProfileSelector
                  onChange={form.getInputProps("supervisors").onChange}
                  value={form.getInputProps("supervisors").value}
                  error={form.getInputProps("supervisors").error}
                  optionsData={supervisorOpts}
                  placeholder="Search instructor name, id"
                />
              </div>

              <div className="w-2/3">
                <div className="flex h-full flex-col">
                  <InputFieldTitle title="Description" required />
                  <MantineRichText
                    content={form.getInputProps("description").value}
                    onChange={form.getInputProps("description").onChange}
                    error={form.getInputProps("description").error}
                  />
                </div>
              </div>
            </div>

            {/* Members and tasks section */}
            <div className="mt-4 flex h-fit gap-4">
              <div className="h-fit min-h-[16rem] w-1/3">
                <InputFieldTitle title="Members" />
                <StudentProfileSelector
                  onChange={form.getInputProps("students").onChange}
                  value={form.getInputProps("students").value}
                  placeholder="Search student name, id"
                  searchApi="http://localhost:3500/users/students"
                />
              </div>

              <div className="w-2/3">
                <div className="flex h-full flex-col">
                  <InputFieldTitle title="Tasks/Missions" required />
                  <MantineRichText
                    content={form.getInputProps("tasks").value}
                    onChange={form.getInputProps("tasks").onChange}
                    error={form.getInputProps("tasks").error}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex h-fit gap-4">
              <div className="h-64 w-1/3"></div>
              <div className="w-2/3">
                <div className="flex h-full flex-col">
                  <InputFieldTitle title="References" required />
                  <MantineRichText
                    content={form.getInputProps("references").value}
                    onChange={form.getInputProps("references").onChange}
                    error={form.getInputProps("references").error}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pb-4 pt-4">
            <Button
              type="submit"
              color="lime"
              onClick={() => {
                form.values.status = "WAITING_FOR_DEPARTMENT_HEAD";
                handleFormSubmit(form.values);
              }}
            >
              Submit for approval
            </Button>
            <Button
              type="submit"
              onClick={() => {
                form.values.status = "DRAFT";
                handleFormSubmit(form.values);
              }}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </ScrollArea>
    </div>
  );
};

export default CreateProject;
