import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import { EnrollProjectDto } from './dto/enroll-project.dto';
import { Student } from './entities/student.entity';
import { UnenrollProjectDto } from './dto/unenroll-project.dto';

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
    const found = await this.findOne({ where: { userId: id }, relations: { project: true } });
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

  async unenrollProject(unenrollProjectDto: UnenrollProjectDto) {
    const { id } = unenrollProjectDto;
    const student = await this.getStudentById(id);
    if(!student.project) {
      throw new ConflictException(`User with id ${id} has not enrolled in any project`);
    }
    student.project = null;
    student.enrolledAt = null;
    return student;
  }
}