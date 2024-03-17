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
import { ApproveModal, DeactivateModal, DenyModal, EnrollModal, UnenrollModal } from "..";
import { ProjectContext } from "@/app/providers/ProjectProvider";

const ProjectCardDetail = () => {
  const projectContext = useContext(ProjectContext);
  if (!projectContext) return <div>Loading project context</div>;
  const { viewing } = projectContext;

  if (!viewing) return <div>Loading</div>;
  return (
    <Card className="shadow" h="100%" px="xl" radius="md" withBorder>
      <ScrollArea h="100%" scrollbars="y" scrollbarSize={4}>
        <Card.Section inheritPadding py="md">
          <Badge color="yellow">Waiting for Department Head</Badge>
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
                  {viewing.majors.map(major => major.name).join(', ')}
                </Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Branches
                </Text>
                <Text size="sm" fw={500}>
                {viewing.branches.map(branch => branch.name).join(', ')}
                </Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Instructor
                </Text>
                <Text size="sm" fw={500}>
                {viewing.supervisors.map(supervisor => supervisor.name).join(', ')}
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <BsFillPeopleFill size={20} />
                <span>{viewing.students.length}/{viewing.limit}</span>
              </div>
              <div className="flex flex-col gap-1">
                {viewing.students.map((student => {
                  return(
                    <div className="flex items-center gap-1">
                  <Avatar src={null} alt="no image here" color="indigo" />
                  <span>{student.user.name}</span>
                </div>
                  )
                }))}
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
            <Text size="md">
              {parse(viewing.description as string)}
            </Text>
          </div>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>Task</Title>
          <div>
            <Text size="md">
            {parse(viewing.tasks)}
            </Text>
          </div>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>References</Title>
          <div>
            <Text size="md">
            {parse(viewing.references)}
            </Text>
          </div>
        </Card.Section>
      </ScrollArea>
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

export default ProjectCardDetail;
