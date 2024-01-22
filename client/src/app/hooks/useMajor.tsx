"use client"

import {useState, useEffect} from 'react'

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