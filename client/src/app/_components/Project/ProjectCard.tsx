import React, { useContext, useState } from "react";
import { Button, Profile, ProjectInformationTable, Typography } from "..";
import { BsFillPeopleFill } from "react-icons/bs";
import { ModalContext } from "../../providers/ModalProvider";
import { subscribe } from "diagnostics_channel";

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  program: string;
  major: string;
  instructors: [string];
}

const ProjectCardMetadata = () => {
  return (
    <div className="flex w-2/6 flex-col items-center">
      <Typography variant="h2" text="CS220" />
      <ProjectInformationTable fontSize="text-sm" />
    </div>
  );
};

const ProjectCardContent = () => {
  return (
    <div className="w-3/6">
      <Typography variant="h2" text="Image Segmentation" />
      <Typography
        variant="p"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        className="text-sm"
      />
    </div>
  );
};

export const ProjectCardList = ({ className }: { className: string }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="ms-auto flex items-center gap-2">
        <BsFillPeopleFill size={20} />
        <span>1/4</span>
      </div>
      <div className="flex flex-col gap-2">
        <Profile type="horizontal" username="Nguyen Van B" />
      </div>
    </div>
  );
};

const ProjectCardActions = () => {
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
          setModalProps({title: "Project requirements not met !", messages: failReasons})
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
        onClick={handleAction}
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

const ProjectCard = () => {
  return (
    <div className="flex w-full cursor-pointer flex-col rounded-md border border-black px-4 py-4">
      <div className="flex">
        <ProjectCardMetadata />
        <ProjectCardContent />
        <ProjectCardList className="w-1/4" />
      </div>
      <ProjectCardActions />
    </div>
  );
};

export default ProjectCard;
