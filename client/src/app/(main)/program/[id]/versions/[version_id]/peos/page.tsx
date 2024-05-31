"use client"
import Program, { PEO, Version } from '@/app/interfaces/Program.interface';
import { useBreadCrumbs } from '@/app/providers/BreadCrumbProvider';
import { useProgram } from '@/app/providers/ProgramProvider';
import axios from 'axios';
import { ActionIcon, Box, Group, Text } from "@mantine/core"
import React, { useEffect, useState } from 'react'
import formatDate from '@/app/lib/formatDate';
import CreatePEOModal from '@/app/_components/Modals/PEO/CreatePEOModal';
import { NavigationContext, PageHeader, UploadFileModal } from '@/app/_components';
import { DataTable } from 'mantine-datatable';
import { IconEye, IconTrash } from '@tabler/icons-react';
import DeleteModal from '@/app/_components/Modals/DeleteModal';
import Link from 'next/link';
import EditPEOModal from '@/app/_components/Modals/PEO/EditPEOModal';

const Page = ({params}: { params: { id: string, version_id: string} }) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version ,setVersion] = useState<Version | null>(null);
  const {buildBreadCrumbs} = useBreadCrumbs();
  const {getProgram} = useProgram();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [PEOs, setPEOs] = useState<PEO[]>([])

  const handleDeletePEO = (PEO: PEO) => {
    setPEOs(PEOs.filter(existedPEO => existedPEO.id !== PEO.id))
  }

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(existedVersion => existedVersion.id == parseInt(params.version_id))[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}/program-education-objectives`)
        setPEOs(response.data)
        console.log(response.data)
      }
    };

    if (!program) {
      fetchProgram();
    }
  })
  return program && version ? (
    <div className='flex h-full flex-col gap-3'>
      <PageHeader pageTitle="Program Education Objectives Management" />
      <NavigationContext program={program} version={version} />
      
      <div className="mt-2 flex gap-3">
        <CreatePEOModal programId={program.id} versionId={version.id} setPEOs={setPEOs}/>
        <UploadFileModal
          object="PEOs"
          uploadPath='undefined'
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
              width: "15%",
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
                    <EditPEOModal programId={program.id} versionId={version.id} PEO={record} setPEOs={setPEOs}/>
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      color="red"
                      onClick={DeleteModal(
                        "PEO", 
                        record, 
                        handleDeletePEO, 
                        `${process.env.NEXT_PUBLIC_DELETE_PROGRAM_URL!}/${program.id}/versions/${version.id}/program-education-objectives/${record.id}`
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
