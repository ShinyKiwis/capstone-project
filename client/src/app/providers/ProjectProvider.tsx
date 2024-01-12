"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

interface ProjectContextProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  viewing?: Project;
  setViewing: (viewing: Project) => void;
  handleEnrollment: (projectId: number) => void;
  handleUnenrollment: (projectId: number) => void;
  handleDeletion: (projectId: number) => void;
}

interface Project {
  code: number;
  name: string;
  stage: number;
  description: string;
  tasks: string;
  references: string;
  status: string;
  semester: {
    year: number;
    no: number;
    start: string;
    end: string;
  };
  requirements: any[];
  students: {
    name: string;
    userId: string;
    credits: number;
    generation: number;
    GPA: string;
    enrolledAt: string;
  }[];
  supervisors: {
    id: number;
    email: string;
    username: string;
    name: string;
  }[];
  majors: {
    id: number;
    name: string;
  }[];
  branches: {
    id: number;
    name: string;
  }[];
  studentsCount: number;
  limit: number;
}

export const ProjectContext = createContext<ProjectContextProps | null>(null);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewing, setViewing] = useState<Project | undefined>();

  useEffect(() => {
    axios.get("http://localhost:3500/projects").then((response) => {
      const data = response.data as { projects: Project[] };
      setProjects(data.projects);
      setViewing(data.projects[0]);
    });
  }, []);

  const handleEnrollment = (projectId: number) => {
    setProjects((projects) =>
      projects.map((project) => {
        if (project.code === projectId) {
          return {
            ...project,
            studentsCount: project.studentsCount + 1,
          };
        }
        return project;
      }),
    );
    if(viewing){
      setViewing({
        ...viewing,
        studentsCount: viewing!.studentsCount + 1,
      });
    }
  };

  const handleUnenrollment = (projectId: number) => {
    setProjects((projects) =>
      projects.map((project) => {
        if (project.code === projectId) {
          return {
            ...project,
            studentsCount: project.studentsCount - 1,
          };
        }
        return project;
      }),
    );    
    if(viewing){
      setViewing({
        ...viewing,
        studentsCount: viewing!.studentsCount - 1,
      });
    }
  };

  const handleDeletion = (projectId: number) => {
    setProjects(projects => projects.filter(project => project.code != projectId))
    if(viewing?.code === projectId) {
      setViewing(undefined)
    }
  }

  const projectContextValue: ProjectContextProps = {
    projects,
    setProjects,
    viewing,
    setViewing,
    handleEnrollment,
    handleUnenrollment,
    handleDeletion,
  };
  return (
    <ProjectContext.Provider value={projectContextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
