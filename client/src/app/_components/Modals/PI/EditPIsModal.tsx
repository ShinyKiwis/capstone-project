import { PI } from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";
import { useProgram } from "@/app/providers/ProgramProvider";
import { ActionIcon, Button, Group, Modal, Table, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconX } from "@tabler/icons-react";
import axios from "axios";
import { setSourceMapsEnabled } from "process";
import React, { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { IoCreate } from "react-icons/io5";

interface PIModalPropTypes {
  programId: number;
  versionId: number;
  soId: string;
  PIs: PI[];
  setPIs: Dispatch<SetStateAction<PI[]>>;
}

interface InitialPIType {
  id?: number
  name: string,
  description: string,
  codeError: string,
  descriptionError: string
}

const EditPIsModal = ({programId, versionId, soId, PIs, setPIs} : PIModalPropTypes) => {
  console.log(PIs)
  const [opened, { open, close }] = useDisclosure(false);
  const [inputs, setInputs] = useState<InitialPIType[]>([]);
  console.log("INPUTS:", inputs)
  const [index, setIndex] = useState(-1)
  const [deleteIds, setDeleteIds] = useState<number[]>([])

  const handleUpdatePIs = async () => {
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
    console.log(inputs)
    let length = 0;
    const newPIs = inputs.filter(input => !input.id && input.name !== "" && input.description != "")
    inputs.filter(input => input.id).forEach(async input => {
      if(input.id && input.name !== "" && input.description != "") {
        length++;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${soId}/performance-indicators/${input.id}`,
          {
            name: input.name,
            description: input.description
          },
        );
        setPIs(sos => sos.map(so => {
          if(so.id == response.data.id) {
            return response.data
          } else {
            return so
          }
        }))
      }
    })

    let newPIsLength = newPIs.length;
    const responses = await Promise.all(
      newPIs.map((input) => {
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
    setPIs((sos) => [...sos, ...successfulResponses.map((response) => response!.data)]);

    handleDeleteOperation();
    if(length > 0) {
      toggleNotification(
        `Update ${length} PIs successfully`,
        `Update ${length} PIs successfully.`,
        "success",
      );
    }
    if(newPIsLength > 0) {
      toggleNotification(
        `Create ${length} PIs successfully`,
        `Create ${length} PIs successfully.`,
        "success",
      );
    }
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
    if(inputs[index].id) {
      setDeleteIds(prevIds=> [...prevIds, inputs[index].id!])
    }
    setInputs(inputs.filter((_, idx) => idx != index))
  }

  const handleDeleteOperation = () => {
    deleteIds.forEach(async id => {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${id}`)
      setPIs(sos => sos.filter(so => so.id != id))
    })
    if(deleteIds.length > 0) {
      toggleNotification(
        `Delete ${deleteIds.length} PIs successfully`,
        `Delete ${deleteIds.length} PIs successfully.`,
        "success",
      );
    }
  }

  const handleCancel = () => {
    setInputs(PIs.map(existedPI => ({
      id: existedPI.id,
      name: existedPI.name,
      description: existedPI.description,
      codeError: "",
      descriptionError: ""
    })))
  }
 
  useEffect(() => {
    // New Input
    if(inputs.length > 0 && index == inputs.length - 1 && inputs[index].name !== "" && inputs[index].description !== "") {
      setInputs([...inputs, {
        name: "",
        description: "",
        codeError: "",
        descriptionError: ""
      }])
    }
  }, [inputs])

  useEffect(() => {
    setInputs(PIs.map(existedPI => ({
      id: existedPI.id,
      name: existedPI.name,
      description: existedPI.description,
      codeError: "",
      descriptionError: ""
    })))
  }, [PIs])

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
            Update PIs
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
                        placeholder="PI code..." 
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
            <Button 
              onClick={() => {
                close();
                handleCancel();
              }} 
              variant="outline" >
              Cancel
            </Button>
            <Button variant="filled" onClick={handleUpdatePIs}>
              Update PIs
            </Button>
          </Group>
        </div>
      </Modal>
      <Button onClick={open} leftSection={<IconEdit size={20} />} disabled={PIs.length === 0}>
        Update selected PIs
      </Button>
    </>
  );
};

export default EditPIsModal;
