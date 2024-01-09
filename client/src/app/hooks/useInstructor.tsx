"use client"

import {useState, useEffect} from 'react'

interface Instructor {
  id: number,
  email: string,
  name: string
}

const useInstructor = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([])

  useEffect(() => {
    const storedInstructors = sessionStorage.getItem("instructors")
    if(storedInstructors) {
      setInstructors(JSON.parse(storedInstructors))
    }
  }, [])
  return {
    instructors,
    setInstructors
  }
}

export default useInstructor