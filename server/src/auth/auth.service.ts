import { Injectable } from '@nestjs/common';
import { BranchesRepository } from '../programs/branches.repository';
import { MajorsRepository } from '../programs/majors.repository';
import { StudentsRepository } from '../students/students.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private branchesRepository: BranchesRepository,
    private majorsRepository: MajorsRepository,
    private studentsRepository: StudentsRepository,
  ) {}
  async getAuthSession(session: Record<string, any>) {
    const branches = await this.branchesRepository.getAllBranches();
    const majors = await this.majorsRepository.getAllMajors();
    const lecturer = await this.usersRepository.getAllInstructors();
    session.authenticated = true;
    (session.branches = branches), (session.majors = majors);
    session.instructors = lecturer;
    return session;
  }

  async getUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    let user = await this.usersRepository.updateOrCreateAUser(createUserDto);
    const student = await this.studentsRepository.getStudentById(user.id);
    if (student) {
      user = { ...user, ...student };
    }
    return user;
  }

  async getUserById(id: number) {
    let user = await this.usersRepository.findOneBy({ id });
    if (user) {
      const student = await this.studentsRepository.getStudentById(user.id);
      if (student) {
        user = { ...user, ...student };
      }
    }
    return user;
  }
}
