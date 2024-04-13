import Program from "@/app/interfaces/Program.interface";
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";

const EditProgramModal = ({ program }: { program: Program }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [programName, setProgramName] = useState(program.name);
  const [majorName, setMajorName] = useState(program.major);
  const [description, setDescription] = useState(program.description);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size="45%"
        padding="md"
        yOffset="8em"
        title={
          <Text size="lg" c="blue" fw={600}>
            Update "{program.name}" program
          </Text>
        }
      >
        <div className="px-4">
          <Text size="md" fw={600} className="mb-2">
            Program name
          </Text>
          <TextInput
            autoFocus
            value={programName}
            onChange={(event) => setProgramName(event.currentTarget.value)}
          />
          <Text size="md" fw={600} className="my-2">
            Major name
          </Text>
          <TextInput
            value={majorName}
            onChange={(event) => setMajorName(event.currentTarget.value)}
          />
          <Text size="md" fw={600} className="my-2">
            Description
          </Text>
          <Textarea
            autosize
            value={description}
            minRows={4}
            maxRows={6}
            onChange={(event) => setDescription(event.currentTarget.value)}
          />
          <Group justify="flex-end" gap="xs" mt="md">
            <Button onClick={close} variant="outline">
              Cancel
            </Button>
            <Button variant="filled">Update</Button>
          </Group>
        </div>
      </Modal>
      <ActionIcon size="sm" variant="subtle" color="blue" onClick={open}>
        <IconEdit size={16} />
      </ActionIcon>
    </>
  );
};

export default EditProgramModal;
