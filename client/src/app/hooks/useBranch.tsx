"use client"

import {useState, useEffect} from 'react'

export interface Branch {
  id: number,
  name: string
}

const useBranch = () => {
  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    const storedBranches = sessionStorage.getItem("branches")
    if(storedBranches) {
      setBranches(JSON.parse(storedBranches))
    }
  }, [])
  return {
    branches,
    setBranches
  }
}

export default useBranch