import { SO } from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";
import { useProgram } from "@/app/providers/ProgramProvider";
import { ActionIcon, Button, Group, Modal, Table, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconX } from "@tabler/icons-react";
import axios from "axios";
import { setSourceMapsEnabled } from "process";
import React, { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react";
import { IoCreate } from "react-icons/io5";

interface SOModalPropTypes {
  programId: number;
  versionId: number;
  SOs: SO[];
  setSOs: Dispatch<SetStateAction<SO[]>>;
}

interface InitialSOType {
  id?: number
  name: string,
  description: string,
  codeError: string,
  descriptionError: string
}

const EditSOsModal = ({programId, versionId, SOs, setSOs} : SOModalPropTypes) => {
  console.log(SOs)
  const [opened, { open, close }] = useDisclosure(false);
  const [inputs, setInputs] = useState<InitialSOType[]>([]);
  console.log("INPUTS:", inputs)
  const [index, setIndex] = useState(-1)
  const [deleteIds, setDeleteIds] = useState<number[]>([])

  const handleUpdateSOs = () => {
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
    inputs.forEach(async input => {
      if(input.name !== "" && input.description != "") {
        length++;
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${input.id}`,
          {
            name: input.name,
            description: input.description
          },
        );
        setSOs(sos => sos.map(so => {
          if(so.id == response.data.id) {
            return response.data
          } else {
            return so
          }
        }))
      }
    })
    handleDeleteOperation();
    if(length > 0) {
      toggleNotification(
        `Update ${length} SOs successfully`,
        `Update ${length} SOs successfully.`,
        "success",
      );
    }
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
    if(inputs[index].id) {
      setDeleteIds(prevIds=> [...prevIds, inputs[index].id!])
    }
    setInputs(inputs.filter((_, idx) => idx != index))
  }

  const handleDeleteOperation = () => {
    deleteIds.forEach(async id => {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${id}`)
      setSOs(sos => sos.filter(so => so.id != id))
    })
    if(deleteIds.length > 0) {
      toggleNotification(
        `Delete ${deleteIds.length} SOs successfully`,
        `Delete ${deleteIds.length} SOs successfully.`,
        "success",
      );
    }
  }

  const handleCancel = () => {
    setInputs(SOs.map(existedSO => ({
      id: existedSO.id,
      name: existedSO.name,
      description: existedSO.description,
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
    setInputs(SOs.map(existedSO => ({
      id: existedSO.id,
      name: existedSO.name,
      description: existedSO.description,
      codeError: "",
      descriptionError: ""
    })))
  }, [SOs])

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
            Update SOs
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
                  <Table.Tr key={input.name}>
                    <Table.Td>
                      <TextInput 
                        placeholder="SO code..." 
                        value={input.name} 
                        onChange={(e) => handleChangeSO(index, "code", e.target.value)} 
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
            <Button 
              onClick={() => {
                close();
                handleCancel();
              }} 
              variant="outline" >
              Cancel
            </Button>
            <Button variant="filled" onClick={handleUpdateSOs}>
              Update SOs
            </Button>
          </Group>
        </div>
      </Modal>
      <Button onClick={open} leftSection={<IconEdit size={20} />} disabled={SOs.length === 0} ms="md">
        Update selected SOs
      </Button>
    </>
  );
};

export default EditSOsModal;
