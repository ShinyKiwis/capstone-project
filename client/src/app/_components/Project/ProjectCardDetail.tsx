import React, { useContext } from "react";
import parse from "html-react-parser";
import { Button, ProjectInformationTable, Typography } from "..";
import { ProjectCardList, ProjectProps } from "./ProjectCard";
import { AuthContext } from "@/app/providers/AuthProvider";
import { useNavigate, useUser } from "@/app/hooks";
import hasRole from "@/app/lib/hasRole";
import { ModalContext } from "@/app/providers/ModalProvider";
import axios from "axios";
import UnenrollButton from "../UserAction/Buttons/UnenrollButton";
import EnrollButton from "../UserAction/Buttons/EnrollButton";

const ProjectCardDetail = ({
  projectObject,
}: {
  projectObject: ProjectProps;
}) => {
  const user = useUser();
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error(
      "Action buttons will not work - model context not initiated !",
    );
    return;
  }
  const { toggleModal, setModalType, setModalProps, modalProps } =
    modalContextValue;

  const StudentButtons = ({}) => {
    return (
      <>
        {user.project.code === projectObject.code ? (
          <div className="mt-2 w-fit">
            <UnenrollButton className="mt-2 w-fit py-2 px-6"/>
          </div>
        ) : (
          <EnrollButton className="mt-2 w-fit py-2 px-6" projectId={projectObject.code} />
        )}
      </>
    );
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
          className="mt-2 w-fit px-6 py-2"
          onClick={() => {
            navigate(`/project/edit/${projectObject.code}`);
          }}
        >
          Edit
        </Button>
        <Button
          isPrimary
          variant="normal"
          className="mt-2 w-fit px-6 py-2"
          onClick={() => viewSet(projectObject)}
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
        <ProjectInformationTable
          fontSize="text-lg"
          branches={projectObject.branches}
          majors={projectObject.majors}
          supervisors={projectObject.supervisors}
        />
        <div className="ms-auto">
          <ProjectCardList
            className="w-full"
            studentsCount={projectObject.studentsCount}
            students={projectObject.students}
            limit={projectObject.limit}
          />
        </div>
      </div>
      <Typography variant="h2" text="Description" />
      <div className="text-md [&>ol]:list-inside [&>ol]:list-decimal [&>ul]:list-inside [&>ul]:list-disc">
        {parse(projectObject.description)}
      </div>
      <Typography variant="h2" text="Tasks" />
      <div className="text-md [&>ol]:list-inside [&>ol]:list-decimal [&>ul]:list-inside [&>ul]:list-disc">
        {parse(projectObject.tasks)}
      </div>
      <Typography variant="h2" text="References" />
      <div className="text-md [&>ol]:list-inside [&>ol]:list-decimal [&>ul]:list-inside [&>ul]:list-disc">
        {parse(projectObject.references)}
      </div>
      <div className="mt-4 flex justify-end gap-4">
        {hasRole("student") ? (
          <StudentButtons />
        ) : (
          <ManagementButtons handleAction={""} />
        )}
      </div>
    </div>
  );
};

export default ProjectCardDetail;
