"use client";
import Program, { PI, SO, Version } from "@/app/interfaces/Program.interface";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { useProgram } from "@/app/providers/ProgramProvider";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import formatDate from "@/app/lib/formatDate";
import CreatePIModal from "@/app/_components/Modals/PI/CreatePIModal";
import {
  NavigationContext,
  PageHeader,
  UploadFileModal,
} from "@/app/_components";
import { DataTable } from "mantine-datatable";
import { IconTrash } from "@tabler/icons-react";
import EditPIModal from "@/app/_components/Modals/PI/EditPIModal";
import DeleteModal from "@/app/_components/Modals/DeleteModal";
import EditPIsModal from "@/app/_components/Modals/PI/EditPIsModal";
import DeletePIsModal from "@/app/_components/Modals/PI/DeletePIsModal";

const Page = ({
  params,
}: {
  params: { id: string; version_id: string; so_id: string };
}) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version, setVersion] = useState<Version | null>(null);
  const [SO, setSO] = useState<SO | null>(null);
  const [PIs, setPIs] = useState<PI[]>([]);
  const [selectedRecords, setSelectedRecords] = useState<PI[]>([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  const { buildBreadCrumbs } = useBreadCrumbs();
  const { getProgram } = useProgram();

  const handleDeletePI = (PI: PI) => {
    setPIs(PIs.filter((existedPI) => existedPI.id !== PI.id));
  };

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(
          (existedVersion) => existedVersion.id == parseInt(params.version_id),
        )[0];
        setProgram(targetProgram);
        setVersion(targetVersion);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}/student-outcomes/${params.so_id}`,
        );
        setSO(response.data);
        buildBreadCrumbs(targetProgram, targetVersion, response.data);
        setPIs(response.data.performanceIndicators);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });

  useEffect(() => {
    const refetchPIs = async () => {
      // refetch SOs after import
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.id}/versions/${params.version_id}/student-outcomes/${params.so_id}`)
      const fetchedPIs = response.data.performanceIndicators;
      setPIs(fetchedPIs);
    }

    if (fileUploaded){
      refetchPIs();
      setFileUploaded(false);
    }
  }, [fileUploaded]);


  return program && version && SO ? (
    <div className="flex h-full flex-col gap-3">
      <PageHeader pageTitle="Student Outcome Detail" />
      <NavigationContext program={program} version={version} SO={SO} />
      <div className="mt-2 flex gap-3">
        <CreatePIModal
          programId={program.id}
          versionId={version.id}
          soId={SO.id}
          setPIs={setPIs}
        />
        <UploadFileModal
          object="PIs"
          uploadPath={`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.id}/versions/${params.version_id}/student-outcomes/${params.so_id}/performance-indicators/file`}
          setFileUploaded={setFileUploaded}
        />
        <EditPIsModal programId={program.id} versionId ={version.id} soId = {params.so_id} PIs={selectedRecords} setPIs={setPIs} />
        <DeletePIsModal selectedRecords={selectedRecords} PIs={PIs} soId = {params.so_id} setPIs={setPIs} programId={params.id} versionId={params.version_id} />
      </div>

      <div className="mt-4 h-full overflow-auto pb-4">
        <DataTable
          withTableBorder
          columns={[
            {
              accessor: "name",
              title: "PI Name",
              width: "20%",
            },
            {
              accessor: "description",
              title: "Description",
            },
            {
              accessor: "actions",
              width: "5%",
              title: <Box mr={6}>Actions</Box>,
              render: (record) => {
                return (
                  <Group gap={4} justify="center" wrap="nowrap">
                    <EditPIModal
                      programId={program.id}
                      versionId={version.id}
                      soId={SO.id}
                      PI={record}
                      setPIs={setPIs}
                    />
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      color="red"
                      onClick={DeleteModal(
                        "PI",
                        record,
                        handleDeletePI,
                        `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program.id}/versions/${version.id}/student-outcomes/${SO.id}/performance-indicators/${record.id}`,
                      )}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ]}
          records={PIs}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
        />
      </div>
    </div>
  ) : (
    <div>Program not found</div>
  );
};

export default Page;
