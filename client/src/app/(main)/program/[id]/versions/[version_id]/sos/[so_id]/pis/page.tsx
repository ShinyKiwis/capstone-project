"use client"
import Program, { SO, Version } from '@/app/interfaces/Program.interface';
import { useBreadCrumbs } from '@/app/providers/BreadCrumbProvider';
import { useProgram } from '@/app/providers/ProgramProvider';
import { Text } from "@mantine/core";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import formatDate from '@/app/lib/formatDate';
import CreatePIModal from '@/app/_components/Modals/PI/CreatePIModal';
import { UploadFileModal } from '@/app/_components';

const Page = ({ params }: { params: { id: string, version_id: string, so_id: string } }) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version ,setVersion] = useState<Version | null>(null);
  const [SO, setSO] = useState<SO | null>(null);
  const [PIs, setPIs] = useState([])
  const {buildBreadCrumbs} = useBreadCrumbs();
  const {getProgram} = useProgram();
  const [fileUploaded, setFileUploaded] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(existedVersion => existedVersion.id == parseInt(params.version_id))[0];
        setProgram(targetProgram);
        setVersion(targetVersion);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${targetProgram.id}/versions/${targetVersion.id}/student-outcomes/${params.so_id}`)
        setSO(response.data)
        buildBreadCrumbs(targetProgram, targetVersion, response.data);
        console.log(response)
      }
    };

    if (!program) {
      fetchProgram();
    }
  })

  return program && version && SO ? (
    <div className='flex flex-col h-full'>
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
      <div className="flex gap-2">
        <Text size="md" fw={600}>
          SO:
        </Text>
        <Text size="md" fw={400}>
          {SO.name} - {SO.description}
        </Text>
      </div>
      <div className="mt-2 flex">
        <CreatePIModal programId={program.id} versionId={version.id} setPIs={setPIs}/>
        <UploadFileModal
          object="PIs"
          setFileUploaded={setFileUploaded}
        />
      </div>
    </div>
  ) : <div>Program not found</div>
}

export default Page
