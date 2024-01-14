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
import ActivateButton from "../UserAction/Buttons/ActivateButton";
import DeleteProjectButton from "../UserAction/Buttons/DeleteProjectButton";
import { usePathname } from "next/navigation";
import DenyButton from "../UserAction/Buttons/DenyButton";
import ProjectStatus from "./ProjectStatus";

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
            <UnenrollButton className="mt-2 w-fit px-6 py-2" />
          </div>
        ) : (
          <EnrollButton
            className="mt-2 w-fit px-6 py-2"
            projectId={projectObject.code}
          />
        )}
      </>
    );
  };

  const ManagementButtons = ({
    viewSet,
    viewTarget,
  }: {
    viewSet?: any;
    viewTarget: ProjectProps;
  }) => {
    const navigate = useNavigate();
    const pathname = usePathname();
    return pathname.includes("approve") ? (
      <>
        <Button isPrimary variant="success" className="w-fit px-6 py-2">
          Approve
        </Button>
        <DenyButton projectId={viewTarget.code} className="w-fit px-6 py-2" />
      </>
    ) : (
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
        {viewTarget.status.includes("DEACTIVATED") ? (
          <ActivateButton
            className="mt-2 w-fit px-6 py-2"
            projectId={viewTarget.code}
            action="Activate"
          />
        ) : (
          <ActivateButton
            className="mt-2 w-fit px-6 py-2"
            projectId={viewTarget.code}
            action="Deactivate"
          />
        )}
        <DeleteProjectButton
          className="mt-2 w-fit px-6 py-2"
          projectId={viewTarget.code}
        />
      </>
    );
  };

  return (
    <div className="rounded-md border border-black px-8 py-4">
      <ProjectStatus status={projectObject.status} />
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
          <ManagementButtons viewTarget={projectObject} />
        )}
      </div>
    </div>
  );
};

export default ProjectCardDetail;
