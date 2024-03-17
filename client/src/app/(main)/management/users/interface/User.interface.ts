export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: {
    id?: number;
    roleName: string;
    resources: string[];
  }[];
  [key: string]: any;
}