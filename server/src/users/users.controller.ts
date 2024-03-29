import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignRolesDto } from './dto/assign-role.dto';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import { EnrollProjectDto } from '../students/dto/enroll-project.dto';
import { UnenrollProjectDto } from '../students/dto/unenroll-project.dto';
import { GetStudentsDto } from 'src/students/dto/get-students.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  updateOrCreateAUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.updateOrCreateAUser(createUserDto);
  }

  @Post('/student')
  create(@Body() createStudentDto: CreateStudentDto) {
    console.log(createStudentDto);
    return this.usersService.createAStudentUser(createStudentDto);
  }

  @Post('/student/enroll')
  enrollToAProject(@Body() enrollProjectDto: EnrollProjectDto) {
    return this.usersService.enrollToAProject(enrollProjectDto);
  }

  @Post('/student/unenroll')
  unenrollFromAProject(@Body() unenrollProjectDto: UnenrollProjectDto) {
    return this.usersService.unenrollFromAProject(unenrollProjectDto);
  }

  @Get()
  getAllUsers(@Query() filterDto: GetUsersFilterDto) {
    return this.usersService.getUsers(filterDto);
  }

  @Get('/instructors')
  getAllInstructors() {
    return this.usersService.getAllInstructors();
  }

  @Get('/students')
  getStudents(@Query() getStudentsDto: GetStudentsDto) {
    return this.usersService.getStudents(getStudentsDto);
  }

  @Post('/:id/roles')
  assignRoles(@Param('id') id: string, @Body() assignRolesDto: AssignRolesDto) {
    return this.usersService.assignRoles(+id, assignRolesDto);
  }

  @Get(':id')
  getAUser(@Param('id') id: string) {
    return this.usersService.getAUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.deleteAUser(+id);
  }
}
