"use client"

import {useState, useEffect} from 'react'

const useProgramBranch = () => {
  const [programBranches, setProgramBranches] = useState<ProgramBranch[]>([])

  useEffect(() => {
    // const storedProgramBranches = sessionStorage.getItem("ProgramBranches")
    // if(storedProgramBranches) {
    //   setProgramBranches(JSON.parse(storedProgramBranches))
    // }

    setProgramBranches([
      {
        id: 1,
        name: "Computer Science",
        branches: [
          {id:1, name:"Standard"},
          {id:2, name:"High Quality"},
          {id:3, name:"VJEP"},
        ],
      },
      {
        id: 2,
        name: "Computer Engineering",
        branches: [
          {id:1, name:"Standard"},
          {id:2, name:"High Quality"},
        ]
      }
    ]);
  }, [])
  
  return {
    programBranches,
    setProgramBranches
  }
}

export default useProgramBranch