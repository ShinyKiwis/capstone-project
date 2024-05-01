"use client";
import { PageHeader } from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button } from "@mantine/core";
import OverViewSection from "./OverviewSection";
import RecordsSection from "./RecordsSection";
import AttainmentsSection from "./AttainmentsSection";

const SchemeDetail = ({ params }: { params: { scheme_id: string } }) => {
  const [openedSections, setOpenedSections] = useState<string[] | undefined>(
    [],
  );

  return (
    <div className="flex h-full flex-col">
      <PageHeader pageTitle="Create Assessment Scheme" />
      <div className="flex flex-1 flex-col overflow-hidden">
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
              Overview
            </Accordion.Control>
            <Accordion.Panel>
              schemeID: {params.scheme_id}
              <OverViewSection />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="records">
            <Accordion.Control style={{ borderBottom: "2px black solid" }}>
              Assessment Records
            </Accordion.Control>
            <Accordion.Panel><RecordsSection /></Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="attainments">
            <Accordion.Control style={{ borderBottom: "2px black solid" }}>
              PI Achievements
            </Accordion.Control>
            <Accordion.Panel><AttainmentsSection /></Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default SchemeDetail;
