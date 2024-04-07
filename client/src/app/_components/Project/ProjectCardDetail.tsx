import parse from "html-react-parser";
import {
  Card,
  Badge,
  Title,
  Group,
  Text,
  Avatar,
  ScrollArea,
  Button,
} from "@mantine/core";
import React, { useContext } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  ApproveModal,
  DeactivateModal,
  DeleteProjectModal,
  DenyModal,
  EnrollModal,
  UnenrollModal,
} from "..";
import { useProjects } from "@/app/providers/ProjectProvider";
import { useAuth } from "@/app/providers/AuthProvider";
import { usePathname, useSearchParams } from "next/navigation";
import useNavigate from "@/app/hooks/useNavigate";
import { isStudent } from "@/app/lib/isStudent";
import { userHasResource } from "@/app/lib/userHasResource";

const ProjectCardDetail = () => {
  const projectContextValues = useProjects();
  const { user } = useAuth();
  const { viewing } = projectContextValues;
  const navigate = useNavigate();
  const pathname = usePathname();

  if (!viewing) return <Card className="shadow" h="100%" px="xl" radius="md" withBorder>Click on a project card to view details</Card>;
  return (
    <Card className="shadow" h="100%" radius="md" withBorder>
      <ScrollArea h="100%" px='xl' scrollbars="y" scrollbarSize={4}>
        <Card.Section inheritPadding py="md" className={isStudent(user) ? 'hidden' : ''}>
          <Badge color="yellow">{viewing.status}</Badge>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={2}>{viewing.code}</Title>
          <Title order={1}>{viewing.name}</Title>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Group justify="space-between">
            <div className="flex flex-col gap-4">
              <div>
                <Text size="sm" c="dimmed">
                  Program
                </Text>
                <Text size="sm" fw={500}>
                  {viewing.programs.map((program) => program.name).join(", ")}
                </Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Branches
                </Text>
                <Text size="sm" fw={500}>
                  {viewing.branches.map((branch) => branch.name).join(", ")}
                </Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Instructor
                </Text>
                <Text size="sm" fw={500}>
                  {viewing.supervisors
                    .map((supervisor) => supervisor.name)
                    .join(", ")}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <BsFillPeopleFill size={20} />
                <span>
                  {viewing.students.length}/{viewing.limit}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {viewing.students.map((student) => {
                  return (
                    <div className="flex items-center gap-1" key={student.userId}>
                      <Avatar src={null} alt="no image here" color="indigo" />
                      <span>{student.user.name}</span>
                    </div>
                  );
                })}
                {/* <div className="flex items-center gap-1">
                  <Avatar src={null} alt="no image here" color="indigo" />
                  <span>Ladiz Washroom</span>
                </div>
                <div className="flex items-center gap-1">
                  <Avatar src={null} alt="no image here" color="indigo" />
                  <span>Emplyes Mustwashhands</span>
                </div>
                <div className="flex items-center gap-1">
                  <Avatar src={null} alt="no image here" color="indigo" />
                  <span>Max Imumoccupancy120</span>
                </div> */}
              </div>
            </div>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>Description</Title>
          <div>
            <Text size="md" className="">
              {parse(viewing.description as string)}
            </Text>
          </div>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>Task</Title>
          <div>
            <Text size="md">{parse(viewing.tasks)}</Text>
          </div>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>References</Title>
          <div>
            <Text size="md">{parse(viewing.references)}</Text>
          </div>
        </Card.Section>
      </ScrollArea>
      <Card.Section inheritPadding py="xs">
        <Group justify="flex-end">
          {userHasResource("approve_projects") &&
          pathname.includes("approve") ? (
            <>
              <DenyModal targetProject={viewing} />
              <ApproveModal targetProject={viewing} />
            </>
          ) : null}
          {!pathname.includes("approve") &&
          userHasResource("enroll_projects") ? (
            <>
              {user?.project?.code === viewing.code ? (
                <UnenrollModal targetProject={viewing} />
              ) : (
                <EnrollModal targetProject={viewing} />
              )}
            </>
          ) : null}
          {!pathname.includes("approve") &&
          userHasResource("modify_projects") &&
          viewing.owner.id === user?.id ? (
            <>
              <DeactivateModal targetProject={viewing} />
              <DeleteProjectModal targetProject={viewing} />
              <Button
                onClick={() => navigate(`project/edit/${viewing.code}`)}
              >
                Edit
              </Button>
            </>
          ) : null}
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ProjectCardDetail;
