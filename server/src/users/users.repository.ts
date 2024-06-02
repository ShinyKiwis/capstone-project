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
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

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
      name,
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
    });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    let result;
    if (foundStudent) {
      result = { ...result, ...foundStudent };
    }
    return found;
  }

  async getUsers(filterDto: GetUsersFilterDto) {
    const { search, roles, limit, page } = filterDto;
    const query = this.createQueryBuilder('user').leftJoinAndSelect(
      'user.roles',
      'roles',
    );

    if (search) {
      query.andWhere(
        '(LOWER(user.username) LIKE LOWER (:search) OR LOWER(user.name) LIKE LOWER (:search)) OR CAST(user.id AS TEXT) LIKE LOWER (:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (roles) {
      let newRoles = [];
      if (!Array.isArray(roles)) {
        newRoles = [roles];
      } else {
        newRoles = roles;
      }
      query.andWhere('roles.id IN (:...roles)', { roles: newRoles });
      query.leftJoinAndSelect('user.roles', 'allRoles');
    }

    if (limit && page) {
      query.skip((page - 1) * limit).take(limit);
    }

    let [users, count] = await query.getManyAndCount();

    return {
      total: Math.ceil(count / limit),
      current: +page,
      users,
    };
  }

  async updateOrCreateAUser(createUserDto: CreateUserDto) {
    // console.log('upsert user')
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
    const query = this.createQueryBuilder('user')
      .leftJoin('user.roles', 'roles')
      .where('roles.id=:id', { id: 3 })
      .select(['user.id', 'user.name', 'user.email', 'user.username']);
    const lecturer = await query.getMany();
    return lecturer;
  }
}
