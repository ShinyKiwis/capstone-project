import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Program } from './entities/program.entity';
import { CreateProgramDto } from './dto/create-program.dto';

@Injectable()
export class ProgramsRepository extends Repository<Program> {
  constructor(private dataSource: DataSource) {
    super(Program, dataSource.createEntityManager());
  }

  async getAllPrograms() {
    const programs = await this.find();
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
}
