import { ProjectCard } from '@/app/_components'
import React from 'react'

const Program = () => {
  return (
    <div>
      <h1>Test static header for program page:</h1>
      <div className="flex w-1/2 flex-col gap-4">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
    </div>
  )
}

export default Program