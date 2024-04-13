"use client"
import { createContext, useState, useContext, useEffect } from "react"
import Program from "../interfaces/Program.interface"
import axios from "axios"


interface ProgramContextType {
  programs: Program[],
  setPrograms: (programs: Program[]) => void
  getProgram: (id: number) => Program | null
}

const programContext = createContext<ProgramContextType | null>(null)

export const ProgramProvider = ({ children }: { children: React.ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>([])

  console.log(programs)

  useEffect(() => {
    const fetchPrograms = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs`)
      setPrograms([...programs, ...response.data])
    }
    fetchPrograms()
  }, [])

  const getProgram = (id: number) => {
    return programs.find(program => program.id === id) || null
  }

  return (
    <programContext.Provider value={{ programs, setPrograms, getProgram }}>
      {children}
    </programContext.Provider>
  )
}

export const useProgram = () => {
  const context = useContext(programContext)
  if(!context) {
    throw new Error("useProgram must be used inside the ProgramProvider")
  }

  return context
}