import { PI } from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";
import { ActionIcon, Button, Group, Modal, Table, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { IoCreate } from "react-icons/io5";

interface PIModalPropTypes {
  programId: number;
  versionId: number;
  soId: number;
  setPIs: Dispatch<SetStateAction<PI[]>>;
}

interface InitialPIType {
  name: string,
  description: string,
  codeError: string,
  descriptionError: string
}

const CreatePIModal = ({programId, versionId, soId, setPIs} : PIModalPropTypes) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [inputs, setInputs] = useState<InitialPIType[]>([{
    name: "",
    description: "",
    codeError: "",
    descriptionError: ""
  }]);
  const [index, setIndex] = useState(-1)

  const handleCreatePIs = async () => {
    let hasError = false;
    inputs.forEach((input, index) => {
      const errors = {
        codeError: "",
        descriptionError: ""
      }
      if ((inputs.length === 1 || index !== inputs.length - 1) && input.name === "") {
        hasError = true
        errors.codeError = "Code is required"
      }
      if((inputs.length === 1 || index !== inputs.length - 1) && input.description === "") {
        hasError = true
        errors.descriptionError = "Description is required"
      }
      setInputs(inputs.map((inp, idx) => {
        if(idx === index) {
          return {
            ...inp,
            codeError: errors.codeError,
            descriptionError: errors.descriptionError
          }
        } else {
          return inp
        }
      }))
    })
    if(hasError) {
      return;
    }

    const responses = await Promise.all(
      inputs.map((input) => {
        if (input.name !== "" && input.description !== "") {
          return axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${soId}/performance-indicators`,
            {
              name: input.name,
              description: input.description
            }
          );
        } else {
          return null;
        }
      })
    );

    const successfulResponses = responses.filter((response) => response !== null);
    setPIs((pis) => [...pis, ...successfulResponses.map((response) => response!.data)]);

    handleCancel();
    toggleNotification(
      `Create ${inputs.length - 1} PIs successfully`,
      `Create ${inputs.length - 1} PIs successfully.`,
      "success",
    );
    close();
  };

  const handleChangePI = (index: number, key: string, value: string) => {
    setIndex(index);
    setInputs(inputs.map((input, idx) => {
      if (idx == index) {
        return {
          ...input,
          [key]: value
        }
      } else {
        return input
      }
    }))
  }

  const handleDeletePI = (index: number) => {
    if(inputs.length > 1) {
      setInputs(inputs.filter((_, idx) => idx != index))
    }
  }

  const handleCancel = () => {
    setInputs([{
      name: "",
      description: "",
      codeError: "",
      descriptionError: ""
    }])
  }
 
  useEffect(() => {
    if(index == inputs.length - 1 && inputs[index].name !== "" && inputs[index].description !== "") {
      setInputs([...inputs, {
        name: "",
        description: "",
        codeError: "",
        descriptionError: ""
      }])
    }
  }, [inputs])

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
            Create PIs
          </Text>
        }
      >
        <div className="px-4">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>PI Code</Table.Th>
                <Table.Th>Description Code</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {
                inputs.map((input, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <TextInput 
                        placeholder="PI name..." 
                        value={input.name} 
                        onChange={(e) => handleChangePI(index, "name", e.target.value)} 
                        error={input.codeError}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput 
                        placeholder="PI description..." 
                        value={input.description} 
                        onChange={(e) => handleChangePI(index, "description", e.target.value)} 
                        error={input.descriptionError}
                      />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDeletePI(index)}>
                        <IconX size={16} />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))
              }
            </Table.Tbody>
          </Table>
          <Group justify="flex-end" gap="xs" mt="md">
            <Button onClick={() => {
              close();
              handleCancel();
            }} variant="outline">
              Cancel
            </Button>
            <Button variant="filled" onClick={handleCreatePIs}>
              Create PIs
            </Button>
          </Group>
        </div>
      </Modal>
      <Button onClick={open} leftSection={<IoCreate size={20} />}>
        Create PIs
      </Button>
    </>
  );
};

export default CreatePIModal;
