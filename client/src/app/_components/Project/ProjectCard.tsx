import React, { useContext, useState } from "react";
import { Button, Profile, ProjectInformationTable, Typography } from "..";
import { BsFillPeopleFill } from "react-icons/bs";
import { ModalContext } from "../../providers/ModalProvider";
import { subscribe } from "diagnostics_channel";
import parse from 'html-react-parser'

type Member = {
  userId: string;
  credits: number;
  generation: number;
  GPA: string;
  enrolledAt: string;
}

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
    name: string
  }[];
  instructors: {
    id: number;
    email: string;
    username: string;
    name: string
  }[];
  membersNumber: number;
  members: Member[];
}

interface ProjectCardProps {
  projectObject: ProjectProps;
  detailedViewSetter: any
}

interface ProjectCardMetadataProps extends Pick<ProjectProps, 'id' | 'programs' | 'majors' | 'instructors'> { }

interface ProjectCardContentProps extends Pick<ProjectProps, 'title' | 'description'> { }

interface ProjectCardListProps extends Pick<ProjectProps, 'membersNumber' | 'members'> {
  className: string
}


const ProjectCardMetadata = ({ id, programs, majors, instructors }: ProjectCardMetadataProps) => {
  return (
    <div className="flex w-2/6 flex-col items-center">
      <Typography variant="h2" text={id.toString()} />
      <ProjectInformationTable fontSize="text-sm" programs={programs} majors={majors} instructors={instructors} />
    </div>
  );
};

const ProjectCardContent = ({ title, description }: ProjectCardContentProps) => {
  return (
    <div className="w-3/6">
      <Typography variant="h2" text={title} />
      <div className="text-sm [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-disc [&>ul]:list-inside">
        {parse(description)}
      </div>
    </div>
  );
};

export const ProjectCardList = ({ className, membersNumber, members }: ProjectCardListProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="ms-auto flex items-center gap-2">
        <BsFillPeopleFill size={20} />
        <span>{members.length}/{membersNumber}</span>
      </div>
      <div className="flex flex-col gap-2">
        {
          members.map(function (member: Member) {
            return (
              <Profile key={member.userId} type="horizontal" username="Nguyen Van B" />
            )
          })
        }
      </div>
    </div>
  );
};

const ProjectCardActions = ({ viewSet, viewTarget }: { viewSet: any, viewTarget: ProjectProps }) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Action buttons will not work - model context not initiated !");
    return;
  }
  const { toggleModal, setModalType, setModalProps, modalProps } = modalContextValue;

  const handleAction = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const action = event.currentTarget.textContent!.toLowerCase();
    // console.log("Clicked action button:", action);

    switch (action) {
      case "view":
        // Toggle project card details
        return;
      case "enroll":
        // Logic for validating student's requirement ?
        let satisfied = false;                                                                                  // test
        if (satisfied) {
          setModalType("status_success");
          break;
        } else {
          let failReasons = ["Not enough credits accumulated ! (<90)", "Your GPA is too low ! (<8.0)"]          // test
          setModalProps({ title: "Project requirements not met !", messages: failReasons })
          setModalType("status_warning");
          break;
        }
      case "unenroll":
        setModalType("project_unerollment");
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
      <Button
        isPrimary={false}
        variant="normal"
        className="w-full py-2"
        onClick={() => viewSet({
          code : viewTarget.id,
          name : viewTarget.title,
          description : viewTarget.description,
          tasks : viewTarget.tasks,
          references : viewTarget.references,
          branches : viewTarget.programs,
          majors : viewTarget.majors,
          supervisors : viewTarget.instructors,
          studentsCount : viewTarget.membersNumber,
          students : viewTarget.members,
        })}
      >
        View
      </Button>
      <Button
        isPrimary
        variant="normal"
        className="mt-2 w-full py-2"
        onClick={handleAction}
      >
        Enroll
      </Button>

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

const ProjectCard = ({ projectObject, detailedViewSetter }: ProjectCardProps) => {
  return (
    <div className="flex w-full cursor-pointer flex-col rounded-md border border-black px-4 py-4">
      <div className="flex">
        <ProjectCardMetadata id={projectObject.id} programs={projectObject.programs} majors={projectObject.majors} instructors={projectObject.instructors} />
        <ProjectCardContent title={projectObject.title} description={projectObject.description} />
        <ProjectCardList className="w-1/4" membersNumber={projectObject.membersNumber} members={projectObject.members} />
      </div>
      <ProjectCardActions viewSet={detailedViewSetter} viewTarget={projectObject} />
    </div>
  );
};

export default ProjectCard;
