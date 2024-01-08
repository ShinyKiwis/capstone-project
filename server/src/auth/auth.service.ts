import { Injectable } from '@nestjs/common';
import { BranchesRepository } from 'src/programs/branches.repository';
import { MajorsRepository } from 'src/programs/majors.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository, private branchesRepository: BranchesRepository, private majorsRepository: MajorsRepository) {}
  async getAuthSession(
    session: Record<string, any>,
    createUserDto: CreateUserDto,
  ) {
    const user = await this.usersRepository.updateOrCreateAUser(createUserDto);
    const branches = await this.branchesRepository.getAllBranches();
    const majors = await this.majorsRepository.getAllMajors();
    const lecturer = await this.usersRepository.getAllInstructors();
    session.authenticated = true;
    session.user = user;
    session.branches = branches,
    session.majors = majors;
    session.instructors = lecturer;
    return session;
  }
}
