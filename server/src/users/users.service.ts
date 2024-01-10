import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { AssignRolesDto } from './dto/assign-role.dto';
import { StudentsRepository } from 'src/students/students.repository';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { EnrollProjectDto } from 'src/students/dto/enroll-project.dto';

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

  async getAUser(id: number) {
    const user = await this.usersRepository.getUserById(id);
    const student = await this.studentsRepository.getStudentById(id);
    console.log(user);
    console.log(student);
    if(student) {
      return {...user, ...student};
    }
    return user;
  }

  async updateOrCreateAUser(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.updateOrCreateAUser(createUserDto);
    const student = await this.studentsRepository.getStudentById(user.id);
    console.log(user);
    console.log(student);
    if(student) {
      return {...user, ...student};
    }
    return user;
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
