import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Text,
  Radio,
  Stack,
  MultiSelect,
  NumberInput,
  Group,
} from "@mantine/core";
import { PiSliders } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";
import { getBranchOptions } from "@/app/lib/getBranchOptions";
import { useGeneralData } from "@/app/providers/GeneralDataProvider";
import ProfileSelector from "../UserAction/ProfileSelector";
import { useProjects } from "@/app/providers/ProjectProvider";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { isStudent } from "@/app/lib/isStudent";

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
  const { handleSearchProjects } = useProjects();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const [projectType, setProjectType] = useState("all");
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [membersNo, setMembersNo] = useState(1);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);

  useEffect(() => {
    // Reset filter when change page
    setProjectType("all");
    setSelectedPrograms([]);
    setSelectedBranches([]);
    setMembersNo(0);
    setSelectedInstructors([]);
  }, [searchParams.get("project")]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        yOffset="10vh"
        title={
          <Text size="lg" c="blue" fw={600} mx={'0.5rem'}>
            Filter
          </Text>
        }
      >
        <div className="mx-2">
          {isStudent(user) ? null : (
            <>
              <Text size="md" fw={600} className="mb-2">
                Project type
              </Text>
              <Radio.Group value={projectType} onChange={setProjectType} mb="sm">
                <Stack gap="sm">
                  <Radio value="personal" label="Your projects" />
                  <Radio value="all" label="All projects of your faculty" />
                </Stack>
              </Radio.Group>
            </>
          )}
          <MultiSelect
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
            <div className="flex gap-4 items-center">
              <NumberInput
                min={0}
                max={999}
                clampBehavior="strict"
                className="w-[15%]"
                value={membersNo}
                onChange={(value) =>
                  setMembersNo(
                    typeof value === "string" ? parseInt(value) || 0 : value,
                  )
                }
              />
              <span className="italic text-gray-400 text-xs">Set to 0 to filter projects with any members count</span>
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
                let filterQuery = `${
                  projectType !== "all" ? `owner=${user?.id}` : ""
                }${membersNo ? `&members=${membersNo == 0 ? '' : membersNo}` : ""}${branchParams}${programParams}${instructorParams}`;
                console.log(`Filter Query:`, filterQuery);
                handleSearchProjects(
                  filterQuery,
                  searchParams.get("project") || "",
                );
                close();
              }}
            >
              Filter
            </Button>
          </Group>
        </div>
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
