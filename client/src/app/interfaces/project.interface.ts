type Student = {
	user: User;
	userId: number;
	credits: number;
	generation: number;
	GPA: number;
	enrolledAt: string;
};

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

type Branch = {
	id: number,
	name: string
}

type Major = {
  id: number,
  name: string
}

// type ProjectData = {
//   code: number;
//   name: string;
//   stage: number;
//   description: string;
//   tasks: string;
//   references: string;
//   status: string;
//   semester: {
//     year: number;
//     no: number;
//     start: string;
//     end: string;
//   };
//   requirements: any[];
//   students: {
//     name: string;
//     userId: string;
//     credits: number;
//     generation: number;
//     GPA: string;
//     enrolledAt: string;
//   }[];
//   supervisors: {
//     id: number;
//     email: string;
//     username: string;
//     name: string;
//   }[];
//   majors: {
//     id: number;
//     name: string;
//   }[];
//   branches: {
//     id: number;
//     name: string;
//   }[];
//   studentsCount: number;
//   limit: number;
// };