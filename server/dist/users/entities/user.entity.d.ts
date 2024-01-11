import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: number;
    email: string;
    username: string;
    name: string;
    roles: Role[];
}
