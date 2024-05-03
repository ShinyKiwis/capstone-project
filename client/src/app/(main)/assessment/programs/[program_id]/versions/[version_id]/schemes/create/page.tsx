"use client";
import { PageHeader } from "@/app/_components";
import Program, { SO, Version } from "@/app/interfaces/Program.interface";
import formatDate from "@/app/lib/formatDate";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import { Text, Button, Stepper, Group, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AssessmentForm from "./(pages)/AssessmentForm";
import PIsConfiguration from "./(pages)/PIsConfiguration";
import axios from "axios";
import FinalReview from "./(pages)/FinalReview";
import { useForm } from "@mantine/form";
import { Criterion } from "@/app/interfaces/Criterion.interface";

const sampleScheme = {
  name: "Foundation Test 2012_3",
  description:
    "Foundation test for CS students conducted before internship. Expected exam date: May 15th, 2012",
  year: 2012,
  semester: 3,
  criteriaCount: 10,
  maximumScore: 50,
  type: "Individual",
};

export interface AssessmentFormSection {
  name: string;
  year: number;
  semester: string;
  description: string;
  criteriaCount: number;
  criteria: Criterion[]
}

export interface SchemeConfigs {
  goal: number;
}

const Page = ({
  params,
}: {
  params: {
    id(id: any): any;
    program_id: string;
    version_id: string;
  };
}) => {
  // Build context section
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [SOs, setSOs] = useState<SO[]>([]);

  const { buildBreadCrumbs } = useBreadCrumbs();
  const { getProgram } = useProgram();

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);

        let programDetailsURL = `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}`;
        const response = await axios.get(programDetailsURL);
        const targetSOs = response.data.studentOutcomes;
        console.log(targetSOs);
        setSOs(targetSOs.sort((a: SO, b: SO) => (a.name < b.name ? -1 : 1)));
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  // Stepper states & controllers
  const [active, setActive] = useState<number>(0); // current step
  const handleStepChange = (step: number) => {
    if (step < active) {
      setActive(step);
      return;
    }

    switch (
      active // Validate current step before changing step
    ) {
      case 0:
        // Validate assessment form
        console.log(form1.values);
        if (!form1.validate().hasErrors) {
          setActive(step);
        }
        break;
      case 1:
        // Validate PI configurations
        if (!form2.validate().hasErrors) {
          setActive(step);
        }
        break;
      case 2:
        // No validation needed
        setActive(step);
        break;
    }
  };

  // Forms
  const form1 = useForm<AssessmentFormSection>({
    initialValues: {
      name: "default name",
      year: 2008,
      semester: "1",
      description: "",
      criteriaCount: 0,
      criteria: []
    },

    validate: {
      name: (value) => (value === "" ? "Scheme name required" : null),
      year: (value) => {
        if (!value) return 'Year required'
        if (value < (new Date(version!.startDate)).getFullYear() ) return 'Year cannot be smaller than version start year';
        if (value > (new Date(version!.endDate)).getFullYear()) return 'Year cannot be larger than version end year';
        return null;
      },
      semester: (value) => (!value ? "Semester required" : null),
    },
  });

  const form2 = useForm<SchemeConfigs>({
    initialValues: {
      goal: 50,
    },

    validate: {
      goal: (value) => (value !== 50 ? null : "Invalid number"),
    },
  });

  // Main return
  return program && version ? (
    <div className="flex h-full flex-col">
      <PageHeader pageTitle="Create Assessment Scheme" />

      <div>
        {/* Contexts section */}
        <div className="flex gap-2">
          <Text size="md" fw={600}>
            Program:
          </Text>
          <Text size="md" fw={400}>
            {program.name}
          </Text>
        </div>
        <div className="flex gap-2">
          <Text size="md" fw={600}>
            Major:
          </Text>
          <Text size="md" fw={400}>
            {program.major}
          </Text>
        </div>
        <div className="flex gap-2">
          <Text size="md" fw={600}>
            Version:
          </Text>
          <Text size="md" fw={400}>
            {version?.name} ({formatDate(version.startDate.toString())} -{" "}
            {formatDate(version.endDate.toString())})
          </Text>
        </div>
      </div>

      <ScrollArea type="auto" offsetScrollbars scrollbarSize={8} mt={4}>
        <Stepper active={active} onStepClick={handleStepChange} size="sm">
          <Stepper.Step
            label="First step"
            description="Create assessment form"
            allowStepSelect={active !== 0}
          >
            <AssessmentForm form={form1} />
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Configure PIs"
            allowStepSelect={active !== 1}
          >
            <PIsConfiguration form={form2} studentOutcomes={SOs} />
          </Stepper.Step>
          <Stepper.Step
            label="Final step"
            description="Review scheme"
            allowStepSelect={active !== 2}
          >
            <FinalReview {...sampleScheme} />
          </Stepper.Step>
        </Stepper>

        <Group justify="end" mt="xl">
          <Button
            variant="default"
            onClick={() => handleStepChange(active > 0 ? active - 1 : active)}
          >
            Back
          </Button>
          {active === 2 ? (
            <Button onClick={() => {}}>Save Scheme</Button>
          ) : (
            <Button
              onClick={() => handleStepChange(active < 2 ? active + 1 : active)}
            >
              Next Step
            </Button>
          )}
        </Group>
      </ScrollArea>
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
