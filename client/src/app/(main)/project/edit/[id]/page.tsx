"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  MultiSelect,
  NativeSelect,
  NumberInput,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import MantineRichText from "@/app/_components/UserAction/MantineRichText";
import ProfileSelector from "@/app/_components/UserAction/ProfileSelector";
import { StudentProfileSelector } from "@/app/_components";
import { useGeneralData } from "@/app/providers/GeneralDataProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { InputFieldTitle } from "../../ProjCEComponents";
import { getBranchOptions } from "@/app/lib/getBranchOptions";

const EditProject = ({ params }: { params: { id: string } }) => {
  // Background data initialization
  const generalDataValues = useGeneralData()
  const { supervisorOpts, projectStages, programBranches } = generalDataValues;
  const programOptions = programBranches.map((progbranch) => {
    return {
      label: progbranch.name,
      value: progbranch.id.toString(),
    };
  });

  const form = useForm({
    initialValues: {
      name: "",
      stage: "1",
      majors: [],
      branches: [],
      supervisors: [],
      limit: 0,
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

  useEffect(() => {
    // Get project with id param
    // console.log("Displaying project:", params.id);
    axios
      .get(`http://localhost:3500/projects/${params.id}`)
      .then((response) => {
        // console.log(response.data);
        let fetchedFormData = {
          name: response.data.name,
          stage: response.data.stage,
          majors: response.data.majors.map((major: Program) =>
            major.id.toString(),
          ),
          branches: response.data.branches.map((branch: Branch) =>
            branch.id.toString(),
          ),
          supervisors: response.data.supervisors.map((instructor: Supervisor) =>
            instructor.id.toString(),
          ),
          limit: response.data.limit,
          students: response.data.students.map((member: Student) =>
            JSON.stringify(member),
          ),
          description: response.data.description,
          tasks: response.data.tasks,
          references: response.data.references,
          requirements: response.data.requirements,
          status: "WAITING_FOR_DEPARTMENT_HEAD",
          semester: response.data.semester,
          owner: { id: 3 },
        };
        form.setValues(fetchedFormData);
        // console.log("Initialized form:", fetchedFormData);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, []);

  const queryClient = useQueryClient();
  const router = useRouter();

  async function handleFormSubmit(values: any) {
    // Check fields
    if (form.validate().hasErrors) {
      console.error("Form validation failed");
      return;
    }

    // Transform data according to api's requirements
    let updatedProject = { ...values };
    updatedProject.students = updatedProject.students.map((jsonVal: string) => {
      return JSON.parse(jsonVal).userId;
    });
    updatedProject.stage = parseInt(updatedProject.stage);
    delete updatedProject.requirements; // API currently dont work with reqs

    console.log("Submit:", updatedProject);
    axios
      .patch(`http://localhost:3500/projects/${params.id}`, updatedProject)
      .then((res) => {
        console.log("Project update successful");
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        });
        router.push(
          `/project?project=${updatedProject.stage === 1 ? "specialized" : "capstone"}`,
        );
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
  }

  // Main return
  if (form.values.limit === 0) return <div>Fetching project...</div>;
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
                <NumberInput
                  label="Year"
                  defaultValue={2024}
                  min={1957}
                  max={9999}
                  clampBehavior="strict"
                  placeholder="Year"
                  {...form.getInputProps("semester.year")}
                />
                <NativeSelect
                  label="Semester"
                  data={["1","2","3"]}
                  aria-placeholder="Semester"
                  {...form.getInputProps("semester.no")}
                /> 

                <MultiSelect
                  label="Program"
                  placeholder="Select project programs"
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
                  data={getBranchOptions(form.values.majors, programBranches)}
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
                  limit={7}
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
                  limit={7}
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

export default EditProject;
