export class CreateProjectFromFileDto {
  name: string;
  instructors: {};
  emails: {};
  program: string;
  branch: string;
  limit: number;
  students: {name: string, studentID: string}[]
  description: string;
  tasks: string;
  references: string;
}