"use client"
import { useProgram } from "@/app/providers/ProgramProvider";
import {
  Button,
  Group,
  Modal,
  MultiSelect,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import React, { useReducer, useState } from "react";
import { IoCreate } from "react-icons/io5";
import { IoMdCalendar } from "react-icons/io";
import Program from "@/app/interfaces/Program.interface";
import { toggleNotification } from "@/app/lib/notification";

interface errorState {
  versionIdError: string;
  startsAtError: string;
  endsAtError: string;
  descriptionError: string;
  dateError: string;
  branchesError: string;
}

interface errorAction {
  type:
    | "set_version_id_error"
    | "set_starts_at_error"
    | "set_ends_at_error"
    | "set_branches_error"
    | "set_date_error"
    | "set_description_error";
}

const reducer = (state: errorState, action: errorAction) => {
  switch (action.type) {
    case "set_version_id_error": {
      return {
        ...state,
        versionIdError: "Version ID is required",
      };
    }
    case "set_starts_at_error": {
      return {
        ...state,
        startsAtError: "Effective period start date is required",
      };
    }
    case "set_ends_at_error": {
      return {
        ...state,
        endsAtError: "Effective period end date is required",
      };
    }
    case "set_description_error": {
      return {
        ...state,
        descriptionError: "Description is required",
      };
    }
    case "set_branches_error": {
      return {
        ...state,
        branchesError: "Branches are required",
      };
    }
    case "set_date_error": {
      return {
        ...state,
        dateError: "Start date must be before end date",
      };
    }
  }
};

interface CreateProgramVersionModalPropsTypes {
  programId: number;
  program: Program;
  setProgram: React.Dispatch<React.SetStateAction<Program | null>>;
}

const CreateProgramVersionModal = ({
  programId,
  program,
  setProgram,
}: CreateProgramVersionModalPropsTypes) => {
  const [errors, dispatch] = useReducer(reducer, {
    versionIdError: "",
    startsAtError: "",
    endsAtError: "",
    descriptionError: "",
    dateError: "",
    branchesError: "",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [versionId, setVersionId] = useState("");
  const [startsAt, setStartsAt] = useState<Date | null>(null);
  const [endsAt, setEndsAt] = useState<Date | null>(null);
  const [branches, setBranches] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const { programs, setPrograms } = useProgram();

  const handleCreateProgramVersion = async () => {
    if (versionId === "") {
      dispatch({ type: "set_version_id_error" });
    }
    if (startsAt === null) {
      dispatch({ type: "set_starts_at_error" });
    }
    if (endsAt === null) {
      dispatch({ type: "set_ends_at_error" });
    }
    if (description === "") {
      dispatch({ type: "set_description_error" });
    }
    if (startsAt !== null && endsAt !== null && startsAt > endsAt) {
      dispatch({ type: "set_date_error" });
      return;
    }
    if (branches.length === 0) {
      dispatch({ type: "set_branches_error" });
    }
    if (
      versionId === "" ||
      startsAt === null ||
      endsAt === null ||
      description === ""
    ) {
      return;
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions`,
      {
        name: versionId,
        startDate: startsAt,
        endDate: endsAt,
        description: description,
      },
    );
    setProgram({ ...program, versions: [...program.versions, response.data] });
    setPrograms(
      programs.map((p) =>
        p.id === programId
          ? { ...p, versions: [...p.versions, response.data] }
          : p,
      ),
    );
    toggleNotification(
      `Create program version "${versionId}" of program "${program.name}"  successfully`,
      `Create program version "${versionId}" of program "${program.name}" successfully.`,
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
            Create a new program version
          </Text>
        }
      >
        <div className="px-4">
          <Text size="md" fw={600} className="mb-2">
            Version ID
          </Text>
          <TextInput
            autoFocus
            value={versionId}
            onChange={(event) => setVersionId(event.currentTarget.value)}
            error={errors.versionIdError}
            placeholder="Version ID"
          />
          <Text size="md" fw={600} className="my-2">
            Effective period
          </Text>
          <div className="flex items-center gap-8">
            <DateInput
              clearable
              placeholder="Start date"
              onChange={setStartsAt}
              leftSection={<IoMdCalendar size={20} />}
              error={errors.startsAtError || errors.dateError}
            />
            <DateInput
              clearable
              placeholder="End date"
              onChange={setEndsAt}
              leftSection={<IoMdCalendar size={20} />}
              error={errors.endsAtError || errors.dateError}
            />
          </div>
          {/* <Text size="md" fw={600} className="my-2">
            Branches
          </Text>
          <MultiSelect
            data={["High Quality", "General Program"]}
            value={branches}
            onChange={setBranches}
            error={errors.branchesError}
          /> */}
          <Text size="md" fw={600} className="my-2">
            Description
          </Text>
          <Textarea
            autosize
            value={description}
            minRows={4}
            maxRows={6}
            onChange={(event) => {
              setDescription(event.currentTarget.value);
            }}
            error={errors.descriptionError}
            placeholder="Description"
          />
          <Group justify="flex-end" gap="xs" mt="md">
            <Button onClick={close} variant="outline">
              Cancel
            </Button>
            <Button variant="filled" onClick={handleCreateProgramVersion}>
              Create program version
            </Button>
          </Group>
        </div>
      </Modal>
      <Button onClick={open} leftSection={<IoCreate size={20} />}>
        Create program version
      </Button>
    </>
  );
};

export default CreateProgramVersionModal;
