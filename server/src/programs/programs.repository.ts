import { Injectable } from '@nestjs/common';
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
    const { name, major } = createMajorDto;
    const program = this.create({
      name,
      major,
    });

    await this.save(program);

    return program;
  }
}
