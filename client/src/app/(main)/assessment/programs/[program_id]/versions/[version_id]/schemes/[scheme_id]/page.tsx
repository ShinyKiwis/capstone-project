"use client";
import { NavigationContext, PageHeader } from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button, ScrollArea, Text } from "@mantine/core";
import OverViewSection from "./(components)/OverviewSection";
import RecordsSection from "./(components)/RecordsSection";
import AttainmentsSection from "./(components)/AttainmentsSection";
import { Version } from "@/app/interfaces/Program.interface";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program from "@/app/interfaces/Program.interface";
import axios from "axios";
import { AssessSchemeDetail } from "@/app/interfaces/Assessment.interface";
import { useQuery } from "@tanstack/react-query";

const SchemeDetail = ({
  params,
}: {
  params: {
    id(id: any): any;
    program_id: string;
    version_id: string;
    scheme_id: string;
  };
}) => {
  const [openedSections, setOpenedSections] = useState<string[] | undefined>([
    "overview",
    "records",
    "attainments",
  ]);
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [fetchedScheme, setFetchedScheme] = useState<AssessSchemeDetail>();

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

  // Fetch schemes
  const { data: fetchedSchemes, isLoading: schemesIsLoading } = useQuery({
    queryFn: async () => {
      let queryURL = `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program?.id}/versions/${version?.id}/assessment-schemes/${params.scheme_id}`;
      let response = await (await axios.get(queryURL)).data;
      console.log("refetched scheme detail");
      setFetchedScheme(response);
      return response;
    },
    queryKey: ["schemeDetail"],
    enabled: true,
    staleTime: Infinity,
  });


  if (!fetchedScheme) return <div>Fetching scheme data...</div>;
  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <PageHeader pageTitle="Scheme Details" />
      {program && version ? (
        <NavigationContext program={program} version={version} />
      ) : null}

      <ScrollArea type="auto" scrollbarSize={8} className="flex min-w-0 flex-1">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Button
            ml={"auto"}
            px={0}
            py={0}
            td={"underline"}
            variant="transparent"
            onClick={() => {
              setOpenedSections(
                openedSections?.length && openedSections?.length > 0
                  ? []
                  : ["overview", "records", "attainments"],
              );
            }}
          >
            {openedSections?.length && openedSections?.length > 0
              ? "Collapse All"
              : "Expand All"}
          </Button>
          <Accordion
            radius="xs"
            multiple
            value={openedSections}
            onChange={setOpenedSections}
          >
            <Accordion.Item value="overview">
              <Accordion.Control style={{ borderBottom: "2px black solid" }}>
                <Text size="lg" fw={500}>
                  Overview
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <OverViewSection schemeObject={fetchedScheme} />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="records">
              <Accordion.Control style={{ borderBottom: "2px black solid" }}>
                <Text size="lg" fw={500}>
                  Assessment Records
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <RecordsSection schemeObject={fetchedScheme} />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="attainments">
              <Accordion.Control style={{ borderBottom: "2px black solid" }}>
                <div className="flex items-center gap-2">
                  <Text size="lg" fw={500}>
                    Attainments
                  </Text>
                  {/* <Text size="md" c="gray" fs="italic">
                    *Error records are omitted
                  </Text> */}
                </div>
              </Accordion.Control>
              <Accordion.Panel>
                <AttainmentsSection schemeObject={fetchedScheme} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SchemeDetail;
