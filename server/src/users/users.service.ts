import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsRepository, UsersRepository } from './users.repository';
import { EnrollProjectDto } from './dto/enroll-project.dto';

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

  findAll() {
    return `This action returns all users`;
  }

  getAUser(id: number) {
    return this.usersRepository.getUserById(id);
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
}
