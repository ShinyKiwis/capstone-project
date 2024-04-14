"use client";
import { createContext, useState, useContext, useEffect } from "react";
import Program from "../interfaces/Program.interface";
import axios from "axios";

interface ProgramContextType {
  programs: Program[];
  setPrograms: (programs: Program[]) => void;
  getProgram: (id: number) => Promise<Program | null>;
  updateProgram: (program: Program) => void;
}

const programContext = createContext<ProgramContextType | null>(null);

export const ProgramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [programs, setPrograms] = useState<Program[]>([]);

  console.log(programs);

  useEffect(() => {
    console.log("FETCHING PROGRAMS");
    const fetchPrograms = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/programs`,
      );
      setPrograms([...programs, ...response.data]);
    };
    fetchPrograms();
  }, []);

  const getProgram = async (id: number) => {
    if(programs){
      return programs.find((program) => program.id === id) || null;
    }else {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${id}`);
      return response.data
    }
  };

  const updateProgram = async (program: Program) => {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/programs/${program.id}`,
      {
        name: program.name,
        major: program.major,
        description: program.description,
      },
    );
    setPrograms(prevPrograms =>
      prevPrograms.map((p) => (p.id === program.id ? response.data : p)),
    );
  }

  return (
    <programContext.Provider value={{ programs, setPrograms, getProgram, updateProgram }}>
      {children}
    </programContext.Provider>
  );
};

export const useProgram = () => {
  const context = useContext(programContext);
  if (!context) {
    throw new Error("useProgram must be used inside the ProgramProvider");
  }

  return context;
};
