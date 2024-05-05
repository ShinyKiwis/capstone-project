"use client";
import { PageHeader } from "@/app/_components";
import Program, { SO, Version } from "@/app/interfaces/Program.interface";
import formatDate from "@/app/lib/formatDate";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import { Text, Button, Stepper, Group, ScrollArea } from "@mantine/core";
import React, { useEffect, useState, createContext } from "react";
import AssessmentForm from "./(pages)/AssessmentForm";
import PIsConfiguration from "./(pages)/PIsConfiguration";
import axios from "axios";
import FinalReview from "./(pages)/FinalReview";
import { createFormContext, useForm } from "@mantine/form";
import { isNotEmpty, isEmail, isInRange, hasLength, matches } from '@mantine/form';
import { Criterion } from "@/app/interfaces/Criterion.interface";
import { toggleNotification } from "@/app/lib/notification";

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

export const SOsContext_createScheme = createContext<SO[]|null>(null);

export interface AssessmentFormSection {
  name: string;
  year: number;
  semester: string;
  description: string;
  criteriaCount: number;
  criteria: Criterion[]
}

export const [FormProvider1, useFormContext1, useForm1] = createFormContext<AssessmentFormSection>();

export interface SchemeConfigs {
  goal: number;
}

export const [FormProvider2, useFormContext2, useForm2] = createFormContext<SchemeConfigs>();

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
        console.log("Loaded SOs:",targetSOs);
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
        else{
          toggleNotification("Error", "Check unsatisfied fields", "danger")
        }
        break;
      case 1:
        // Validate PI configurations
        if (!form2.validate().hasErrors) {
          setActive(step);
        }
        else{
          toggleNotification("Error", "Check unsatisfied configurations", "danger")
        }
        break;
      case 2:
        // No validation needed
        setActive(step);
        break;
    }
  };

  // Forms
  const form1 = useForm1({
    initialValues: {
      name: "default name",
      year: 2008,
      semester: "1",
      description: "",
      criteriaCount: 0,
      criteria: []
    },

    validate: {
      name: isNotEmpty("Scheme name required"),
      year: (value) => {
        if (!value) return 'Year required'
        if (value < (new Date(version!.startDate)).getFullYear() ) return 'Year cannot be smaller than version start year';
        if (value > (new Date(version!.endDate)).getFullYear()) return 'Year cannot be larger than version end year';
        return null;
      },
      semester: (value) => (!value ? "Semester required" : null),
      criteria:{
        description: (value) => (value === "" ? "Criterion description required" : null),
        // associatedPI: (value) => (!value ? "A PI is required" : null),
        assessment: {
          score: isNotEmpty("Score is required"),
          maximumScore: isNotEmpty("Maximum score is required"),
          options: {
            description: isNotEmpty("Description required"),
            maxScore: isNotEmpty("Maximum score is required"),
            minScore: isNotEmpty("Minimum score is required"),
          }
        }
      }
    },
  });

  useEffect(() => { // for testing
    console.log("Form1:", form1.values)
  }, [form1]);

  const form2 = useForm2({
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
            <SOsContext_createScheme.Provider value={SOs}>
              <FormProvider1 form={form1}>
                <AssessmentForm />
              </FormProvider1>
            </SOsContext_createScheme.Provider>
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Configure PIs"
            allowStepSelect={active !== 1}
          >
            <FormProvider2 form={form2}>
              <PIsConfiguration form={form2} studentOutcomes={SOs} />
            </FormProvider2>
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
