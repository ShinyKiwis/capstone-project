"use client";
import { toggleNotification } from "@/app/lib/notification";
import { useProgram } from "@/app/providers/ProgramProvider";
import { Button, Group, Modal, Text, TextInput, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import React, { useReducer, useState } from "react";
import { IoCreate } from "react-icons/io5";

interface errorState {
  nameError: string;
  majorError: string;
  descriptionError: string;
}

interface errorAction {
  type: "set_name_error" | "set_major_error" | "set_description_error";
}

const reducer = (state: errorState, action: errorAction) => {
  switch (action.type) {
    case "set_name_error": {
      return {
        ...state,
        nameError: "Name is required",
      };
    }
    case "set_major_error": {
      return {
        ...state,
        majorError: "Major is required",
      };
    }
    case "set_description_error": {
      return {
        ...state,
        descriptionError: "Description is required",
      };
    }
  }
};

const CreateProgramModal = () => {
  const [errors, dispatch] = useReducer(reducer, {
    nameError: "",
    majorError: "",
    descriptionError: "",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [programName, setProgramName] = useState("");
  const [majorName, setMajorName] = useState("");
  const [description, setDescription] = useState("");
  const { programs, setPrograms } = useProgram();

  const handleCreateProgram = async () => {
    if (programName === "") {
      dispatch({ type: "set_name_error" });
    }
    if (majorName === "") {
      dispatch({ type: "set_major_error" });
    }
    if (description === "") {
      dispatch({ type: "set_description_error" });
    }
    if (programName === "" || majorName === "" || description === "") {
      return;
    }
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CREATE_PROGRAMS_URL!,
      {
        name: programName,
        major: majorName,
        description: description,
      },
    );
    setPrograms([...programs, response.data]);
    toggleNotification(
      `Create program "${programName} successfully`,
      `Create program "${programName}" successfully.`,
      "success",
    );
    close();
  };
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
            error={errors.nameError}
            placeholder="Program name"
          />
          <Text size="md" fw={600} className="my-2">
            Major name
          </Text>
          <TextInput
            value={majorName}
            onChange={(event) => setMajorName(event.currentTarget.value)}
            error={errors.majorError}
            placeholder="Major name"
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
            error={errors.descriptionError}
            placeholder="Description of the program"
          />
          <Group justify="flex-end" gap="xs" mt="md">
            <Button onClick={close} variant="outline">
              Cancel
            </Button>
            <Button variant="filled" onClick={handleCreateProgram}>
              Create general program
            </Button>
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
