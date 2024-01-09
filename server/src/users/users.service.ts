import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsRepository, UsersRepository } from './users.repository';
import { EnrollProjectDto } from './dto/enroll-project.dto';
import { AssignRolesDto } from './dto/assign-role.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private studentsRepository: StudentsRepository,
  ) {}

  createAUser(createUserDto: CreateUserDto) {
    return this.usersRepository.createUser(createUserDto);
  }

  createAStudentUser(createStudentDto: CreateStudentDto) {
    return this.studentsRepository.createStudent(createStudentDto);
  }

  getAllInstructors() {
    return this.usersRepository.getAllInstructors();
  }

  findAll() {
    return `This action returns all users`;
  }

  getAUser(id: number) {
    return this.usersRepository.getUserById(id);
  }

  updateOrCreateAUser(createUserDto: CreateUserDto) {
    return this.usersRepository.updateOrCreateAUser(createUserDto);
  }

  enrollToAProject(enrollProjectDto: EnrollProjectDto) {
    return this.studentsRepository.enrollProject(enrollProjectDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  assignRoles(id: number, assignRolesDto: AssignRolesDto) {
    return this.usersRepository.assignRoles(id, assignRolesDto);
  }
}
