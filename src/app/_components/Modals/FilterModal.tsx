import { useState } from "react";
import {
  Modal,
  Button,
  Text,
  Radio,
  Stack,
  MultiSelect,
  Badge,
  CloseButton,
  Input,
  NumberInput,
  Group,
} from "@mantine/core";
import { PiSliders } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";

const FilterModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [projectType, setProjectType] = useState("all");
  const [programs, setPrograms] = useState<string[]>([
    "Computer Science",
    "Computer Engineering",
  ]);
  const [branches, setBranches] = useState<string[]>([
    "High quality",
    "Standard program",
  ]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);

  const handleSelectPrograms = (values: string[]) => {
    setPrograms(programs.filter((program) => program != values[0]));
    setSelectedPrograms([...selectedPrograms, values[0]]);
  };

  const handleUnselectProgram = (value: string) => {
    setPrograms([...programs, value]);
    setSelectedPrograms(
      selectedPrograms.filter((program) => program !== value),
    );
  };

  const handleSelectBranches = (values: string[]) => {
    setBranches(branches.filter((branch) => branch != values[0]));
    setSelectedBranches([...selectedBranches, values[0]]);
  };

  const handleUnselectBranch = (value: string) => {
    setBranches([...branches, value]);
    setSelectedBranches(selectedBranches.filter((branch) => branch !== value));
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        yOffset="18vh"
        title={
          <Text size="lg" c="blue" fw={600}>
            Filter
          </Text>
        }
      >
        <Text size="md" fw={600} className="mb-2">
          Project type
        </Text>
        <Radio.Group value={projectType} onChange={setProjectType} mb="sm">
          <Stack gap="sm">
            <Radio value="personal" label="Your projects" />
            <Radio value="all" label="All projects of your faculty" />
          </Stack>
        </Radio.Group>
        <Text size="md" fw={600} className="mb-2">
          Program
        </Text>
        <MultiSelect
          placeholder="Select programs"
          value={[]}
          onChange={handleSelectPrograms}
          data={programs}
          searchable
        />
        <div className="mt-2 flex w-1/2 flex-col gap-2">
          {selectedPrograms.map((selectedProgram) => (
            <Badge
              variant="light"
              radius="sm"
              rightSection={
                <CloseButton
                  size={20}
                  variant="transparent"
                  c="blue"
                  onClick={() => handleUnselectProgram(selectedProgram)}
                />
              }
              fullWidth
              size="lg"
              className="flex justify-between normal-case"
            >
              {selectedProgram}
            </Badge>
          ))}
        </div>
        <Text size="md" fw={600} className="my-2">
          Branch
        </Text>
        <MultiSelect
          placeholder="Select branches"
          value={[]}
          onChange={handleSelectBranches}
          data={branches}
          searchable
        />
        <div className="mt-2 flex w-1/2 flex-col gap-2">
          {selectedBranches.map((selectedBranch) => (
            <Badge
              variant="light"
              radius="sm"
              rightSection={
                <CloseButton
                  size={20}
                  variant="transparent"
                  c="blue"
                  onClick={() => handleUnselectBranch(selectedBranch)}
                />
              }
              fullWidth
              size="lg"
              className="flex justify-between normal-case"
            >
              {selectedBranch}
            </Badge>
          ))}
        </div>
        <div className="my-2 flex items-center gap-4">
          <Text size="md" fw={600}>
            Number of members
          </Text>
          <div className="w-[12%]">
            <NumberInput
              placeholder="1"
              min={1}
              max={999}
              clampBehavior="strict"
              hideControls
            />
          </div>
        </div>
        <Text size="md" fw={600}>
          Instructors
        </Text>
        <Group justify="flex-end" gap="xs">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={() => {
              close();
            }}
          >
            Filter
          </Button>
        </Group>
      </Modal>
      <Button
        leftSection={<PiSliders size={20} />}
        variant="outline"
        className="ms-auto"
        onClick={open}
      >
        Filter
      </Button>
    </>
  );
};

export default FilterModal;
