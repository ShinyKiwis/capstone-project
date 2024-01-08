import React from "react";
import { Button, ProjectInformationTable, Typography } from "..";
import { ProjectCardList, ProjectProps } from "./ProjectCard";

const ProjectCardDetail = ({ id, title, description, programs, majors, instructors, membersNumber: membersNo, members }: ProjectProps) => {
  return (
    <div className="rounded-md border border-black px-8 py-4">
      <Typography variant="h1" text={id.toString()} />
      <Typography variant="h1" text={title} />
      <div className="mb-4 flex w-full">
        <ProjectInformationTable fontSize="text-lg" programs={programs} majors={majors} instructors={instructors} />
        <div className="ms-auto">
          <ProjectCardList className="w-full" membersNumber={membersNo} members={members} />
        </div>
      </div>
      <Typography variant="h2" text="Description" />
      <p className="text-md">
        {description}
      </p>
      <Typography variant="h2" text="Tasks" />
      <p className="text-md">
        Parsed later{" "}
      </p>
      <Typography variant="h2" text="References" />
      <p className="text-md">
        Parsed later
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
