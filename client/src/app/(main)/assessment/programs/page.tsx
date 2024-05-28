"use client";
import { PageHeader } from "@/app/_components";
import Program from "@/app/interfaces/Program.interface";
import formatDate from "@/app/lib/formatDate";
import { useProgram } from "@/app/providers/ProgramProvider";
import {
  TextInput,
  Text,
  Accordion,
  Box,
  Group,
  ActionIcon,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { userHasResource } from "@/app/lib/userHasResource";
import useNavigate from "@/app/hooks/useNavigate";

const Assessment = () => {
  const { programs } = useProgram();
  const [loadedPrograms, setLoadedPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoadedPrograms(programs);
  }, [programs]);

  console.log(programs);

  if (!userHasResource("manage_assessments_schemes")){
    return navigate("/forbidden");
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <PageHeader pageTitle="Available Programs" />
      <div className="flex items-center">
        <Text>Select a program version to manage associated schemes</Text>
        <TextInput
          placeholder="Search programs..."
          className="ms-auto w-72"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          rightSection={
            <BiSearch
              size={20}
              className="group-focus-within:text-blue text-gray"
              onClick={(e) => {}}
            />
          }
        />
      </div>
      <div className="mt-4 h-full overflow-auto pb-4">
        <Accordion chevronPosition="right" variant="contained">
          {loadedPrograms.map((program) => (
            <Accordion.Item value={program.name} key={program.id}>
              <Accordion.Control>
                <div className="flex-col items-center gap-2"></div>
                <Text className="text-2xl" fw={700}>
                  {program.name}
                </Text>
                <div className="flex flex-col gap-1">
                  <div>
                    <strong>Major:</strong> {program.major}
                  </div>
                  <div>
                    <strong>Description:</strong> {program.description}
                  </div>
                </div>
              </Accordion.Control>
              <Accordion.Panel>
                <DataTable
                  withTableBorder
                  columns={[
                    {
                      accessor: "name",
                      title: "Version ID",
                      width: "10%",
                      render: (record) => {
                        return (
                          <Link
                            href={`/assessment/programs/${program.id}/versions/${record.id}/schemes`}
                            className="text-blue-600 underline hover:text-blue-900"
                          >
                            {record.name}
                          </Link>
                        );
                      },
                    },
                    {
                      accessor: "startDate",
                      title: "Start Date",
                      render: (record) => {
                        return <Text>{formatDate(record.startDate)}</Text>;
                      },
                    },
                    {
                      accessor: "endDate",
                      title: "End Date",
                      render: (record) => {
                        return <Text>{formatDate(record.endDate)}</Text>;
                      },
                    },
                    {
                      accessor: "description",
                      title: "Description",
                    },
                  ]}
                  records={program.versions}
                />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Assessment;
