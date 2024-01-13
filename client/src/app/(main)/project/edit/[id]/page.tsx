"use client";

import {
  Button,
  RichTextEditor,
  DropdownMenu,
  SearchBox,
  MultiselectDropdown,
  Profile,
} from "@/app/_components";
import axios from "axios";
import {
  useBranch,
  useInstructor,
  useMajor,
  useNavigate,
  useUser,
  useProject,
} from "@/app/hooks";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CgClose } from "react-icons/cg";

type InstructorOptType = {
  label: string;
  value: string;
};

const EditProject = ({ params }: { params: { id: string } }) => {
  const { branches } = useBranch();
  const { majors } = useMajor();
  const { instructors } = useInstructor();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const user = useUser();
  const project = useProject(params.id);

  const [title, setTitle] = useState("");
  const [instructorList, setInstructorList] = useState<InstructorOptType[]>([]);
  const [branch, setBranch] = useState("");
  const [major, setMajor] = useState("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState("");
  const [refs, setRefs] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState(1);
  console.log(instructors);
  const instructorsOptions: InstructorOptType[] = useMemo(() => {
    if (instructors.length !== 0) {
      return instructors.map((instructor) => ({
        label: `${instructor.id} - ${instructor.name}`,
        value: instructor.id.toString(),
      }));
    }
    return [];
  }, [instructors]);

  console.log(instructorList)

  useEffect(() => {
    if (branches.length > 0 || majors.length > 0) {
      setBranch(branches[0].name);
      setMajor(majors[0].name);
    }
    if (project) {
      console.log(project);
      setTitle(project.name);
      setDescription(project.description);
      setTasks(project.tasks);
      setRefs(project.references);
      setNumberOfMembers(project.limit);
      setInstructorList(
        project.supervisors.map((supervisor: any) => ({
          label: `${supervisor.id} - ${supervisor.name}`,
          value: supervisor.id.toString(),
        })),
      );
    }
  }, [branches, majors, project]);

  const InputFieldTitle = ({ title }: { title: string }) => {
    let className = "text-2xl font-bold mb-4";
    return <div className={className}>{title}</div>;
  };

  const InputLabel = ({ title }: { title: string }) => {
    let className = "w-44 text-lg font-semibold";
    return <div className={className}>{title}</div>;
  };

  const InputField = ({ children }: { children: React.ReactNode }) => {
    let className = "w-full";
    return <div className={className}>{children}</div>;
  };

  const InputsTable = () => {
    const handleBranchSelectChange = (value: string) => {
      setBranch(value);
    };

    const handleMajorSelectChange = (value: string) => {
      setMajor(value);
    };

    const handleNumberOfMemberChange = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setNumberOfMembers(+e.target.value);
    };

    return (
      <table className="border-separate border-spacing-3">
        <tbody>
          <tr>
            <td>
              <InputLabel title="Project ID:" />
            </td>
            <td className="rounded-md bg-lightgray px-2 py-2">
              {project?.code}
            </td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Project owner:" />
            </td>
            <td className="rounded-md bg-lightgray px-2 py-2">{user.name}</td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Branch:" />
            </td>
            <td>
              <InputField>
                <DropdownMenu
                  name="projectBranch"
                  options={branches}
                  onChange={handleBranchSelectChange}
                  selected={branch}
                />
              </InputField>
            </td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Major:" />
            </td>
            <td>
              <InputField>
                <DropdownMenu
                  name="projectProgram"
                  options={majors}
                  onChange={handleMajorSelectChange}
                  selected={major}
                />
              </InputField>
            </td>
          </tr>
          <tr>
            <td>
              <InputLabel title="Number of members:" />
            </td>
            <td>
              <InputField>
                <input
                  type="number"
                  name="membersLimit"
                  min={1}
                  max={4}
                  value={numberOfMembers}
                  className="w-full rounded-md bg-lightgray px-2 py-2"
                  onChange={handleNumberOfMemberChange}
                />
              </InputField>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const ProfileItems = ({
    name,
    id,
    email,
  }: {
    name: string;
    id: string;
    email: string;
  }) => {
    return (
      <div className="flex w-full items-center pt-4">
        <div>
          <Profile
            type="horizontal"
            username={name}
            email={email}
            userId={id}
          />
        </div>
        <div className="right-0 ml-auto">
          <CgClose
            size={25}
            className="text-lack cursor-pointer hover:text-lightgray"
            onClick={() => {
              const targetInstructor = instructorsOptions.find((obj) => {
                return obj.value === id;
              });
              // console.log("Remove target:", targetInstructor)
              let targetIndex = -1;
              if (targetInstructor && instructorList.length > 0) {
                targetIndex = instructorList.findIndex(
                  (obj) => obj.value === id,
                );
              }
              // console.log("Found index:", targetIndex)
              if (targetIndex > -1) {
                instructorList.splice(targetIndex, 1);
                setInstructorList([...instructorList]);
              }
            }}
          />
        </div>
      </div>
    );
  };

  function handleSelectAdd(newOpt: any, targetArr: any, targetArrSetter: any) {
    console.log(newOpt);
    let found = targetArr.findIndex(
      (obj: any) => obj.value === newOpt[0].value,
    );
    console.log(found);
    if (found === -1) {
      let newArr = targetArr.concat(newOpt);
      console.log("New array", newArr);
      targetArrSetter(newArr);
    }
  }

  return (
    <div className="w-full flex-1 bg-white">
      {/* Project title section: */}
      <textarea
        className="max-h-[5em] w-full border-b-2 border-gray py-2 pb-4 pt-8 text-center text-3xl font-semibold focus:outline-none"
        placeholder="Project Title"
        rows={1}
        style={{ resize: "none" }}
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></textarea>

      {/* Project metadata section: */}
      <div className="mt-8 w-full">
        <div className="flex h-fit gap-4">
          <div className="w-1/3">
            <InputFieldTitle title="Project's information" />
            <InputsTable />
          </div>
          <div className="w-2/3">
            <div className="flex h-full flex-col">
              <p className="mb-4 text-2xl font-bold">Requirements</p>
              <RichTextEditor
                onChange={setRequirements}
                initialContent={requirements}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex h-fit gap-4">
          <div className="h-64 w-1/3">
            <InputFieldTitle title="Instructors" />
            <MultiselectDropdown
              name="supervisors"
              isMulti={true}
              options={instructorsOptions}
              placeholder="Search instructor name, id"
              onChange={(newOpt: InstructorOptType) =>
                handleSelectAdd(newOpt, instructorList, setInstructorList)
              }
            />
            <div className="px-3">
              {instructorList.length > 0 &&
                instructorList.map(function (selectedOption: {
                  value: string;
                  label: string;
                }) {
                  // Map list of selected options with list from DB
                  console.log(instructors);
                  console.log(selectedOption);
                  const instructorData = instructors.find((obj) => {
                    console.log("INSIDE", obj)
                    console.log("INSIDE", selectedOption)
                    return (
                      obj.id !== user.id &&
                      obj.id.toString() === selectedOption.value
                    );
                  });
                  console.log("INSTRUCTOR DATA", instructorData)

                  return instructorData && (
                    <ProfileItems
                      name={instructorData!.name}
                      id={instructorData!.id.toString()}
                      email={instructorData!.email}
                    />
                  );
                })}
            </div>
          </div>
          <div className="w-2/3">
            <div className="flex h-full flex-col">
              <p className="mb-4 text-2xl font-bold">Description</p>
              <RichTextEditor
                onChange={setDescription}
                initialContent={description}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex h-fit gap-4">
          <div className="h-64 w-1/3">
            <InputFieldTitle title="Members" />
            <SearchBox placeholder="Search student..." />
          </div>
          <div className="w-2/3">
            <div className="flex h-full flex-col">
              <p className="mb-4 text-2xl font-bold">Tasks/Missions</p>
              <RichTextEditor onChange={setTasks} initialContent={tasks} />
            </div>
          </div>
        </div>
        <div className="mt-4 flex h-fit gap-4">
          <div className="h-64 w-1/3"></div>
          <div className="w-2/3">
            <div className="flex h-full flex-col">
              <p className="mb-4 text-2xl font-bold">References</p>
              <RichTextEditor onChange={setRefs} initialContent={refs} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <Button
          isPrimary={true}
          variant="success"
          className="px-4 py-2 text-lg"
          onClick={() => {
            axios
              .patch(`http://localhost:3500/projects/${params.id}`, {
                name: title,
                stage: 1,
                description,
                tasks,
                references: refs,
                limit: numberOfMembers,
                semester: {
                  year: 2023,
                  no: 1,
                },
                supervisors: [
                  {
                    id: user.id,
                  },
                  ...instructorList.map((instructor) => {
                    return {
                      id: +instructor.value,
                    };
                  }),
                ],
                majors: [
                  {
                    id: majors.find(
                      (storedMajor) => storedMajor.name === major,
                    )!.id,
                  },
                ],
                branches: [
                  {
                    id: branches.find(
                      (storedBranch) => storedBranch.name === branch,
                    )!.id,
                  },
                ],
              })
              .then((_) => {
                navigate(`/project?project=${searchParams.get("project")}`);
              });
          }}
        >
          Submit for approval
        </Button>
        <Button isPrimary={true} variant="normal" className="px-4 py-2 text-lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProject;
