"use client";

import {
  Button,
  RichTextEditor,
  DropdownMenu,
  MultiselectDropdown,
  Profile,
  ProfileSelector,
} from "@/app/_components";
import axios from "axios";
import {
  useBranch,
  useInstructor,
  useMajor,
  useNavigate,
  useUser,
} from "@/app/hooks";
import { useEffect, useState, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectContext } from "@/app/providers/ProjectProvider";
import { OptionType } from "@/app/_components/ProfileSelector";


const CreateProject = () => {
  const projectContext = useContext(ProjectContext);
  if (!projectContext) return <div>Loading</div>;
  const { handleCreation } = projectContext;
  const { branches } = useBranch();
  const { majors } = useMajor();
  const { instructors } = useInstructor();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const user = useUser();

  const [title, setTitle] = useState("");
  const [instructorList, setInstructorList] = useState<OptionType[]>([]);
  const [studentsList, setStudentsList] = useState<OptionType[]>([]);
  const [branch, setBranch] = useState("");
  const [major, setMajor] = useState("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState("");
  const [refs, setRefs] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState(1);

  useEffect(() => {
    // Set values based on default options
    if (branches.length > 0 || majors.length > 0) {
      setBranch(branches[0].name);
      setMajor(majors[0].name);
    }
  }, [branches, majors]);

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
            <td className="rounded-md bg-lightgray px-2 py-2">Draft</td>
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

  return (
    <div className="w-full flex-1 bg-white">
      {/* Project title section: */}
      <textarea
        className="max-h-[5em] w-full border-b-2 border-gray py-2 pb-4 pt-8 text-center text-3xl font-semibold focus:outline-none"
        placeholder="Project Title"
        rows={1}
        style={{ resize: "none" }}
        required
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
            <ProfileSelector
              type="instructors"
              onChange={setInstructorList}
              value={instructorList}
              isMulti={true}
            />
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
            <ProfileSelector type="students" onChange={setStudentsList} value={studentsList} isMulti={true} />
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
            const newProject = {
              name: title,
              stage: 1,
              description,
              status: "WAITING_FOR_DEPARTMENT_HEAD",
              owner: {
                id: user.id
              },
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
              students: [
                ...studentsList.map((student) => {
                  return {
                    userId: student.value,
                  };
                }),
              ],
              majors: [
                {
                  id: majors.find((storedMajor) => storedMajor.name === major)!
                    .id,
                },
              ],
              branches: [
                {
                  id: branches.find(
                    (storedBranch) => storedBranch.name === branch,
                  )!.id,
                },
              ],
            };
            axios
              .post("http://localhost:3500/projects", newProject)
              .then((res) => {
                const newSupervisorIds = [
                  user.id,
                  ...instructorList
                    .map((instructor) => {
                      if (+instructor.value != user.id) {
                        return +instructor.value;
                      }
                    })
                    .filter(
                      (storedInstructor) => storedInstructor !== undefined,
                    ),
                ];
                const parsedProject = {
                  ...newProject,
                  code: res.data.code,
                  students: [],
                  studentsCount: 0,
                  requirements: requirements,
                  supervisors: [
                    {
                      id: user.id,
                      email: user.email,
                      username: user.username,
                      name: user.name,
                    },
                    ...instructors.filter((instructor) =>
                      newSupervisorIds.includes(instructor.id),
                    ),
                  ],
                  
                  majors: majors.filter(
                    (storedMajor: any) => storedMajor.name === major,
                  ),
                  branches: branches.filter(
                    (storedBranch: any) => storedBranch.name === branch,
                  ),
                };
                handleCreation(parsedProject);
                navigate(`/project?project=${searchParams.get("project")}`);
              }).catch(err => {console.log(err)});
          }}
        >
          Submit for approval
        </Button>

        <Button
          isPrimary={true}
          variant="normal"
          className="px-4 py-2 text-lg"
          onClick={() => {
            // alert(`Instructors:\n${JSON.stringify(instructorList)}\n\nStudents:\n${JSON.stringify(studentsList)}`)
            
            const newProject = {
              name: title,
              stage: 1,
              description,
              tasks,
              status: "DRAFT",
              references: refs,
              owner: {
                id: user.id
              },
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
              students: [
                ...studentsList.map((student) => {
                  return {
                    userId: student.value,
                  };
                }),
              ],
              majors: [
                {
                  id: majors.find((storedMajor) => storedMajor.name === major)!
                    .id,
                },
              ],
              branches: [
                {
                  id: branches.find(
                    (storedBranch) => storedBranch.name === branch,
                  )!.id,
                },
              ],
            };

            axios
              .post("http://localhost:3500/projects", newProject)
              .then((res) => {
                const newSupervisorIds = [
                  user.id,
                  ...instructorList
                    .map((instructor) => {
                      if (+instructor.value != user.id) {
                        return +instructor.value;
                      }
                    })
                    .filter(
                      (storedInstructor) => storedInstructor !== undefined,
                    ),
                ];
                const parsedProject = {
                  ...newProject,
                  code: res.data.code,
                  students: [],
                  studentsCount: 0,
                  requirements: requirements,
                  owner: {
                    id: user.id
                  },
                  supervisors: [
                    {
                      id: user.id,
                      email: user.email,
                      username: user.username,
                      name: user.name,
                    },
                    ...instructors.filter((instructor) =>
                      newSupervisorIds.includes(instructor.id),
                    ),
                  ],
                  majors: majors.filter(
                    (storedMajor: any) => storedMajor.name === major,
                  ),
                  branches: branches.filter(
                    (storedBranch: any) => storedBranch.name === branch,
                  ),
                };
                handleCreation(parsedProject);
                navigate(`/project?project=${searchParams.get("project")}`);
              });
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default CreateProject;
