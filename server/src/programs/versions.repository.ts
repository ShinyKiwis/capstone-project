import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { Version } from './entities/version.entity';
import { CreateVersionDto } from './dto/create-version.dto';
import { ProgramsRepository } from './programs.repository';
import { UpdateVersionDto } from './dto/update-version.dto';

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
    const { name, description, startDate, endDate } = createVersionDto;
    const program = await this.programsRepository.findOneBy({ id: programId });
    if (!program) {
      throw new NotFoundException(
        `Program with id ${programId} does not exist`,
      );
    }
    const branch = this.create({
      name,
      description,
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
        program: false,
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

  async updateAVersion(programId: number, versionId: number, updateVersionDto: UpdateVersionDto) {
    const { name, description, startDate, endDate } = updateVersionDto;
    const version = await this.findOneBy({
      programId,
      id: versionId
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${versionId} of program with id ${programId} does not exist`,
      );
    }
    if (name) {
      version.name = name;
    }

    if (description) {
      version.description = description;
    }

    if (startDate) {
      version.startDate = startDate;
    }

    if (endDate) {
      version.endDate = endDate;
    }

    await this.save(version);

    return version;
  }
}
