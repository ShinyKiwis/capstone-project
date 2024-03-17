interface Project{
  code: number;
  name: string;
  status: string;
  description: string;
  tasks: string;
  references: string;
  branches: Branch[];
  majors: Program[];
  supervisors: Supervisor[];
  studentsCount: number;
  students: Student[];
  limit: number;
}

interface ProjectFormProps {
  name: string;
  stage: string;
  majors: string[];		// program ids
  branches: string[];
  supervisors: string[];
  limit: string;
  students: string[];
  description: string;
  tasks: string;
  references: string;
  requirements: string;
  status: string;
  semester: {
    year: number;
    no: number;
  };
  owner: { id: number };
}

type ProjectStage = {
  name: string;
  id: number;
};
