"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useProgramBranch from "@/app/hooks/useProgramBranch";
import { useForm } from "@mantine/form";
import {
  Button,
  Input,
  MultiSelect,
  NativeSelect,
  NumberInput,
  ScrollArea,
} from "@mantine/core";
import MantineRichText from "@/app/_components/MantineRichText";
import ProfileSelector from "@/app/_components/ProfileSelector";
import StudentProfileSelector from "@/app/_components/StudentProfileSelector";
import { GeneralDataContext } from "@/app/providers/GeneralDataProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const EditProject = ({ params }: { params: { id: string } }) => {
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
    let programIds: string[] | undefined = form.values.majors;
    if (!programIds || (Array.isArray(programIds) && programIds.length === 0))
      return [];
    if (programBranches.length === 0) return [];

    const programBranchesFiltered = programBranches.filter((program) =>
      programIds?.includes(program.id.toString()),
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

  const form = useForm({
    initialValues: {
      name: "",
      stage: "1",
      majors: [],
      branches: [],
      supervisors: [],
      limit: 1,
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

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  useEffect(() => {
    // Get project with id param
    // console.log("Displaying project:", params.id);
    axios
      .get(`http://localhost:3500/projects/${params.id}`)
      .then((response) => {
        // console.log(response.data);
        form.setValues({
          name: response.data.name,
          stage: response.data.stage,
          majors: response.data.majors.map((major:Program) => major.id.toString()),
          branches: response.data.branches.map((branch:Branch) =>
            branch.id.toString(),
          ),
          supervisors: response.data.supervisors.map((instructor:Supervisor) =>
            instructor.id.toString(),
          ),
          limit: response.data.limit,
          students: response.data.students.map((member:Student) =>
            JSON.stringify(member),
          ),
          description: response.data.description,
          tasks: response.data.tasks,
          references: response.data.references,
          requirements: response.data.requirements,
          status: "WAITING_FOR_DEPARTMENT_HEAD",
          semester: {
            year: 2023,
            no: 2,
          },
          owner: { id: 3 },
        });
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, []);

  const queryClient = useQueryClient();
  const router = useRouter();

  async function handleFormSubmit(values: any) {
    // Map selected members as stringyfied object back to ids
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
        router.push(`/project?project=${updatedProject.stage === 1 ? 'specialized' : 'capstone'}`);
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
  }

  // Display elements
  const InputFieldTitle = ({ title }: { title: string }) => {
    let className = "text-2xl font-bold mb-4";
    return <div className={className}>{title}</div>;
  };

  const InputLabel = ({ title }: { title: string }) => {
    let className = "w-44 text-lg font-semibold";
    return <div className={className}>{title}</div>;
  };

  // Main return
  if (form.values.name === "") return <div>Fetching project...</div>;
  // console.log("Initialized form:", form.values);
  return (
    <div className="h-full w-full bg-white">
      <ScrollArea h={"100%"} type="scroll" offsetScrollbars>
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          {/* title section */}
          <input
            placeholder="Input project title"
            className="border-gray max-h-[5em] w-full border-b-2 py-2 pb-4 pt-8 text-center text-3xl font-semibold focus:outline-none"
            {...form.getInputProps("name")}
          />

          <div className="mt-8 w-full">
            {/* metadata table & req section */}
            <div className="flex h-fit gap-4">
              <div className="w-1/3">
                <InputFieldTitle title="Project's information" />
                <table className="border-separate border-spacing-3">
                  <tbody>
                    <tr>
                      <td>
                        <InputLabel title="Project ID:" />
                      </td>
                      <td className="bg-lightgray rounded-md px-2 py-2">
                        Draft
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputLabel title="Project owner:" />
                      </td>
                      <td className="bg-lightgray rounded-md px-2 py-2">
                        {"current user's name"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputLabel title="Project stage:" />
                      </td>
                      <td>
                        <NativeSelect
                          data={projectStages.map((stage) => {
                            return {
                              label: stage.name,
                              value: stage.id.toString(),
                            };
                          })}
                          aria-placeholder="Select project stage"
                          {...form.getInputProps("stage")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputLabel title="Program:" />
                      </td>
                      <td>
                        <div className="w-full">
                          <MultiSelect
                            placeholder="Pick project program"
                            data={programOptions}
                            {...form.getInputProps("majors")}
                            onChange={(val) => {
                              form.getInputProps("majors").onChange(val);
                              form.setValues({ branches: [] });
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputLabel title="Branch:" />
                      </td>
                      <td>
                        <div className="w-full">
                          <MultiSelect
                            placeholder={
                              form.values.majors &&
                              form.values.majors.length < 1
                                ? "Select program(s) first"
                                : "Select available branches"
                            }
                            data={getBranchOptions()}
                            {...form.getInputProps("branches")}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <InputLabel title="Number of members:" />
                      </td>
                      <td>
                        <div className="w-full">
                          <NumberInput
                            defaultValue={1}
                            min={1}
                            max={20}
                            clampBehavior="strict"
                            required
                            {...form.getInputProps("limit")}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="w-2/3">
                <div className="flex h-full flex-col">
                  <p className="mb-4 text-2xl font-bold">Requirements</p>
                  <MantineRichText
                    content={form.getInputProps("requirements").value}
                    onChange={form.getInputProps("requirements").onChange}
                  />
                </div>
              </div>
            </div>

            {/* instructors and desc section */}
            <div className="mt-4 flex h-fit gap-4">
              <div className="h-fit min-h-[16rem] w-1/3">
                <InputFieldTitle title="Instructors" />
                <ProfileSelector
                  onChange={form.getInputProps("supervisors").onChange}
                  value={form.getInputProps("supervisors").value}
                  optionsData={supervisorOpts}
                  placeholder="Search instructor name, id"
                />
              </div>

              <div className="w-2/3">
                <div className="flex h-full flex-col">
                  <p className="mb-4 text-2xl font-bold">Description</p>
                  <MantineRichText
                    content={form.getInputProps("description").value}
                    onChange={form.getInputProps("description").onChange}
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
                  <p className="mb-4 text-2xl font-bold">Tasks/Missions</p>
                  <MantineRichText
                    content={form.getInputProps("tasks").value}
                    onChange={form.getInputProps("tasks").onChange}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex h-fit gap-4">
              <div className="h-64 w-1/3"></div>
              <div className="w-2/3">
                <div className="flex h-full flex-col">
                  <p className="mb-4 text-2xl font-bold">References</p>
                  <MantineRichText
                    content={form.getInputProps("references").value}
                    onChange={form.getInputProps("references").onChange}
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
                console.log("set to submit");
              }}
            >
              Submit for approval
            </Button>
            <Button
              type="submit"
              onClick={() => {
                console.log("set to save");
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
