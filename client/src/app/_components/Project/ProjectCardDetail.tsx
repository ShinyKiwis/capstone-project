import React from "react";
import parse from 'html-react-parser'
import { Button, ProjectInformationTable, Typography } from "..";
import { ProjectCardList, ProjectProps } from "./ProjectCard";

const ProjectCardDetail = ({ id, title, description, tasks, references, programs, majors, instructors, membersNumber: membersNo, members }: ProjectProps) => {
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
      <div className="text-md [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-disc [&>ul]:list-inside">
        {parse(description)}
      </div>
      <Typography variant="h2" text="Tasks" />
      <div className="text-md [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-disc [&>ul]:list-inside">
        {parse(tasks)}
      </div>
      <Typography variant="h2" text="References" />
      <div className="text-md [&>ol]:list-decimal [&>ol]:list-inside [&>ul]:list-disc [&>ul]:list-inside">
        {parse(references)}
      </div>
      <div className="mt-4 flex">
        <Button isPrimary variant="normal" className="ms-auto px-8 py-2">
          Enroll
        </Button>
      </div>
    </div>
  );
};

export default ProjectCardDetail;
