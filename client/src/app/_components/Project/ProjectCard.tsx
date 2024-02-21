import React, { useContext } from "react";
import { Button, Profile, ProjectInformationTable, Typography } from "..";
import { BsFillPeopleFill } from "react-icons/bs";
import { ModalContext } from "../../providers/ModalProvider";
import parse from "html-react-parser";
import { useNavigate, useUser } from "@/app/hooks";
import { AuthContext } from "@/app/providers/AuthProvider";
import useHasRole from "@/app/lib/hasRole";
import EnrollButton from "../UserAction/Buttons/EnrollButton";
import UnenrollButton from "../UserAction/Buttons/UnenrollButton";
import DeleteProjectButton from "../UserAction/Buttons/DeleteProjectButton";
import ActivateButton from "../UserAction/Buttons/ActivateButton";
import { usePathname, useSearchParams } from "next/navigation";
import DenyButton from "../UserAction/Buttons/DenyButton";
import ProjectStatus from "./ProjectStatus";
import ApproveButton from "../UserAction/Buttons/ApproveButton";

interface ProjectCardProps {
  projectObject: ProjectProps;
  detailedViewSetter: any;
}

interface ProjectCardMetadataProps
  extends Pick<ProjectProps, "code" | "branches" | "majors" | "supervisors"> {}

interface ProjectCardContentProps
  extends Pick<ProjectProps, "name" | "description"> {}

interface ProjectCardListProps
  extends Pick<ProjectProps, "studentsCount" | "students" | "limit"> {
  className: string;
}


const ProjectCardMetadata = ({
  code,
  branches,
  majors,
  supervisors,
}: ProjectCardMetadataProps) => {
  return (
    <div className="flex w-2/6 flex-col items-center">
      <Typography variant="h2" text={code.toString()} />
      <ProjectInformationTable
        fontSize="text-sm"
        branches={branches}
        majors={majors}
        supervisors={supervisors}
      />
    </div>
  );
};

const ProjectCardContent = ({ name, description }: ProjectCardContentProps) => {
  return (
    <div className="w-3/6">
      <Typography variant="h2" text={name} />
      <div className="text-sm [&>ol]:list-inside [&>ol]:list-decimal [&>ul]:list-inside [&>ul]:list-disc">
        {parse(`${description.substring(0, 250)}...`)}
      </div>
    </div>
  );
};

export const ProjectCardList = ({
  className,
  studentsCount,
  limit,
  students,
}: ProjectCardListProps) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="ms-auto flex items-center gap-2">
        <BsFillPeopleFill size={20} />
        <span>
          {studentsCount}/{limit}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {students.map(function (member: Student) {
          // console.log(member)
          return (
            <Profile
              key={member.userId}
              type="horizontal"
              username={member.user.name}
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
}: {
  viewSet: any;
  viewTarget: ProjectProps;
}) => {
  const user = useUser();
  const authContext = useContext(AuthContext);
  // console.log("user:",user)
  return (
    <>
      <Button
        isPrimary={false}
        variant="normal"
        className="w-full py-2"
        onClick={() => viewSet(viewTarget)}
      >
        View
      </Button>
      {user.project.code === viewTarget.code ? (
        <UnenrollButton className="mt-2 w-full py-2" />
      ) : (
        <EnrollButton
          className="mt-2 w-full py-2"
          projectId={viewTarget.code}
        />
      )}
    </>
  );
};

const ManagementButtons = ({
  viewSet,
  viewTarget,
}: {
  viewSet: any;
  viewTarget: ProjectProps;
}) => {
  const searchParams = useSearchParams();
  const navigate = useNavigate();
  const pathname = usePathname();
  return pathname.includes("approve") ? (
    <>
      <Button
        isPrimary
        variant="normal"
        className="mt-2 w-full py-2"
        onClick={() => viewSet(viewTarget)}
      >
        View
      </Button>
      <ApproveButton projectId={viewTarget.code} className="mt-2 w-full py-2" />
      <DenyButton projectId={viewTarget.code} className="mt-2 w-full py-2" />
    </>
  ) : (
    <>
      <Button
        isPrimary={false}
        variant="normal"
        className="w-full py-2"
        onClick={() => {
          navigate(
            `/project/edit/${viewTarget.code}?project=${searchParams.get(
              "project",
            )}`,
          );
        }}
      >
        Edit
      </Button>
      <Button
        isPrimary
        variant="normal"
        className="mt-2 w-full py-2"
        onClick={() => viewSet(viewTarget)}
      >
        View
      </Button>
      {viewTarget.status.includes("DEACTIVATED") ? (
        <ActivateButton
          className="mt-2 w-full py-2"
          projectId={viewTarget.code}
          action="Activate"
        />
      ) : (
        <ActivateButton
          className="mt-2 w-full py-2"
          projectId={viewTarget.code}
          action="Deactivate"
        />
      )}
      <DeleteProjectButton
        className="mt-2 w-full py-2"
        projectId={viewTarget.code}
      />
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
  const isStudent = useHasRole("student")
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error(
      "Action buttons will not work - model context not initiated !",
    );
    return;
  }

  return (
    <div className="ms-auto mt-4 w-1/4">
      {isStudent ? (
        <StudentButtons viewSet={viewSet} viewTarget={viewTarget} />
      ) : (
        <ManagementButtons viewSet={viewSet} viewTarget={viewTarget} />
      )}
    </div>
  );
};

const ProjectCard = ({
  projectObject,
  detailedViewSetter,
}: ProjectCardProps) => {
  const authContext = useContext(AuthContext);
  // console.log(
  //   "Currently enrolled project ID:",
  //   authContext?.user?.project?.code,
  // );

  return (
    <div className="flex w-full cursor-pointer flex-col rounded-md border border-black px-4 py-4">
      {!useHasRole("student") && <ProjectStatus status={projectObject.status} />}
      <div className="flex">
        <ProjectCardMetadata
          code={projectObject.code}
          branches={projectObject.branches}
          majors={projectObject.majors}
          supervisors={projectObject.supervisors}
        />
        <ProjectCardContent
          name={projectObject.name}
          description={projectObject.description}
        />
        <ProjectCardList
          className="w-1/4"
          studentsCount={projectObject.studentsCount}
          students={projectObject.students}
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
