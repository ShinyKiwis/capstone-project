"use client"

import {useState, useEffect} from 'react'

export interface Major {
  id: number,
  name: string
}

const useMajor = () => {
  const [majors, setMajors] = useState<Major[]>([])

  useEffect(() => {
    const storedMajors = sessionStorage.getItem("majors")
    if(storedMajors) {
      setMajors(JSON.parse(storedMajors))
    }
  }, [])
  return {
    majors,
    setMajors
  }
}

export default useMajor