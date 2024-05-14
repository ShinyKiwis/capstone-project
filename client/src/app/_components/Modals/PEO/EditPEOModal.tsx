import { PEO } from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";
import { ActionIcon, Button, Group, Modal, Text, TextInput, Textarea } from "@mantine/core";
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

interface PEOModalPropTypes {
  programId: number;
  versionId: number;
  PEO: PEO;
  setPEOs: Dispatch<SetStateAction<PEO[]>>;
}

const EditPEOModal = ({programId, versionId, PEO, setPEOs}: PEOModalPropTypes) => {
  const [errors, dispatch] = useReducer(reducer, {
    nameError: "",
    descriptionError: "",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState(PEO.name);
  const [description, setDescription] = useState(PEO.description);

  const handleCreatePEO = async () => {
    if (name === "") {
      dispatch({ type: "set_name_error" });
    }
    if (description === "") {
      dispatch({ type: "set_description_error" });
    }
    if (name === "" || description === "") {
      return
    }

    const response = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/program-education-objectives/${PEO.id}`, {
      name: name,
      description: description
    })

    setPEOs(peos => peos.map(peo => {
      if(peo.id == response.data.id) {
        return response.data
      }else {
        return peo
      }
    }))

    toggleNotification(
      `Update PEO "${name} successfully`,
      `Update PEO "${name}" successfully.`,
      "success",
    );
    close();
  };

  const handleCancel = () => {
    setName(PEO.name);
    setDescription(PEO.description);
  }
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
            Update PEO &quot{PEO.name}&quot
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
            placeholder="PEO name"
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
            placeholder="Description of the PEO"
          />
          <Group justify="flex-end" gap="xs" mt="md">
            <Button onClick={() => {
              close();
              handleCancel();
            }} variant="outline">
              Cancel
            </Button>
            <Button variant="filled" onClick={handleCreatePEO}>
              Update PEO
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

export default EditPEOModal;
