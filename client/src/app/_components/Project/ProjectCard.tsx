import {
  Avatar,
  Badge,
  Card,
  Group,
  Title,
  Tooltip,
  Text,
  Container,
  Button,
} from "@mantine/core";
import React, { useContext } from "react";
import {
  ApproveModal,
  DeactivateModal,
  DeleteProjectModal,
  DenyModal,
  EnrollModal,
  UnenrollModal,
} from "..";
import parse from "html-react-parser";
import { ProjectContext, useProjects } from "@/app/providers/ProjectProvider";
import useNavigate from "@/app/hooks/useNavigate";
import { useAuth } from "@/app/providers/AuthProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { isStudent } from "@/app/lib/isStudent";
import { userHasResource, userHasRole } from "@/app/lib/userHasResource";
import { useDeadlines } from "@/app/providers/DeadlinesProvider";

interface ProjectCardProps {
  projectObject: Project;
  // detailedViewSetter: any;
}

interface ProjectCardStudentListProps
  extends Pick<Project, "studentsCount" | "students" | "limit"> {}

const ProjectCardStudentList = ({
  studentsCount,
  limit,
  students,
}: ProjectCardStudentListProps) => {
  return (
    <Group gap="xs">
      <div className="ms-auto flex items-center gap-2">
        {/* <BsFillPeopleFill size={20} /> */}
        <span>
          {studentsCount}/{limit}
        </span>
      </div>
      <Tooltip.Group openDelay={300} closeDelay={100}>
        <Avatar.Group spacing="sm">
          {students.map((student) => (
            <Tooltip key={student.userId} label={student.user.name} withArrow>
              <Avatar color="blue" radius="xl">
                {student.user.name
                  .split(" ")
<<<<<<< HEAD
                  .map((word:string) => word[0].toUpperCase())}
=======
                  .map((word: string) => word[0].toUpperCase())}
>>>>>>> 207703b (commit for slide preparation)
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      </Tooltip.Group>
    </Group>
  );
};

const ProjectCard = ({ projectObject }: ProjectCardProps) => {
  // console.log("PROJECT", projectObject)
  const projectContextValues = useProjects();
  const { user } = useAuth();
  const pathname = usePathname();
  // console.log("here's the user");
  // console.log(user);
  const navigate = useNavigate();
  const { viewing, setViewing } = projectContextValues;

  return (
    <Card
      className="cursor-pointer shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
      padding="xl"
      radius="md"
      my="md"
      bg={viewing && viewing.code === projectObject.code ? "#cffafe" : ""}
      withBorder
      key={projectObject.code}
      onClick={() => setViewing(projectObject)}
    >
      <Card.Section
        inheritPadding
        py="xs"
        className={isStudent(user) ? "hidden" : ""}
      >
        <Badge color="yellow">{projectObject.status}</Badge>
      </Card.Section>
      <Card.Section inheritPadding>
        <Group justify="space-between">
          <Title order={2}>
            {projectObject.code} - {projectObject.name}
          </Title>
          <ProjectCardStudentList
            studentsCount={projectObject.studentsCount}
            limit={projectObject.limit}
            students={projectObject.students}
          />
        </Group>
      </Card.Section>
      <Card.Section inheritPadding mt="md">
        <Group gap="xl" align="flex-start">
          <div>
            <Text size="sm" c="dimmed">
              Programs
            </Text>
            {projectObject.programs.map((program) => (
              <Text key={program.id} size="sm" fw={500}>
                {program.name}
              </Text>
            ))}
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Branches
            </Text>
            {projectObject.branches.map((branch) => (
              <Text key={branch.id} size="sm" fw={500}>
                {branch.name}
              </Text>
            ))}
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Instructor
            </Text>
            {projectObject.supervisors.map((supervisor) => (
              <Text key={supervisor.id} size="sm" fw={500}>
                {supervisor.name}
              </Text>
            ))}
          </div>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding mt="md">
        <Container fluid p={0}>
          <Text size="sm" c="dimmed" lineClamp={3}>
            {parse(projectObject.description)}
          </Text>
        </Container>
      </Card.Section>
      <Card.Section inheritPadding py="xs">
        <Group justify="flex-end">
          {userHasResource("approve_projects") &&
          pathname.includes("approve") &&
          projectObject.status != "APPROVED" && projectObject.status != "DRAFT" && projectObject.status != "REJECTED" &&
          ((userHasRole("DepartmentHead") &&
            projectObject.status.toLowerCase() ===
              "waiting_for_department_head") ||
            (userHasRole("ProgramChair") &&
              projectObject.status.toLowerCase() ===
                "waiting_for_program_chair") ||
            userHasRole("SuperAdmin")) ? (
            <>
              <DenyModal targetProject={projectObject} />
              <ApproveModal targetProject={projectObject} />
            </>
          ) : null}
          {!pathname.includes("approve") && userHasResource("enroll_projects") ? 
          (
            <>
              {user?.project?.code === projectObject.code ? (
                <UnenrollModal targetProject={projectObject} />
              ) : (
                <EnrollModal targetProject={projectObject} />
              )}
            </>
          ) : null}
          {!pathname.includes("approve") &&
          userHasResource("modify_projects") &&
          projectObject.owner.id === user?.id ? (
            <>
              <DeactivateModal targetProject={projectObject} />
              <DeleteProjectModal targetProject={projectObject} />
              <Button
                onClick={() => navigate(`project/edit/${projectObject.code}`)}
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

export default ProjectCard;
