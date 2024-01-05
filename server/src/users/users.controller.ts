import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { EnrollProjectDto } from './dto/enroll-project.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createAUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAUser(createUserDto);
  }

  @Post('/student')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.usersService.createAStudentUser(createStudentDto);
  }

  @Post('/student/enroll')
  enrollToAProject(@Body() enrollProjectDto: EnrollProjectDto) {
    return this.usersService.enrollToAProject(enrollProjectDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
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
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
