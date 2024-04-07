import { Button, Group, Modal, Text, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { IoCreate } from "react-icons/io5";

const CreateProgramModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [programName, setProgramName] = useState("");
  const [majorName, setMajorName] = useState("");
  const [description, setDescription] = useState("");
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
            Create a new general program
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
            <Button variant="filled">Create general program</Button>
          </Group>
        </div>
      </Modal>
      <Button onClick={open} leftSection={<IoCreate size={20} />}>
        Create general program
      </Button>
    </>
  );
};

export default CreateProgramModal;
