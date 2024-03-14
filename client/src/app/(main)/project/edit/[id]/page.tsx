"use client";

import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import useProgramBranch from "@/app/hooks/useProgramBranch";
import useInstructor from "@/app/hooks/useInstructor";
import { useForm } from "@mantine/form";
import {
  Button,
  Input,
  MultiSelect,
  NativeSelect,
  NumberInput,
  ScrollArea,
} from "@mantine/core";
import { formatRevalidate } from "next/dist/server/lib/revalidate";
import MantineRichText from "@/app/_components/MantineRichText";
import ProfileSelector from "@/app/_components/ProfileSelector";
import ProfileSelectorAsync from "@/app/_components/ProfileSelectorAsync";

const stageOptions = [
  {
    label: "Specialized project",
    value: "1",
  },
  {
    label: "Capstone project",
    value: "2",
  },
];

const mockInstructors = [
  { name: "Van Ba", id: "1234567", email: "testmai1@gmail.com" },
  { name: "Nguyen An", id: "20112337", email: "testmai2@gmail.com" },
  {
    name: "Vo Thi Ngoc Truong Chau",
    id: "22314567",
    email: "testmai3@hcmut.edu.vn",
  },
];

const EditProject = ({ params }: { params: { id: string } }) => {
  // Background data initialization
  const { programBranches } = useProgramBranch();
  const programOptions = programBranches.map((progbranch) => {
    return {
      label: progbranch.name,
      value: progbranch.id.toString(),
    };
  });
  function getBranchOptions() {
    let programIds: string[] = form.values.programs;
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

  // Get project with id param
  console.log("Displaying project:", params.id);
  const retreivedProject = {
    title: "Test Project",
    stage: "1",
    programs: ["1", "2"],
    branches: ["2"],
    instructorsList: [
      { name: "Van Ba", id: "1234567", email: "testmai1@gmail.com" },
      {
        name: "Vo Thi Ngoc Truong Chau",
        id: "22314567",
        email: "testmai3@hcmut.edu.vn",
      },
    ],
    membersNo: 3,
    membersList: [
      { name: "Nguyen An", id: "20112337", email: "testmai2@gmail.com" },
      { name: "seachedUser", id: "1", email: "mail@mail.com" },
    ],
    description: "<p>Main <strong>desciotuoib</strong></p>",
    tasks:
      '<ul class="list-disc"><li><p>Git gud</p></li><li><p>Git done</p></li></ul>',
    references:
      '<ol class="list-decimal"><li><p>internet</p></li><li><p>bookds</p></li></ol>',
    requirements: "<p>noopthing much</p>",
  };

  const form = useForm({
    initialValues: {
      title: retreivedProject.title,
      stage: retreivedProject.stage,
      programs: retreivedProject.programs,
      branches: retreivedProject.branches,
      instructorsList: retreivedProject.instructorsList.map(
        (instructor) => instructor.id,
      ),
      membersNo: retreivedProject.membersNo,
      membersList: retreivedProject.membersList.map((member) =>
        JSON.stringify(member),
      ),
      description: retreivedProject.description,
      tasks: retreivedProject.tasks,
      references: retreivedProject.references,
      requirements: retreivedProject.requirements,
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  function handleFormSubmit(values: any) {
    // Map selected members as stringyfied object back to ids
    let newProjectBody = { ...values };
    let parsedMemberIds: string[] = newProjectBody.membersList.map(
      (jsonVal: string) => JSON.parse(jsonVal).id,
    );
    newProjectBody.membersList = parsedMemberIds;
    console.log("Submit:", newProjectBody);
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
  return (
    <div className="h-full w-full bg-white">
      <ScrollArea h={"100%"} type="scroll" offsetScrollbars>
        <form onSubmit={form.onSubmit((values) => handleFormSubmit(values))}>
          {/* title section */}
          <input
            placeholder="Input project title"
            className="border-gray max-h-[5em] w-full border-b-2 py-2 pb-4 pt-8 text-center text-3xl font-semibold focus:outline-none"
            {...form.getInputProps("title")}
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
                          data={stageOptions}
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
                            {...form.getInputProps("programs")}
                            onChange={(val) => {
                              form.getInputProps("programs").onChange(val);
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
                              form.values.programs.length < 1
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
                            {...form.getInputProps("membersNo")}
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
                  onChange={form.getInputProps("instructorsList").onChange}
                  value={form.getInputProps("instructorsList").value}
                  optionsData={mockInstructors}
                  placeholder="Select instructor(s)"
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
                <ProfileSelectorAsync
                  onChange={form.getInputProps("membersList").onChange}
                  value={form.getInputProps("membersList").value}
                  placeholder="Select member(s)"
                  searchApi="localhost:3500"
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
