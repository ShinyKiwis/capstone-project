import React, { useContext } from "react";
import parse from 'html-react-parser'
import { Button, ProjectInformationTable, Typography } from "..";
import { ProjectCardList, ProjectProps } from "./ProjectCard";
import { AuthContext } from "@/app/providers/AuthProvider";
import { useNavigate, useUser } from "@/app/hooks";
import hasRole from "@/app/lib/hasRole";
import { ModalContext } from "@/app/providers/ModalProvider";
import axios from "axios";

const ProjectCardDetail = ({projectObject}: {projectObject:ProjectProps}) => {
  const user = useUser();
  const authContext = useContext(AuthContext);
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error(
      "Action buttons will not work - model context not initiated !",
    );
    return;
  }
  const { toggleModal, setModalType, setModalProps, modalProps } =
    modalContextValue;

  const StudentButtons = ({
    handleAction,
  }: {
    handleAction: any;
  }) => {
    const authContext = useContext(AuthContext);
    return (
      <>
        {authContext?.user?.project?.code === projectObject.code ? (
          <Button
            isPrimary
            variant="cancel"
            className="mt-2 w-fit py-2 px-6"
            onClick={handleAction}
          >
            Unenroll
          </Button>
        ) : (
          <Button
            isPrimary
            variant="normal"
            className="mt-2 w-fit py-2 px-6"
            onClick={handleAction}
          >
            Enroll
          </Button>
        )}
      </>
    );
  };
  
  const handleStudentActions = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const action = event.currentTarget.textContent!.toLowerCase();
    // console.log("Clicked action button:", action);

    switch (action) {
      case "view":
        // Toggle project card details
        return;
      case "enroll":
        axios
          .post("http://localhost:3500/users/student/enroll", {
            studentId: user.id,
            projectCode: projectObject.code,
          })
          .then((res) => {
            if (res.statusText.toLowerCase() == "created") {
              setModalType("status_success");
              authContext?.enroll(projectObject.code);
            }
          });

        // Logic for validating student's requirement ?
        // let satisfied = false;                                                                                  // test
        // if (satisfied) {
        //   setModalType("status_success");
        //   break;
        // } else {
        //   let failReasons = ["Not enough credits accumulated ! (<90)", "Your GPA is too low ! (<8.0)"]          // test
        //   setModalProps({ title: "Project requirements not met !", messages: failReasons })
        //   setModalType("status_warning");
        //   break;
        // }
        break;
      case "unenroll":
        setModalType("project_unerollment");
        break;
      default:
        console.error("Invalid action button:", action);
        return;
    }
    toggleModal(true);
  };

  const ManagementButtons = ({
    viewSet,
    viewTarget,
    handleAction,
  }: {
    viewSet?: any;
    viewTarget?: ProjectProps;
    handleAction: any;
  }) => {
    const navigate = useNavigate();
    return (
      <>
        <Button
          isPrimary={false}
          variant="normal"
          className="mt-2 w-fit py-2 px-6"
          onClick={() => {
            navigate(`/project/edit/${projectObject.code}`);
          }}
        >
          Edit
        </Button>
        <Button
          isPrimary
          variant="normal"
          className="mt-2 w-fit py-2 px-6"
          onClick={() =>
            viewSet(projectObject)
          }
        >
          View
        </Button>
      </>
    );
  };




  return (
    <div className="rounded-md border border-black px-8 py-4">
      <Typography variant="h1" text={projectObject.code.toString()} />
      <Typography variant="h1" text={projectObject.name} />
      <div className="mb-4 flex w-full">
        <ProjectInformationTable fontSize="text-lg" branches={projectObject.branches} majors={projectObject.majors} supervisors={projectObject.supervisors} />
        <div className="ms-auto">
          <ProjectCardList className="w-full" studentsCount={projectObject.studentsCount} students={projectObject.students} limit={projectObject.limit}/>
        </div>
      </div>
      <Typography variant="h2" text="Description" />
      <div className="text-md [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-disc [&>ul]:list-inside">
        {parse(projectObject.description)}
      </div>
      <Typography variant="h2" text="Tasks" />
      <div className="text-md [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-disc [&>ul]:list-inside">
        {parse(projectObject.tasks)}
      </div>
      <Typography variant="h2" text="References" />
      <div className="text-md [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-disc [&>ul]:list-inside">
        {parse(projectObject.references)}
      </div>
      <div className="mt-4 flex justify-end">
        {hasRole("student") ? (
          <StudentButtons
            handleAction={handleStudentActions}
          />
        ) : (
          <ManagementButtons
            handleAction={''}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectCardDetail;
