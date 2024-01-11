import React, { useContext, useState } from "react";
import { Button, Profile, ProjectInformationTable, Typography } from "..";
import { BsFillPeopleFill } from "react-icons/bs";
import { ModalContext } from "../../providers/ModalProvider";
import axios from "axios";
import parse from "html-react-parser";
import { useNavigate, useUser } from "@/app/hooks";
import { AuthContext } from "@/app/providers/AuthProvider";
import hasRole from "@/app/lib/hasRole";

type Member = {
  userId: string;
  credits: number;
  generation: number;
  GPA: string;
  enrolledAt: string;
};

export interface ProjectProps {
  id: number;
  title: string;
  description: string;
  tasks: string;
  references: string;
  programs: {
    id: number;
    name: string;
  }[];
  majors: {
    id: number;
    name: string;
  }[];
  instructors: {
    id: number;
    email: string;
    username: string;
    name: string;
  }[];
  membersNumber: number;
  members: Member[];
  limit: number;
}

interface ProjectCardProps {
  projectObject: ProjectProps;
  detailedViewSetter: any;
}

interface ProjectCardMetadataProps
  extends Pick<ProjectProps, "id" | "programs" | "majors" | "instructors"> {}

interface ProjectCardContentProps
  extends Pick<ProjectProps, "title" | "description"> {}

interface ProjectCardListProps
  extends Pick<ProjectProps, "membersNumber" | "members" | "limit"> {
  className: string;
}

const ProjectCardMetadata = ({
  id,
  programs,
  majors,
  instructors,
}: ProjectCardMetadataProps) => {
  return (
    <div className="flex w-2/6 flex-col items-center">
      <Typography variant="h2" text={id.toString()} />
      <ProjectInformationTable
        fontSize="text-sm"
        programs={programs}
        majors={majors}
        instructors={instructors}
      />
    </div>
  );
};

const ProjectCardContent = ({
  title,
  description,
}: ProjectCardContentProps) => {
  return (
    <div className="w-3/6">
      <Typography variant="h2" text={title} />
      <div className="text-sm [&>ol]:list-inside [&>ol]:list-decimal [&>ul]:list-inside [&>ul]:list-disc">
        {parse(`${description.substring(0, 250)}...`)}
      </div>
    </div>
  );
};

export const ProjectCardList = ({
  className,
  membersNumber,
  limit,
  members,
}: ProjectCardListProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="ms-auto flex items-center gap-2">
        <BsFillPeopleFill size={20} />
        <span>
          {members.length}/{limit}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {members.map(function (member: Member) {
          return (
            <Profile
              key={member.userId}
              type="horizontal"
              username="Nguyen Van B"
            />
          );
        })}
      </div>
    </div>
  );
};

const StudentButtons = ({
  viewSet,
  viewTarget,
  handleAction,
}: {
  viewSet: any;
  viewTarget: ProjectProps;
  handleAction: any;
}) => {
  const user = useUser()
  return (
    <>
      <Button
        isPrimary={false}
        variant="normal"
        className="w-full py-2"
        onClick={() =>
          viewSet({
            code: viewTarget.id,
            name: viewTarget.title,
            description: viewTarget.description,
            tasks: viewTarget.tasks,
            references: viewTarget.references,
            branches: viewTarget.programs,
            majors: viewTarget.majors,
            supervisors: viewTarget.instructors,
            studentsCount: viewTarget.membersNumber,
            students: viewTarget.members,
            limit: viewTarget.limit,
          })
        }
      >
        View
      </Button>

      {user.project?.code === viewTarget.id ? (
        <Button
          isPrimary
          variant="cancel"
          className="mt-2 w-full py-2"
          onClick={handleAction}
        >
          Unenroll
        </Button>
      ) : (
        <Button
          isPrimary
          variant="normal"
          className="mt-2 w-full py-2"
          onClick={handleAction}
        >
          Enroll
        </Button>
      )}
    </>
  );
};

const ManagementButtons = ({
  viewSet,
  viewTarget,
  handleAction,
}: {
  viewSet: any;
  viewTarget: ProjectProps;
  handleAction: any;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        isPrimary={false}
        variant="normal"
        className="w-full py-2"
        onClick={() => {
          navigate(`/project/edit/${viewTarget.id}`);
        }}
      >
        Edit
      </Button>
      <Button
        isPrimary
        variant="normal"
        className="mt-2 w-full py-2"
        onClick={() =>
          viewSet({
            code: viewTarget.id,
            name: viewTarget.title,
            description: viewTarget.description,
            tasks: viewTarget.tasks,
            references: viewTarget.references,
            branches: viewTarget.programs,
            majors: viewTarget.majors,
            supervisors: viewTarget.instructors,
            studentsCount: viewTarget.membersNumber,
            students: viewTarget.members,
            limit: viewTarget.limit,
          })
        }
      >
        View
      </Button>
    </>
  );
};

const ProjectCardActions = ({
  viewSet,
  viewTarget,
}: {
  viewSet: any;
  viewTarget: ProjectProps;
}) => {
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
            projectCode: viewTarget.id,
          })
          .then((res) => {
            if (res.statusText.toLowerCase() == "created") {
              setModalType("status_success");
              authContext?.enroll(viewTarget.id);
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

  const handleManagementActions = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const action = event.currentTarget.textContent!.toLowerCase();
    // console.log("Clicked action button:", action);

    switch (action) {
      case "edit":
        setModalType("project_deletion");
        break;
      case "deactivate":
        setModalType("project_deletion");
        break;
      case "delete":
        setModalType("project_deletion");
        break;
      case "deny":
        setModalType("project_denial");
        break;
      default:
        console.error("Invalid action button:", action);
        return;
    }
    toggleModal(true);
  };

  return (
    <div className="ms-auto mt-4 w-1/4">
      {hasRole("student") ? (
        <StudentButtons
          viewSet={viewSet}
          viewTarget={viewTarget}
          handleAction={handleStudentActions}
        />
      ) : (
        <ManagementButtons
          viewSet={viewSet}
          viewTarget={viewTarget}
          handleAction={handleManagementActions}
        />
      )}
      {/* Buttons for testing other modals */}
      {/* <div>
        <p>Test modals</p>
        <button className="border-2" onClick={handleAction}>Unenroll</button>
        <button className="border-2" onClick={handleAction}>Delete</button>
        <button className="border-2" onClick={handleAction}>Deny</button>
        <button className="border-2" onClick={handleAction}>Invalid</button>(Check console log for err msg)
      </div> */}
    </div>
  );
};

const ProjectCard = ({
  projectObject,
  detailedViewSetter,
}: ProjectCardProps) => {
  const authContext = useContext(AuthContext);
  console.log(
    "Currently enrolled project ID:",
    authContext?.user?.project?.code,
  );

  return (
    <div className="flex w-full cursor-pointer flex-col rounded-md border border-black px-4 py-4">
      <div className="flex">
        <ProjectCardMetadata
          id={projectObject.id}
          programs={projectObject.programs}
          majors={projectObject.majors}
          instructors={projectObject.instructors}
        />
        <ProjectCardContent
          title={projectObject.title}
          description={projectObject.description}
        />
        <ProjectCardList
          className="w-1/4"
          membersNumber={projectObject.membersNumber}
          members={projectObject.members}
          limit={projectObject.limit}
        />
      </div>
      <ProjectCardActions
        viewSet={detailedViewSetter}
        viewTarget={projectObject}
      />
    </div>
  );
};

export default ProjectCard;
