import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { EnrollProjectDto } from './dto/enroll-project.dto';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { AssignRolesDto } from './dto/assign-role.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id, username, email, name } = createUserDto;

    const user = this.create({
      id,
      username,
      email,
      name
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate user
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async getUserById(id: number) {
    const found = await this.findOne({
      where: { id },
      relations: { roles: true },
    });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }

  async updateOrCreateAUser(createUserDto: CreateUserDto) {
    await this.upsert(createUserDto, ['id']);
    const user = await this.getUserById(createUserDto.id);
    return user;
  }

  async assignRoles(id: number, assignRolesDto: AssignRolesDto) {
    const user = await this.getUserById(id);
    user.roles = assignRolesDto.roles;
    await this.save(user);
    return user;
  }

  async getAllInstructors() {
    const query = this.createQueryBuilder('user').leftJoin('user.roles', 'roles').where('roles.id=:id', { id: 2 }).select(['user.id', 'user.name']);
    const lecturer = await query.getMany();
    return lecturer;
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
    const { id, username, name, email, generation, credits, GPA } = createStudentDto;
    console.log(createStudentDto);
    // let user;
    // try {

    //   });
    // } catch (error) {
    //   console.log(error);
    //   throw error;
    // }

    const user = await this.userRepository.createUser({
      id,
      username,
      email,
      name
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
