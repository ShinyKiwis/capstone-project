interface Project {
  code: number;
  name: string;
  stage: number;
  description: string;
  tasks: string;
  references: string;
  status: string;
  requirements: string;
  students: Student[];
  supervisors: Supervisor[];
  majors: Program[];
  branches: Branch[];
  studentsCount: number;
  limit: number;
}

interface ProjectProps {
  code: number;
  name: string;
  status: string;
  description: string;
  tasks: string;
  references: string;
  branches: {
    id: number;
    name: string;
  }[];
  majors: {
    id: number;
    name: string;
  }[];
  supervisors: {
    id: number;
    email: string;
    username: string;
    name: string;
  }[];
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
