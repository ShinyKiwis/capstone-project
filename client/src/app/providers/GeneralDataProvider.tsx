"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Supervisor, UserOptType } from "../interfaces/User.interface";
// import { useUser } from "../hooks";

interface GeneralDataContextProps {
  supervisorOpts: UserOptType[];
  setSupervisorOpts: (supervisors: UserOptType[]) => void;
  projectStages: ProjectStage[];
  setProjectStages: (stages: ProjectStage[]) => void;
  programBranches: ProgramBranch[];
  setProgramBranches: (pg: ProgramBranch[]) => void;
  registrationPeriods: Registration[];
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
  const [registrationPeriods, setRegistrationPeriods] = useState<Registration[]>([]);

  const [queryClient] =  useState(() => new QueryClient());

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
          { id: 1, name: "Standard Program" },
          { id: 2, name: "English-taught Program" },
        ],
      },
      {
        id: 4,
        name: "Computer Engineering",
        branches: [
          { id: 1, name: "Standard Program" },
          { id: 2, name: "English-taught Program" },
        ],
      },
    ]);

    // Get created deadlines
    setRegistrationPeriods([
      {
        id: 1,
        semester: {
          year: 2023,
          no: 1
        }
      },
      {
        id: 2,
        semester: {
          year: 2023,
          no: 2
        }
      }
    ])
  }, []);

  const GeneralDataContextValue: GeneralDataContextProps = {
    supervisorOpts,
    setSupervisorOpts,
    projectStages,
    setProjectStages,
    programBranches,
    setProgramBranches,
    registrationPeriods
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GeneralDataContext.Provider value={GeneralDataContextValue}>
        {children}
      </GeneralDataContext.Provider>
    </QueryClientProvider>
  );
};

export const useGeneralData = () => {
  const context = useContext(GeneralDataContext);
  if (!context) {
    throw new Error("General data context not initialized !");
  }

  return context;
};
