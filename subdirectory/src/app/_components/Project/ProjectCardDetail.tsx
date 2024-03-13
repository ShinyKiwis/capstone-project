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
import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { ApproveModal, DeactivateModal, DenyModal, EnrollModal, UnenrollModal } from "..";

const ProjectCardDetail = () => {
  return (
    <Card className="shadow" h="100%" px="xl" radius="md" withBorder>
      <ScrollArea h="100%" scrollbars="y" scrollbarSize={4}>
        <Card.Section inheritPadding py="md">
          <Badge color="yellow">Waiting for Department Head</Badge>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={2}>CS-102</Title>
          <Title order={1}>Image Segmentation</Title>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Group justify="space-between">
            <div className="flex flex-col gap-4">
              <div>
                <Text size="sm" c="dimmed">
                  Program
                </Text>
                <Text size="sm" fw={500}>
                  English Program
                </Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Major
                </Text>
                <Text size="sm" fw={500}>
                  Computer Science, ComputerEngineering
                </Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Instructor
                </Text>
                <Text size="sm" fw={500}>
                  Vo Thi Ngoc Chau
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <BsFillPeopleFill size={20} />
                <span>3/4</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
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
                </div>
              </div>
            </div>
          </Group>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>Description</Title>
          <div>
            <Text size="md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              provident eos fugiat id necessitatibus magni ducimus molestias.
              Placeat, consequatur. Quisquam, quae magnam perspiciatis excepturi
              iste sint itaque sunt laborum. Nihil?
            </Text>
          </div>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>Task</Title>
          <div>
            <Text size="md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              provident eos fugiat id necessitatibus magni ducimus molestias.
              Placeat, consequatur. Quisquam, quae magnam perspiciatis excepturi
              iste sint itaque sunt laborum. Nihil?
            </Text>
          </div>
        </Card.Section>
        <Card.Section inheritPadding py="xs">
          <Title order={3}>References</Title>
          <div>
            <Text size="md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              provident eos fugiat id necessitatibus magni ducimus molestias.
              Placeat, consequatur. Quisquam, quae magnam perspiciatis excepturi
              iste sint itaque sunt laborum. Nihil?
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
