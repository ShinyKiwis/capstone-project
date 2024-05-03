"use client";
import { PageHeader } from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button, ScrollArea, Text } from "@mantine/core";
import OverViewSection from "./OverviewSection";
import RecordsSection from "./RecordsSection";
import AttainmentsSection from "./AttainmentsSection";

const SchemeDetail = ({ params }: { params: { scheme_id: string } }) => {
  const [openedSections, setOpenedSections] = useState<string[] | undefined>(["overview", "records", "attainments"]);
  const [fetchedScheme, setFetchedScheme] = useState<any>();

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
                schemeID: {params.scheme_id}
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
                <div className="flex gap-2 items-center">
                  <Text size="lg" fw={500}>
                    PI Attainments
                  </Text>
                  <Text size="md" c="gray" fs="italic">
                    *Error records are omitted
                  </Text>
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
