import { SO } from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";
import { useProgram } from "@/app/providers/ProgramProvider";
import { ActionIcon, Button, Group, Modal, Table, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { setSourceMapsEnabled } from "process";
import React, { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { IoCreate } from "react-icons/io5";

interface SOModalPropTypes {
  programId: number;
  versionId: number;
  setSOs: Dispatch<SetStateAction<SO[]>>;
}

interface InitialSOType {
  name: string,
  description: string,
  codeError: string,
  descriptionError: string
}

const CreateSOModal = ({programId, versionId, setSOs} : SOModalPropTypes) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [inputs, setInputs] = useState<InitialSOType[]>([{
    name: "",
    description: "",
    codeError: "",
    descriptionError: ""
  }]);
  const [index, setIndex] = useState(-1)

  const handleCreateSOs = async () => {
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
            `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes`,
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
    setSOs((sos) => [...sos, ...successfulResponses.map((response) => response!.data)]);

    handleCancel();
    toggleNotification(
      `Create ${inputs.length - 1} SOs successfully`,
      `Create ${inputs.length - 1} SOs successfully.`,
      "success",
    );
    close();
  };

  const handleChangeSO = (index: number, key: string, value: string) => {
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

  const handleDeleteSO = (index: number) => {
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
                inputs.map((input, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>
                      <TextInput 
                        placeholder="SO name..." 
                        value={input.name} 
                        onChange={(e) => handleChangeSO(index, "name", e.target.value)} 
                        error={input.codeError}
                      />
                    </Table.Td>
                    <Table.Td>
                      <TextInput 
                        placeholder="SO description..." 
                        value={input.description} 
                        onChange={(e) => handleChangeSO(index, "description", e.target.value)} 
                        error={input.descriptionError}
                      />
                    </Table.Td>
                    <Table.Td>
                      <ActionIcon size="sm" variant="subtle" color="red" onClick={() => handleDeleteSO(index)}>
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
            <Button variant="filled" onClick={handleCreateSOs}>
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
