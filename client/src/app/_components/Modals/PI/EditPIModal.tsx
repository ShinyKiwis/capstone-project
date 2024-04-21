import Program, { PI, SO } from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";
import { useProgram } from "@/app/providers/ProgramProvider";
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
import axios from "axios";
import React, { Dispatch, SetStateAction, useReducer, useState } from "react";
import { IoCreate } from "react-icons/io5";

interface errorState {
  nameError: string;
  descriptionError: string;
}

interface errorAction {
  type: "set_name_error" | "set_description_error";
}

const reducer = (state: errorState, action: errorAction) => {
  switch (action.type) {
    case "set_name_error": {
      return {
        ...state,
        nameError: "Name is required",
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

interface EditPIModalProps {
  programId: number,
  versionId: number,
  soId: number,
  PI: PI,
  setPIs: Dispatch<SetStateAction<PI[]>>;
}

const EditPIModal = ({ programId, versionId, soId, PI, setPIs }: EditPIModalProps) => {
  const [errors, dispatch] = useReducer(reducer, {
    nameError: "",
    descriptionError: "",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState(PI.name);
  const [description, setDescription] = useState(PI.description);

  const handleCancel = () => {
    setName(PI.name);
    setDescription(PI.description);
  }

  const handleUpdatePI = async () => {
    if (name === "") {
      dispatch({ type: "set_name_error" });
    }
    if (description === "") {
      dispatch({ type: "set_description_error" });
    }
    if (name === "" || description === "") {
      return;
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${soId}/performance-indicators/${PI.id}`,
      {
        name: name,
        description: description
      },
    );
    setPIs(pis => pis.map(pi => {
      if(pi.id == response.data.id) {
        return response.data
      } else {
        return pi
      }
    }))

    toggleNotification(
      `Update PI "${PI.name} successfully`,
      `Update PI "${PI.name}" successfully.`,
      "success",
    );
    close();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          handleCancel();
        }}
        centered
        size="45%"
        padding="md"
        yOffset="8em"
        title={
          <Text size="lg" c="blue" fw={600}>
            Update PI "{PI.name}"
          </Text>
        }
      >
        <div className="px-4">
          <Text size="md" fw={600} className="mb-2">
            Name
          </Text>
          <TextInput
            autoFocus
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            error={errors.nameError}
            placeholder="SO name"
          />
          <Text size="md" fw={600} className="my-2">
            Description
          </Text>
          <TextInput
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            error={errors.descriptionError}
            placeholder="Description of the SO"
          />
          <Group justify="flex-end" gap="xs" mt="md">
            <Button onClick={() => {
              close();
              handleCancel();
            }} 
              variant="outline"
            >
              Cancel
            </Button>
            <Button variant="filled" onClick={handleUpdatePI}>
              Update
            </Button>
          </Group>
        </div>
      </Modal>
      <ActionIcon size="sm" variant="subtle" color="blue" onClick={open}>
        <IconEdit size={16} />
      </ActionIcon>
    </>
  );
};

export default EditPIModal;
