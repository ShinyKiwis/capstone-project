"use client";
import {
  NavigationContext,
  PageHeader,
  ProjectSelector,
  StudentProfileSelector,
} from "@/app/_components";
import React, { useEffect, useState } from "react";
import { Accordion, Button, ScrollArea, Table, Text } from "@mantine/core";
import { Version } from "@/app/interfaces/Program.interface";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import Program from "@/app/interfaces/Program.interface";
import CriterionInput from "../(components)/CriteriaInput";
import { CriterionType } from "@/app/interfaces/Criterion.interface";
import { DataTable } from "mantine-datatable";
import { unary } from "lodash";
import { AiOutlineDelete } from "react-icons/ai";

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
  const criterionColumns = fetchedScheme
    ? Array.from(
        { length: fetchedScheme.criteriaCount },
        (_, index) => index + 1,
      )
    : []; // create array of numbers from 1 to criteria count
  const [newRecords, setNewRecords] = useState<any[]>([
    { student: -1, project: -1 },
    { student: -1, project: -1 },
    { student: -1, project: -1 },
    { student: -1, project: -1 },
  ]);
  const [selectedStudent, setselectedStudent] = useState([]);
  const [selectedProject, setselectedProject] = useState("");

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
      criteriaCount: 30,
      maxScore: 50,
      lastModified: "12/12/2013",
      criteria: [
        { type: "multilevel" },
        { type: "multiplechoice" },
        { type: "written" },
        { type: "multilevel" },
        { type: "multiplechoice" },
        { type: "written" },
        { type: "multilevel" },
        { type: "multiplechoice" },
        { type: "written" },
        { type: "multilevel" },
        { type: "multiplechoice" },
        { type: "written" },
      ],
    });
  }, []);

  if (!fetchedScheme) return <div>Fetching scheme data...</div>;
  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <PageHeader pageTitle="Input Records" />
      {program && version ? (
        <NavigationContext
          program={program}
          version={version}
          schemeName={fetchedScheme.name}
        />
      ) : null}

      <DataTable
        withTableBorder
        withColumnBorders
        pinLastColumn
        my={"2em"}
        h={'fit-content'}
        records={newRecords}
        columns={[
          {
            accessor: "#",
            title: "Student",
            width: 200,
            render: (record) => (
              <StudentProfileSelector
                onChange={setselectedStudent}
                value={selectedStudent}
                placeholder="Search student name, id"
                searchApi="http://localhost:3500/users/students"
                limit={7}
                mode="single"
                showCard={false}
              />
            ),
          },
          {
            accessor: "#",
            title: "Project",
            render: (record) => (
              <ProjectSelector
                onChange={setselectedProject}
                value={selectedProject}
                showCard={false}
              />
            ),
            width: 220,
          },
          ...fetchedScheme.criteria.map(
            (criterion: { type: CriterionType }, index: number) => {
              return {
                accessor: "#",
                title: index + 1,
                with: 'fit-content',
                render: (record: any) => {
                  return (
                    <CriterionInput
                      type={criterion.type}
                      variant="minimal"
                      criterionObject={criterion}
                    />
                  );
                },
              };
            },
          ),
          {
            accessor: "#",
            title: "Action",
            textAlign:'center',
            render: (record: any) => (
              <Button variant="transparent" c={"red"} px={0} py={0} m={0}>
                <AiOutlineDelete size={25} />
              </Button>
            ),
          },
        ]}
      />

      <div className="mr-3 flex w-full justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button>Add records</Button>
      </div>
    </div>
  );
};

export default RecordInput;
