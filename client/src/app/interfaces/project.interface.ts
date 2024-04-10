interface Project{
  code: number;
  name: string;
  stage: number;
  status: string;
  description: string;
  tasks: string;
  references: string;
  branches: Branch[];
  programs: Program[];
  supervisors: Supervisor[];
  studentsCount: number;
  students: Student[];
  limit: number;
  owner: Supervisor;
}

interface ProjectFormProps {
  name: string;
  stage: string;
  programs: string[];		// program ids
  branches: string[];
  supervisors: string[];
  limit: string;
  students: string[];
  description: string;
  tasks: string;
  references: string;
  requirements: string;
  status: string;
  registration: Registration;
  owner: { id: number };
}

type ProjectStage = {
  name: string;
  id: number;
};
