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
import { getBranchOptions } from "@/app/(main)/project/ProjCEComponents";
import { useGeneralData } from "@/app/providers/GeneralDataProvider";
import ProfileSelector from "../ProfileSelector";
import axios from "axios";
import { useProjects } from "@/app/providers/ProjectProvider";

const FilterModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const generalDataValues = useGeneralData();
  const { supervisorOpts, programBranches } = generalDataValues;
  const programOptions = programBranches.map((progbranch) => {
    return {
      label: progbranch.name,
      value: progbranch.id.toString(),
    };
  });
  const projectContextValues = useProjects();
  const {setProjects, setViewing} = projectContextValues;

  const [projectType, setProjectType] = useState("all");
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [membersNo, setMembersNo] = useState(1);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);

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

        <MultiSelect
          my="1rem"
          label="Program"
          placeholder="Select program(s)"
          data={programOptions}
          value={selectedPrograms}
          onChange={(val) => {
            setSelectedPrograms(val);
            setSelectedBranches([]);
          }}
        />
        <MultiSelect
          my="1rem"
          label="Branch"
          placeholder={
            selectedPrograms.length < 1
              ? "Select program(s) first"
              : "Select available branches"
          }
          data={getBranchOptions(selectedPrograms, programBranches)}
          value={selectedBranches}
          onChange={(value) => setSelectedBranches(value)}
        />

        <div className="my-4">
          <Text size="sm" fw={600}>
            Number of members
          </Text>
          <div className="w-[12%]">
            <NumberInput
              min={1}
              max={999}
              clampBehavior="strict"
              hideControls
              value={membersNo}
              onChange={(value) =>
                setMembersNo(
                  typeof value === "string" ? parseInt(value) || 0 : value,
                )
              }
            />
          </div>
        </div>

        <div className="my-4">
          <Text size="sm" fw={600}>
            Instructors
          </Text>
          <ProfileSelector
            onChange={(value) => setSelectedInstructors(value)}
            value={selectedInstructors}
            optionsData={supervisorOpts}
            placeholder="Search instructor name, id"
          />
        </div>

        <Group justify="flex-end" gap="xs" mt="1em">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={async () => {
              let isStudent = false;
              let programParams = selectedPrograms
                .map((selectedProgram) => `&majors=${selectedProgram}`)
                .join("");
              let branchParams = selectedBranches
                .map((selectedBranch) => `&branches=${selectedBranch}`)
                .join("");
              let instructorParams = selectedInstructors
                .map(
                  (selectedInstructor) => `&supervisors=${selectedInstructor}`,
                )
                .join("");
              let filterQuery = `http://localhost:3500/projects?${
                projectType !== "all" ? `owner=${3}` : ""
              }${membersNo ? `&members=${membersNo}` : ""}${
                isStudent ? "" : branchParams
              }${programParams}${instructorParams}`;

              console.log(`Filter Query:`, filterQuery);
              
              await axios.get(filterQuery).then(
                (response) => {
                  const data = response.data as { projects: Project[] };
                  // console.log("Filtered result:", data.projects)
                  setProjects(data.projects);
                  setViewing(data.projects[0]);
                },
                (error) => {
                  console.log(error);
                },
              );
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
