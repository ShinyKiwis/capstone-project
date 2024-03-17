"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { useUser } from "../hooks";

interface GeneralDataContextProps {
  supervisorOpts: UserOptType[];
  setSupervisorOpts: (supervisors: UserOptType[]) => void;
  projectStages: ProjectStage[];
  setProjectStages: (stages: ProjectStage[]) => void;
  programBranches: ProgramBranch[];
  setProgramBranches: (pg: ProgramBranch[]) => void;
}

export const GeneralDataContext = createContext<GeneralDataContextProps | null>(
  null,
);

export const GeneralDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [supervisorOpts, setSupervisorOpts] = useState<UserOptType[]>([]);
  const [projectStages, setProjectStages] = useState<ProjectStage[]>([]);
  const [programBranches, setProgramBranches] = useState<ProgramBranch[]>([]);

  useEffect(() => {
    // Get supervisors
    axios
      .get("http://localhost:3500/users/instructors")
      .then((response) => {
        let supervisorOptions: UserOptType[] = response.data.map(
          (supervisor: Supervisor) => {
            return {
              id: supervisor.id.toString(),
              name: supervisor.name,
              email: supervisor.email,
            };
          },
        );
        setSupervisorOpts(supervisorOptions);
      })
      .catch((error) => {
        console.error("Error fetching supervisors:", error);
      });

    // Get project stages
    setProjectStages([
      {
        name: "Specialized project",
        id: 1,
      },
      {
        name: "Capstone project",
        id: 2,
      },
    ]);

    // Get program-branches
    setProgramBranches([
      {
        id: 1,
        name: "Computer Science",
        branches: [
          { id: 1, name: "Standard" },
          { id: 2, name: "High Quality" },
          { id: 3, name: "VJEP" },
        ],
      },
      {
        id: 2,
        name: "Computer Engineering",
        branches: [
          { id: 1, name: "Standard" },
          { id: 2, name: "High Quality" },
        ],
      },
    ]);
  }, []);

  const GeneralDataContextValue: GeneralDataContextProps = {
    supervisorOpts,
    setSupervisorOpts,
    projectStages,
    setProjectStages,
    programBranches,
    setProgramBranches,
  };

  return (
    <GeneralDataContext.Provider value={GeneralDataContextValue}>
      {children}
    </GeneralDataContext.Provider>
  );
};
