"use client";
import { PageHeader } from "@/app/_components";
import Program, { SO, Version } from "@/app/interfaces/Program.interface";
import formatDate from "@/app/lib/formatDate";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import { Text, Button, Stepper, Group } from "@mantine/core";
import React, { useEffect, useState } from "react";
import AssessmentForm from "./(pages)/AssessmentForm";
import PIsConfiguration from "./(pages)/PIsConfiguration";
import axios from "axios";
import FinalReview from "./(pages)/FinalReview";

const sampleScheme = {
  name: "Foundation Test 2012_3",
  description: "Foundation test for CS students conducted before internship. Expected exam date: May 15th, 2012",
  year: 2012,
  semester: 3,
  criteriaCount: 10,
  maximumScore: 50,
  type: "Individual"
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
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [SOs, setSOs] = useState<SO[]>([]);
  const [active, setActive] = useState<number>(1);
  const nextStep = () =>
    setActive((current: number) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current: number) => (current > 0 ? current - 1 : current));
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
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}`,
        );
        const targetSOs = response.data.studentOutcomes;
        console.log(targetSOs);
        setSOs(targetSOs);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  useEffect(() => {
    setSOs(
      SOs.sort((a: SO, b: SO) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    );
  }, [SOs]);

  return program && version ? (
    <div className="flex h-full flex-col gap-3">
      <PageHeader pageTitle="Create Assessment Scheme" />
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
      <div className="">
        <Stepper
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          <Stepper.Step
            label="First step"
            description="Create an assessment form"
          >
            <AssessmentForm />
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Configure Performance Indicators"
          >
            <PIsConfiguration studentOutcomes={SOs} />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Review final scheme">
            <FinalReview {...sampleScheme}/>
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </div>
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
