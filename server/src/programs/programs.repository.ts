import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';

@Injectable()
export class ProgramsRepository extends Repository<Program> {
  constructor(private dataSource: DataSource) {
    super(Program, dataSource.createEntityManager());
  }

  async getAllPrograms() {
    const programs = await this.find({
      relations: {
        versions: true
      }
    });
    return programs;
  }

  async createAProgram(createMajorDto: CreateProgramDto) {
    const { name, major, description } = createMajorDto;
    const program = this.create({
      name,
      major,
      description
    });

    await this.save(program);

    return program;
  }

  async getAProgram(id: number) {
    const program = this.findOne({
      where: { id },
      relations: {
        versions: true,
      },
    });
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
    return program;
  }

  async updateAProgram(id: number, updateProgramDto: UpdateProgramDto) {
    const { name, major, description } = updateProgramDto;
    const program = await this.findOne({
      where: {
        id
      },
      relations: {
        versions: true
      }
    });
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }

    program.name = name;
    program.major = major;
    if (description) {
      program.description = description;
    }

    await this.save(program);
    return program
  }
}
