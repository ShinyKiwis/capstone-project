"use client"
import Program, { Version } from '@/app/interfaces/Program.interface';
import { useBreadCrumbs } from '@/app/providers/BreadCrumbProvider';
import { useProgram } from '@/app/providers/ProgramProvider';
import axios from 'axios';
import { Text } from "@mantine/core"
import React, { useEffect, useState } from 'react'
import formatDate from '@/app/lib/formatDate';
import CreatePEOModal from '@/app/_components/Modals/PEO/CreatePEOModal';
import { UploadFileModal } from '@/app/_components';

const Page = ({params}: { params: { id: string, version_id: string} }) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version ,setVersion] = useState<Version | null>(null);
  const {buildBreadCrumbs} = useBreadCrumbs();
  const {getProgram} = useProgram();
  const [fileUploaded, setFileUploaded] = useState(false);

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
        <CreatePEOModal />
        <UploadFileModal
          object="PEOs"
          setFileUploaded={setFileUploaded}
        />
      </div>
    </div>
  ) : <div>Program not found</div>
}

export default Page
