"use client"
import Program, { PEO, Version } from '@/app/interfaces/Program.interface';
import { useBreadCrumbs } from '@/app/providers/BreadCrumbProvider';
import { useProgram } from '@/app/providers/ProgramProvider';
import axios from 'axios';
import { ActionIcon, Box, Group, Text } from "@mantine/core"
import React, { useEffect, useState } from 'react'
import formatDate from '@/app/lib/formatDate';
import CreatePEOModal from '@/app/_components/Modals/PEO/CreatePEOModal';
import { UploadFileModal } from '@/app/_components';
import { DataTable } from 'mantine-datatable';
import { IconEye, IconTrash } from '@tabler/icons-react';
import DeleteModal from '@/app/_components/Modals/DeleteModal';
import Link from 'next/link';

const Page = ({params}: { params: { id: string, version_id: string} }) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version ,setVersion] = useState<Version | null>(null);
  const {buildBreadCrumbs} = useBreadCrumbs();
  const {getProgram} = useProgram();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [PEOs, setPEOs] = useState<PEO[]>([])

  const handleDeletePEO = () => {

  }

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(existedVersion => existedVersion.id == parseInt(params.version_id))[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}`)
        console.log(targetVersion)
      }
    };

    if (!program) {
      fetchProgram();
    }
  })
  return program && version ? (
    <div className='flex h-full flex-col'>
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
          {version.name} ({formatDate(version.startDate.toString())} - {formatDate(version.endDate.toString())})
        </Text>
      </div>
      <div className="mt-2 flex">
        <CreatePEOModal programId={program.id} versionId={version.id} setPEOs={setPEOs}/>
        <UploadFileModal
          object="PEOs"
          setFileUploaded={setFileUploaded}
        />
      </div>
      <div className="mt-4 h-full overflow-auto pb-4">
        <DataTable
          withTableBorder
          columns={[
            {
              accessor: "name",
              title: "PEO Name",
              width: "5%",
              sortable: true,
              render: (record) => {
                return (
                  <Link
                    href={`/program/${program.id}/versions/${version.id}/peos/${record.id}`}
                    className="text-blue-600 underline hover:text-blue-900"
                  >
                    {record.name}
                  </Link>
                );
              },
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
                    <ActionIcon size="sm" variant="subtle" color="green">
                      <Link href={`/program/${record.id}/versions`}>
                        <IconEye size={16} />
                      </Link>
                    </ActionIcon>
                    <EditSOModal programId={program.id} versionId={version.id} SO={record} setSOs={setSOs} />
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      color="red"
                      onClick={DeleteModal(
                        "SO", 
                        record, 
                        handleDeleteSO, 
                        `${process.env.NEXT_PUBLIC_DELETE_PROGRAM_URL!}/${program.id}/versions/${version.id}/student-outcomes/${record.id}`
                      )}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ]}
          records={PEOs}
        />
      </div>
    </div>
  ) : <div>Program not found</div>
}

export default Page
