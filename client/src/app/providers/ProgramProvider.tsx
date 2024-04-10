import { createContext, useState, useContext } from "react"
import Program from "../interfaces/Program.interface"


interface ProgramContextType {
  programs: Program[],
  setPrograms: (programs: Program[]) => void
}

const programContext = createContext<ProgramContextType | null>(null)

export const ProgramProvider = ({ children }: { children: React.ReactNode }) => {
  const [programs, setPrograms] = useState<Program[]>([])

  return (
    <programContext.Provider value={{ programs, setPrograms }}>
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