import React from "react";
import { Button, ProjectInformationTable, Typography } from "..";
import { ProjectCardList } from "./ProjectCard";

const ProjectCardDetail = () => {
  return (
    <div className="rounded-md border border-black px-8 py-4">
      <Typography variant="h1" text="CS220" />
      <Typography variant="h1" text="Image Segmentation" />
      <div className="mb-4 flex w-full">
        <ProjectInformationTable fontSize="text-lg" />
        <div className="ms-auto">
          <ProjectCardList className="w-full" />
        </div>
      </div>
      <Typography variant="h2" text="Description" />
      <p className="text-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.
      </p>
      <Typography variant="h2" text="Tasks" />
      <p className="text-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.{" "}
      </p>
      <Typography variant="h2" text="References" />
      <p className="text-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      </p>
      <div className="mt-4 flex">
        <Button isPrimary variant="normal" className="ms-auto px-8 py-2">
          Enroll
        </Button>
      </div>
    </div>
  );
};

export default ProjectCardDetail;
