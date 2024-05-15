import { Avatar, Card, Group, Tooltip, Text, Container } from "@mantine/core";
import React from "react";
import parse from "html-react-parser";

interface ProjectCardMinimalProps {
  projectObject: Project;
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
                  .map((word: string) => word[0].toUpperCase())}
              </Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      </Tooltip.Group>
    </Group>
  );
};

const ProjectCardMinimal = ({ projectObject }: ProjectCardMinimalProps) => {
  return (
    <Card
      className="shadow"
      padding="md"
      py='xl'
      radius="md"
      my="md"
      withBorder
      key={projectObject.code}
    >
      <Card.Section inheritPadding>
        <Group justify="space-between">
          <Text size="md" fw={500}>
            {projectObject.code} - {projectObject.name}
          </Text>
          {projectObject.studentsCount > 0 ? (
            <ProjectCardStudentList
              studentsCount={projectObject.studentsCount}
              limit={projectObject.limit}
              students={projectObject.students}
            />
          ) : (
            <Text c={"red"}>No members</Text>
          )}
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
    </Card>
  );
};

export default ProjectCardMinimal;
