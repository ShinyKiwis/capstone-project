"use client"
import {useEffect, useState} from 'react'
import { useProgram } from '@/app/providers/ProgramProvider';
import Program, { Version } from "@/app/interfaces/Program.interface";
import { Text, Button } from "@mantine/core";
import formatDate from "@/app/lib/formatDate";
import { useBreadCrumbs } from '@/app/providers/BreadCrumbProvider';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import { NavigationContext, PageHeader } from '@/app/_components';

const Page = ({ params }: { params: { id: string, version_id: string } }) => {
  const [program, setProgram] = useState<Program | null>(null);
  const [version ,setVersion] = useState<Version | null>(null);
  const {buildBreadCrumbs} = useBreadCrumbs();
  const {getProgram} = useProgram();
  useEffect(() => {
    const fetchProgram = async () => {
      const targetProgram = await getProgram(parseInt(params.id));
      if (targetProgram) {
        const targetVersion = targetProgram.versions.filter(existedVersion => existedVersion.id == parseInt(params.version_id))[0];
        buildBreadCrumbs(targetProgram, targetVersion);
        setProgram(targetProgram);
        setVersion(targetVersion);
      }
    };

    if (!program) {
      fetchProgram();
    }
  });
  console.log(program)
  console.log(version)
  return program && version ? (
    <div className='flex h-full flex-col gap-4'>
      <PageHeader pageTitle="Version Detail" />
      <NavigationContext program={program} version={version} />
      
      <div className='w-1/2 flex flex-col gap-4'>
        <Button justify='space-between' rightSection={<IconExternalLink size={16} />} component={Link} href={`/program/${program.id}/versions/${version.id}/peos`}>Manage PEOs</Button>
        <Button justify='space-between' rightSection={<IconExternalLink size={16} />} component={Link} href={`/program/${program.id}/versions/${version.id}/sos`}>Manage SOs</Button>
      </div>
    </div>
  ) : <div>Program not found</div>
}

export default Page
