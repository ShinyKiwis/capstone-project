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
import React from "react";
import { ApproveModal, DeactivateModal, DenyModal, EnrollModal, UnenrollModal } from "..";

interface ProjectCardProps {
  projectObject: ProjectProps;
  // detailedViewSetter: any;
}

interface ProjectCardStudentListProps
  extends Pick<ProjectProps, "studentsCount" | "students" | "limit"> {}

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
          {students.map((student, index) => (
            <Tooltip key={index} label={student.user.name} withArrow>
              <Avatar
                src="https://bizweb.dktcdn.net/100/438/408/files/gigachad-meme-yodyvn.jpg"
                radius="xl"
                size="sm"
              />
            </Tooltip>
          ))}
          <Tooltip
            withArrow
            label={
              <>
                <div>John Outcast</div>
                <div>Levi Capitan</div>
              </>
            }
          >
            <Avatar radius="xl" size="sm">
              +2
            </Avatar>
          </Tooltip>
        </Avatar.Group>
      </Tooltip.Group>
    </Group>
  );
};

const ProjectCard = ({ projectObject }: ProjectCardProps) => {
  return (
    <Card
      className="cursor-pointer shadow transition-all hover:-translate-y-0.5 hover:shadow-lg"
      padding="xl"
      radius="md"
      my="md"
      withBorder
    >
      <Card.Section inheritPadding py="xs">
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
              Program
            </Text>
            {projectObject.branches.map((branch) => (
              <Text size="sm" fw={500}>
                {branch.name}
              </Text>
            ))}
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Major
            </Text>
            {projectObject.majors.map((majors) => (
              <Text size="sm" fw={500}>
                {majors.name}
              </Text>
            ))}
          </div>
          <div>
            <Text size="sm" c="dimmed">
              Instructor
            </Text>
            {projectObject.supervisors.map((supervisor) => (
              <Text size="sm" fw={500}>
                {supervisor.name}
              </Text>
            ))}
          </div>
        </Group>
      </Card.Section>
      <Card.Section inheritPadding mt="md">
        <Container fluid p={0}>
          <Text size="sm" c="dimmed" lineClamp={3}>
            {projectObject.description}
          </Text>
        </Container>
      </Card.Section>
      <Card.Section inheritPadding py="xs">
        <Group justify="flex-end">
          <ApproveModal />
          <EnrollModal />
          <UnenrollModal />
          <DenyModal />
          <DeactivateModal />
        </Group>
      </Card.Section>
    </Card>
  );
};

export default ProjectCard;
