"use client";

import {
  Button,
  RichTextEditor,
  DropdownMenu,
  SearchBox,
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
  useProject,
} from "@/app/hooks";
import { useEffect, useState, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { ProjectContext } from "@/app/providers/ProjectProvider";
import { OptionType } from "@/app/_components/ProfileSelector";

const EditProject = ({ params }: { params: { id: string } }) => {
  const { branches } = useBranch();
  const { majors } = useMajor();
  const { instructors } = useInstructor();
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const user = useUser();
  const project = useProject(params.id);

  const [title, setTitle] = useState("");
  const [instructorList, setInstructorList] = useState<OptionType[]>([]);
  const [selectedBranches, setSelectedBranches] = useState("");
  const [selectedMajors, setSelectedMajors] = useState("");
  const [requirements, setRequirements] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState("");
  const [refs, setRefs] = useState("");
  const [studentsList, setStudentsList] = useState<OptionType[]>([]);
  const [numberOfMembers, setNumberOfMembers] = useState(1);

  const instructorsOptions: OptionType[] = useMemo(() => {
    if (instructors.length !== 0) {
      return instructors.map((instructor) => ({
        label: `${instructor.id} - ${instructor.name}`,
        value: instructor.id.toString(),
        dataObject: instructor
      }));
    }
    return [];
  }, [instructors]);

  const projectContext = useContext(ProjectContext);
  if (!projectContext) return <div>Loading</div>;
  const { handleUpdateProject, setViewing } = projectContext;

  useEffect(() => {
    // Set default values for branches, majors variable
    if (branches.length > 0 || majors.length > 0) {
      setSelectedBranches(branches[0].name);
      setSelectedMajors(majors[0].name);
    }
    if (project) {
      // Render info of project currently open for edit
      console.log("Displaying project:",project);
      setTitle(project.name);
      setDescription(project.description);
      setTasks(project.tasks);
      setRefs(project.references);
      setSelectedBranches(project.branches[0].name);
      setSelectedMajors(project.majors[0].name);
      setNumberOfMembers(project.limit);
      setInstructorList(
        project.supervisors.map((supervisor: any) => ({
          label: `${supervisor.id} - ${supervisor.name}`,
          value: supervisor.id.toString(),
          dataObject: supervisor,
        })),
      );
      setStudentsList(
        project.students.map((student: any) => ({
          label: `${student.user.id} - ${student.user.name}`,
          value: student.user.id.toString(),
          dataObject: student.user,
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
      // console.log("HANDLE BRANCH",value)
      setSelectedBranches(value);
    };

    const handleMajorSelectChange = (value: string) => {
      setSelectedMajors(value);
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
                  selected={selectedBranches}
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
                  selected={selectedMajors}
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

      {/* Action buttons: */}
      <div className="flex justify-end gap-4 pt-4">
        <Button
          isPrimary={true}
          variant="success"
          className="px-4 py-2 text-lg"
          onClick={() => {
            const updateSupervisorIds = [
              user.id,
              ...instructorList
                .map((instructor) => {
                  if (+instructor.value != user.id) {
                    return +instructor.value;
                  }
                })
                .filter((storedInstructor) => storedInstructor !== undefined),
            ];

            const updateProject = {
              code: +params.id,
              name: title,
              status: "WAITING_FOR_DEPARTMENT_HEAD",
              requirements: requirements,
              stage: 1,
              description,
              tasks,
              owner: {
                id: user.id
              },
              references: refs,
              limit: numberOfMembers,
              supervisors: updateSupervisorIds,
              studentsCount: project.studentsCount,
              students: studentsList.map(selectedStu => {return parseInt(selectedStu.value)}),
              // !! currently working with singe selected majors, branch
              majors: [
                +majors.find((storedMajor) => storedMajor.name === selectedMajors)!.id,
              ],
              branches: [
                +branches.find((storedBranch) => storedBranch.name === selectedBranches)!.id,
              ],
            };
            console.log("Updated project", updateProject);

            // alert(`Title: ${title}\nBranch: ${JSON.stringify(selectedBranches)}\nMajor:${JSON.stringify(selectedMajors)}\nMembers no: ${numberOfMembers} \n\nInstructors:\n${JSON.stringify(instructorList)} \n\nMembers:\n${JSON.stringify(studentsList)}`)
            axios
              .patch(
                `http://localhost:3500/projects/${params.id}`,
                updateProject,
              )
              .then((_) => {
                const parsedUpdateProject = {
                  ...updateProject,
                  students: studentsList.map(selectedStu => {return{
                    userId: parseInt(selectedStu.value),
                    GPA: -1.0,
                    credits: -1,
                    enrolledAt: '-1',
                    generation: -1,
                    user: selectedStu.dataObject
                  }}),
                  supervisors: [
                    {
                      id: user.id,
                      email: user.email,
                      username: user.username,
                      name: user.name,
                    },
                    ...instructors.filter((instructor) =>
                      updateSupervisorIds.includes(instructor.id),
                    ),
                  ],
                  // !! currently working with singe selected majors, branch
                  majors: majors.filter(
                    (storedMajor: any) => storedMajor.name === selectedMajors,
                  ),
                  branches: branches.filter(
                    (storedBranch: any) => storedBranch.name === selectedBranches,
                  ),
                };
                console.log("FE UPDATE", parsedUpdateProject);
                handleUpdateProject(+params.id, parsedUpdateProject);
                setViewing(parsedUpdateProject);
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
