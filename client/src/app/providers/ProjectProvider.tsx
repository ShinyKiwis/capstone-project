"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { User } from "./AuthProvider";
import { useUser } from "../hooks";

interface ProjectContextProps {
  projects: Project[];
  setProjects: (projects: Project[]) => void;
  viewing?: Project;
  setViewing: (viewing: Project) => void;
  getProjects: (ownerId?: number, status?: string, stage?: number) => void;
  handleEnrollment: (projectId: number) => void;
  handleUnenrollment: (projectId: number) => void;
  handleDeletion: (projectId: number) => void;
  handleUpdateProject: (projectId: number, project: Project) => void;
  handleChangeProjectStatus: (projectId: number, status: string) => void;
  handleCreation: (project: Project) => void;
}

interface Project {
  code: number;
  name: string;
  stage: number;
  description: string;
  tasks: string;
  references: string;
  status: string;
  requirements: string;
  students: {
    user: any;
    userId: number;
    credits: number;
    generation: number;
    GPA: number;
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
  const user= useUser()

  // useEffect(() => {
  //   axios.get("http://localhost:3500/projects").then((response) => {
  //     const data = response.data as { projects: Project[] };
  //     setProjects(data.projects);
  //     setViewing(data.projects[0]);
  //   });
  // }, []);

  const getProjects = (ownerId?: number, status?: string, stage?: number) => {
    const apiURL = `http://localhost:3500/projects?${
      ownerId ? `owner=${ownerId}` : ""
    }${status ? `&status=${status}` : ""}${stage ? `&stage=${stage}` : ""}`;

    axios.get(apiURL).then((response) => {
      const data = response.data as { projects: Project[] };
      setProjects(data.projects);
      setViewing(data.projects[0]);
    });
  };

  const handleEnrollment = (projectId: number) => {
    const newStudent = {
      user: user,
      userId: user.id,
      credits: user.credits,
      generation: user.generation,
      GPA: user.GPA,
      enrolledAt: user.enrolledAt,
    }
    setProjects((projects) =>
      projects.map((project) => {
        if (project.code === projectId) {
          return {
            ...project,
            students: [...project.students, newStudent],
            studentsCount: project.studentsCount + 1,
          };
        }
        return project;
      }),
    );
    if (viewing) {
      setViewing({
        ...viewing,
        students: [...viewing.students, newStudent],
        studentsCount: viewing!.studentsCount + 1,
      });
    }
  };

  const handleUpdateProject = (projectId: number, project: Project) => {
    setProjects((projects) =>
      projects.map((prevProject) =>
        prevProject.code == projectId ? project : prevProject,
      ),
    );
  };

  const handleChangeProjectStatus = (projectId: number, status: string) => {
    setProjects((projects) => {
      return projects.map((prevProject) => {
        if (prevProject.code == projectId) {
          return {
            ...prevProject,
            status: status,
          };
        } else {
          return prevProject;
        }
      });
    });
    if (viewing?.code == projectId) {
      setViewing({
        ...viewing,
        status: status,
      });
    }
  };

  const handleUnenrollment = (projectId: number) => {
    setProjects((projects) =>
      projects.map((project) => {
        if (project.code === projectId) {
          return {
            ...project,
            students: project.students.filter(student => +student.userId !== user.id),
            studentsCount: project.studentsCount - 1,
          };
        }
        return project;
      }),
    );
    if (viewing?.code == projectId) {
      setViewing({
        ...viewing,
        students: viewing.students.filter(student => +student.userId !== user.id),
        studentsCount: viewing!.studentsCount - 1,
      });
    }
  };

  const handleDeletion = (projectId: number) => {
    setProjects((projects) =>
      projects.filter((project) => project.code != projectId),
    );
    if (viewing?.code === projectId) {
      setViewing(undefined);
    }
  };

  const handleCreation = (project: Project) => {
    setProjects([...projects, project]);
  };

  const projectContextValue: ProjectContextProps = {
    projects,
    setProjects,
    viewing,
    setViewing,
    getProjects,
    handleEnrollment,
    handleUnenrollment,
    handleDeletion,
    handleUpdateProject,
    handleChangeProjectStatus,
    handleCreation,
  };
  return (
    <ProjectContext.Provider value={projectContextValue}>
      {children}
    </ProjectContext.Provider>
  );
};
