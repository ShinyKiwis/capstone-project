"use client";
import { useEffect, useState } from 'react'
import Program, { SO, Version } from '@/app/interfaces/Program.interface';
import { useBreadCrumbs } from '@/app/providers/BreadCrumbProvider';
import { useProgram } from '@/app/providers/ProgramProvider';
import { ActionIcon, Box, Group, Text } from '@mantine/core';
import formatDate from '@/app/lib/formatDate';
import CreateSOModal from '@/app/_components/Modals/SO/CreateSOModal';
import { PageHeader, UploadFileModal } from '@/app/_components';
import { DataTable } from 'mantine-datatable';
import Link from 'next/link';
import { IconEye, IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import {NavigationContext} from '@/app/_components';
import DeleteModal from '@/app/_components/Modals/DeleteModal';
import EditSOsModal from '@/app/_components/Modals/SO/EditSOsModal';
import EditSOModal from '@/app/_components/Modals/SO/EditSOModal';
import DeleteSOsModal from '@/app/_components/Modals/SO/DeleteSOsModal';

const Page = ({ params }: { params: { id: string, version_id: string } }) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version ,setVersion] = useState<Version | null>(null);
  const {buildBreadCrumbs} = useBreadCrumbs();
  const {getProgram} = useProgram();
  const [fileUploaded, setFileUploaded] = useState(false);
  const [SOs, setSOs] = useState<SO[]>([])
  const [selectedRecords, setSelectedRecords] = useState<SO[]>([]);

  const handleDeleteSO = (SO: SO) => {
    setSOs(SOs.filter(existedSO => existedSO.id !== SO.id))
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
        const targetSOs = response.data.studentOutcomes;
        setSOs(targetSOs);
      }
    };

    if (!program) {
      fetchProgram();
    }
  })

  useEffect(() => {
    setSOs(SOs.sort((a: SO, b: SO) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }));
  }, [SOs])

  useEffect(() => {
    const refetchSOs = async () => {
      // refetch SOs after import
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.id}/versions/${params.version_id}`)
      const targetSOs = response.data.studentOutcomes;
      setSOs(targetSOs);
    }

    if (fileUploaded){
      refetchSOs();
      setFileUploaded(false);
    }
  }, [fileUploaded]);

  return program && version ? (
    <div className='flex h-full flex-col gap-3'>
      <PageHeader pageTitle="Student Outcomes Management" />
      <NavigationContext program={program} version={version} />

      <div className="mt-2 flex gap-3">
        <CreateSOModal programId={program.id} versionId={version.id} setSOs={setSOs}/>
        <UploadFileModal
          object="SOs"
          uploadPath={`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${params.id}/versions/${params.version_id}/student-outcomes/file`}
          setFileUploaded={setFileUploaded}
        />
        <EditSOsModal programId={program.id} versionId ={version.id} SOs={selectedRecords} setSOs={setSOs} />
        <DeleteSOsModal selectedRecords={selectedRecords} SOs={SOs} setSOs={setSOs} programId={params.id} versionId={params.version_id} />
      </div>
      <div className="mt-4 h-full overflow-auto pb-4">
        <DataTable
          withTableBorder
          columns={[
            {
              accessor: "id",
              title: "SO Name",
              width: "15%",
              sortable: true,
              render: (record) => {
                return (
                  <Link
                    href={`/program/${program.id}/versions/${version.id}/sos/${record.id}/pis`}
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
                      <Link href={`/program/${program.id}/versions/${version.id}/sos/${record.id}/pis`}>
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
                        `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program.id}/versions/${version.id}/student-outcomes/${record.id}`
                      )}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                );
              },
            },
          ]}
          records={SOs}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
        />
      </div>
    </div>
  ) : <div>Program not found</div>
}

export default Page
