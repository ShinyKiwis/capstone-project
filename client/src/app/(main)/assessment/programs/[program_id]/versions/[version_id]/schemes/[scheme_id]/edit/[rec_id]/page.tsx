"use client";
import {
  NavigationContext,
  PageHeader,
  ProjectSelector,
  StudentProfileSelector,
} from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button, NavLink, ScrollArea, Text } from "@mantine/core";
import { Version } from "@/app/interfaces/Program.interface";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program from "@/app/interfaces/Program.interface";
import {
  IconChevronRight,
  IconChevronCompactRight,
  IconChevronLeft,
} from "@tabler/icons-react";

const RecordEdit = ({
  params,
}: {
  params: {
    id(id: any): any;
    program_id: string;
    version_id: string;
    scheme_id: string;
    rec_id: string;
  };
}) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [fetchedScheme, setFetchedScheme] = useState<any>();
  const [selectedStudent, setselectedStudent] = useState<string[]>([]);
  const [selectedProject, setselectedProject] = useState('');

  const { buildBreadCrumbs } = useBreadCrumbs();
  const { getProgram } = useProgram();

  useEffect(() => {
    // Fetch current program to set context
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  useEffect(() => {
    // Retreive scheme data
    setFetchedScheme({
      name: "Foundation test - Sem2",
      description:
        "Used for assessing student in foundation test semester 2 - year 2014",
      assessTime: { year: 2014, no: 2 },
      criteriaCount: 20,
      maxScore: 50,
      lastModified: "12/12/2013",
    });
  }, []);

  if (!fetchedScheme) return <div>Fetching scheme data...</div>;
  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <PageHeader pageTitle="Edit Assessment Record" />
      {program && version ? (
        <NavigationContext
          program={program}
          version={version}
          schemeName={fetchedScheme.name}
        />
      ) : null}

      <div className="flex justify-between">
        <NavLink
          href={`${parseInt(params.rec_id) - 1}`}
          label="Previous Record"
          td={"underline"}
          c={"blue"}
          leftSection={
            <IconChevronLeft
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
        <NavLink
          href={`/assessment/programs/${params.program_id}/versions/${params.version_id}/schemes/${params.scheme_id}`}
          label="Back to scheme details"
          td={"underline"}
          c={"blue"}
          ta={"center"}
        />
        <NavLink
          href={`${parseInt(params.rec_id) + 1}`}
          label="Next Record"
          td={"underline"}
          c={"blue"}
          ta={"right"}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
      </div>

      <ScrollArea type="auto" scrollbarSize={8} className="flex min-w-0 flex-1">
        <div className="flex items-start">
          <div className="w-1/2 pr-3 py-2">
            <Text size="lg" fw={600}>
              Student
            </Text>
            <StudentProfileSelector
              // onChange={form.getInputProps("students").onChange}
              // value={form.getInputProps("students").value}
              // error={form.getInputProps("students").error}
              onChange={setselectedStudent}
              value={selectedStudent}
              placeholder="Search student name, id"
              searchApi="http://localhost:3500/users/students"
              limit={7}
              mode="single"
            />
          </div>
          <div className="w-1/2 pr-3 py-2">
            <Text size="lg" fw={600}>
              Project
            </Text>
            <ProjectSelector 
              onChange={setselectedProject}
              value={selectedProject}
              placeholder="Search project name, id, description"
              showCard
            />
          </div>
        </div>
        <Text size="lg" fw={600}>
          Criteria
        </Text>
        <div></div>
      </ScrollArea>
    </div>
  );
};

export default RecordEdit;
