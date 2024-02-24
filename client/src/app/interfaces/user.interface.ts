interface User {
	id: number;
	name: string;
	username?: string;
	email?: string;
	roles: {
		id:string,
		name:string
	}[];
	credits?: number;
	generation?: number;
	GPA?: number;
	enrolledAt?: string;
	project?: {
		code: number,
	}
}

type Instructor = {
  id: number;
  email: string;
  username: string;
  name: string
}

type SearchStudentDataType = {
  // As retreived from API call: http://localhost:3500/users/students?search=
  userId: number;
  user: {
    email:string;
    name: string;
  }
}

type Role = {
	id: number,
	name: string
}

// type StudentType = {
//   userId: number | string
//   GPA: string;
//   credits: number;
//   enrolledAt: any;
//   generation: number;
//   user: {
//     id: number | string;
//     email: string;
//     name: string;
//     username: string
//   };
// }
