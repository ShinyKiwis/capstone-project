import React from "react";
import { Button, Profile, ProjectInformationTable, Typography } from ".";
import { BsFillPeopleFill } from "react-icons/bs";

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
      <ProjectInformationTable fontSize="text-sm"/>
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

export const ProjectCardList = ({className}: {className: string}) => {
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
  return (
    <div className="ms-auto mt-4 w-1/4">
      <Button isPrimary={false} variant="normal" className="py-2 w-full">
        View
      </Button>
      <Button isPrimary variant="normal" className="mt-2 py-2 w-full">
        Enroll
      </Button>
    </div>
  );
};

const ProjectCard = () => {
  return (
    <div className="flex w-full flex-col rounded-md border border-black px-4 py-4 cursor-pointer">
      <div className="flex">
        <ProjectCardMetadata />
        <ProjectCardContent />
        <ProjectCardList className="w-1/4"/>
      </div>
      <ProjectCardActions />
    </div>
  );
};

export default ProjectCard;
