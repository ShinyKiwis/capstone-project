import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AssignRolesDto } from './dto/assign-role.dto';
import { StudentsRepository } from 'src/students/students.repository';

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
    // const query = this.createQueryBuilder('user').leftJoin('student.user')
    const found = await this.findOne({
      where: { id },
      relations: { roles: true },
    });

    const foundStudent = await this.findOne({
      where: { id },
    })

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    let result;
    if(foundStudent) {
      result = {...result, ...foundStudent}
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
    const query = this.createQueryBuilder('user').leftJoin('user.roles', 'roles').where('roles.id=:id', { id: 2 }).select(['user.id', 'user.name', 'user.email']);
    const lecturer = await query.getMany();
    return lecturer;
  }
}
