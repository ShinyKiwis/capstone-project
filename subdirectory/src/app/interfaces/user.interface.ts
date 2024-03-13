type Role = {
	id: number,
	name: string
}

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	roles: Role[];
	project?: {
		code: number,
	}
}

interface User_ManageTable extends Pick<User, 'id'|'name'|'email'|'roles'> {}