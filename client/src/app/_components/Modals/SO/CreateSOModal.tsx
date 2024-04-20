import { SO } from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";
import { useProgram } from "@/app/providers/ProgramProvider";
import { ActionIcon, Button, Group, Modal, Table, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import React, { Dispatch, SetStateAction, useReducer, useState } from "react";
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

interface SOModalPropTypes {
  SOs: SO[];
  setSOs: Dispatch<SetStateAction<SO[]>>;
}

const CreateSOModal = ({SOs, setSOs} : SOModalPropTypes) => {
  const [errors, dispatch] = useReducer(reducer, {
    nameError: "",
    majorError: "",
    descriptionError: "",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [inputs, setInputs] = useState<SO[]>([]);

  const handleCreateProgram = async () => {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_CREATE_PROGRAMS_URL!,
      {
      },
    );
    toggleNotification(
      `Create program "" successfully`,
      `Create program "" successfully.`,
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
            Create SOs
          </Text>
        }
      >
        <div className="px-4">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>SO Code</Table.Th>
                <Table.Th>Description Code</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {
                inputs.map(input => (
                  <Table.Tr>
                    <Table.Td>
                      <TextInput placeholder="SO code..." value={""}/>
                    </Table.Td>
                    <Table.Td>
                      <TextInput placeholder="SO description..."/>
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon size="sm" variant="subtle" color="red">
                        <IconX size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))
              }
            </Table.Tbody>
          </Table>
          <Group justify="flex-end" gap="xs" mt="md">
            <Button onClick={close} variant="outline">
              Cancel
            </Button>
            <Button variant="filled" onClick={handleCreateProgram}>
              Create SOs
            </Button>
          </Group>
        </div>
      </Modal>
      <Button onClick={open} leftSection={<IoCreate size={20} />}>
        Create SOs
      </Button>
    </>
  );
};

export default CreateSOModal;
