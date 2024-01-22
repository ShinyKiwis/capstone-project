"use client"

import {useState, useEffect} from 'react'

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