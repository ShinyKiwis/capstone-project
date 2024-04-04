import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Version } from './entities/version.entity';
import { CreateVersionDto } from './dto/create-version.dto';
import { ProgramsRepository } from './programs.repository';

@Injectable()
export class VersionsRepository extends Repository<Version> {
  constructor(
    private dataSource: DataSource,
    private programsRepository: ProgramsRepository,
  ) {
    super(Version, dataSource.createEntityManager());
  }

  async getAllVersions() {
    const versions = await this.find();
    return versions;
  }

  async createAVersionForAProgram(
    programId: number,
    createVersionDto: CreateVersionDto,
  ) {
    const { name, startDate, endDate } = createVersionDto;
    const program = await this.programsRepository.findOneBy({ id: programId });
    if (!program) {
      throw new NotFoundException(
        `Program with id ${programId} does not exist`,
      );
    }
    const branch = this.create({
      name,
      startDate,
      endDate,
      program,
    });

    await this.save(branch);

    return branch;
  }

  async getAVersionOfAProgram(programId: number, versionid: number) {
    const program = await this.programsRepository.findOneBy({ id: programId });
    if (!program) {
      throw new NotFoundException(`Program with id ${programId} not found`);
    }
    const version = await this.findOne({
      where: {
        program,
        id: versionid,
      },
      relations: {
        studentOutcomes: true,
        // semesters: true,
      },
    });

    if (!version) {
      throw new NotFoundException(`Version with id ${versionid} not found`);
    }

    return version;
  }

  async getAllSemestersOfAVersion(id: number, programId: number) {
    const version = await this.findOneBy({
      id,
      programId,
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${id} of program with id ${programId} does not exist`,
      );
    }
    return;
  }
}
