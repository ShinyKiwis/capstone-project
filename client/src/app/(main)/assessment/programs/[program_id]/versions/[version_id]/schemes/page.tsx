"use client";
import { PageHeader, UploadFileModal } from "@/app/_components";
import Program, { Version } from "@/app/interfaces/Program.interface";
import { useProgram } from "@/app/providers/ProgramProvider";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput } from "@mantine/core";
import formatDate from "@/app/lib/formatDate";
import { BiSearch } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import Link from "next/link";

const Page = ({
  params,
}: {
  params: { program_id: string; version_id: string };
}) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fileUploaded, setFileUploaded] = useState(false);
  // const {buildBreadCrumbs} = useBreadCrumbs();
  const { getProgram } = useProgram();
  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.program_id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        // buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });
  return program && version ? (
    <div className="flex h-full flex-col gap-3">
      <PageHeader pageTitle="Assessment Schemes" />
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
      <div className="mt-2 flex">
        <Button
          variant="filled"
          leftSection={<IoCreate size={20} />}
          component={Link}
          href={`/assessment/programs/${program.id}/versions/${version.id}/schemes/create`}
        >
          Create scheme
        </Button>
        <UploadFileModal
          object="program versions"
          setFileUploaded={setFileUploaded}
        />
        <TextInput
          placeholder="Search program version..."
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
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
