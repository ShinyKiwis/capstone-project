import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { EnrollProjectDto } from './dto/enroll-project.dto';
import { ProjectsRepository } from 'src/projects/projects.repository';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id, name, password, email } = createUserDto;

    const user = this.create({
      id,
      name,
      password,
      email,
    });

    this.save(user);

    return user;
  }

  async getUserById(id: number) {
    const found = await this.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }
}

@Injectable()
export class StudentsRepository extends Repository<Student> {
  constructor(
    private dataSource: DataSource,
    private userRepository: UsersRepository,
    private projectRepository: ProjectsRepository,
  ) {
    super(Student, dataSource.createEntityManager());
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<User> {
    const { id, name, email, password, generation, credits, GPA } =
      createStudentDto;
    const user = await this.userRepository.createUser({
      id,
      name,
      email,
      password,
    });

    const student = this.create({
      userId: user.id,
      generation,
      credits,
      GPA,
    });

    await this.save(student);

    return user;
  }

  async getStudentById(id: number) {
    const found = await this.findOneBy({ userId: id });

    if (!found) {
      throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    return found;
  }

  async enrollProject(enrollProjectDto: EnrollProjectDto) {
    const { studentId, projectCode } = enrollProjectDto;
    const project = await this.projectRepository.getProjectByCode(projectCode);
    const student = await this.getStudentById(studentId);
    student.project = project;
    student.enrolledAt = new Date();
    await this.save(student);
  }
}
