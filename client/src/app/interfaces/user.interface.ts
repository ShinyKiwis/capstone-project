interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: Role[];
  project?: {
    code: number;
  };
  resources: string[];
}

type UserOptType = {
  name: string;
  id: string;
  email: string;
  [key: string]: any;
};

interface User_ManageTable
  extends Pick<User, "id" | "name" | "email" | "roles"> {}

interface Supervisor extends Pick<User, "id" | "name" | "email" | "username"> {}

type Student = {
  user: User;
  userId: number;
  credits: number;
  generation: number;
  GPA: number;
  enrolledAt: string;
};
