import React from "react";
import { Button, Typography } from ".";
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
      <table className="text-sm">
        <tbody>
          <tr>
            <th className="text-left">Program</th>
            <th className="pe-4">:</th>
            <td>High Quality</td>
          </tr>
          <tr>
            <th className="text-left">Major</th>
            <th className="pe-4">:</th>
            <td>Computer Science</td>
          </tr>
          <tr>
            <th className="text-left">Instructor</th>
            <th className="pe-4">:</th>
            <td>Nguyen Van A</td>
          </tr>
        </tbody>
      </table>
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

const ProjectCardList = () => {
  return (
    <div className="flex w-1/4 flex-col">
      <div className="flex items-center gap-2 -ms-4">
        <BsFillPeopleFill size={20} />
        <span>0/4</span>
      </div>
    </div>
  );
};

const ProjectCardActions = () => {
  return (
    <div className="ms-auto w-1/4 mt-4">
      <Button isPrimary={false} variant="normal" className="py-2">
        View
      </Button>
      <Button isPrimary variant="normal" className="mt-2 py-2">
        Enroll
      </Button>
    </div>
  );
};

const ProjectCard = () => {
  return (
    <div className="flex w-3/6 flex-col rounded-md border border-black px-4 py-4">
      <div className="flex">
        <ProjectCardMetadata />
        <ProjectCardContent />
        <ProjectCardList />
      </div>
      <ProjectCardActions />
    </div>
  );
};

export default ProjectCard;
