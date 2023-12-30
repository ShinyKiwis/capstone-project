'use client'

import { ProjectCard } from '@/app/_components'
import React from 'react'
import { usePathname, useSearchParams } from "next/navigation";

const Project = () => {
  let projectType = useSearchParams().get('project')
  return (
    <div>
      Projects page for {projectType}
    </div>
  )
}

export default Project