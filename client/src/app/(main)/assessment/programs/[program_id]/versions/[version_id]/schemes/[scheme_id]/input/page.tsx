"use client";
import { NavigationContext, PageHeader } from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button, ScrollArea, Text } from "@mantine/core";
import { Version } from "@/app/interfaces/Program.interface";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program from "@/app/interfaces/Program.interface";

const RecordInput = ({
  params,
}: {
  params: {
    id(id: any): any;
    program_id: string;
    version_id: string;
    scheme_id: string;
  };
}) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [fetchedScheme, setFetchedScheme] = useState<any>();

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
      <PageHeader pageTitle="Scheme Details" />
      {program && version ? (
        <NavigationContext program={program} version={version} schemeName={fetchedScheme.name} />
      ) : null}

      <ScrollArea type="auto" scrollbarSize={8} className="flex min-w-0 flex-1">
        input section
      </ScrollArea>
    </div>
  );
};

export default RecordInput;
