import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VersionsRepository } from './versions.repository';
import { UpdateStudentOutcomeDto } from './dto/update-student-outcome.dto';
import { ProgramEducationObjective } from './entities/program-education-objectives.entity';
import { CreateProgramEducationObjectiveDto } from './dto/create-program-education-objective.dto';
import { UpdateProgramEducationObjectiveDto } from './dto/update-program-education-objective.dto';

@Injectable()
export class ProgramEducationObjectivesRepository extends Repository<ProgramEducationObjective> {
  constructor(
    private dataSource: DataSource,
    private versionsRepository: VersionsRepository,
  ) {
    super(ProgramEducationObjective, dataSource.createEntityManager());
  }

  async createProgramEducationObjective(
    programId: number,
    versionId: number,
    createProgramEducationDto: CreateProgramEducationObjectiveDto,
  ) {
    const { name, description } =
      createProgramEducationDto;
    const version = await this.versionsRepository.findOneBy({
      id: versionId,
      programId,
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${versionId} of program with id ${programId} not found`,
      );
    }
    const studentOutcome = this.create({
      version,
      name,
      description,
    });

    await this.save(studentOutcome);
    return studentOutcome;
  }

  async getAllProgramEducationObjectiveOfAVersion(
    programId: number,
    versionId: number
  ) {
    const version = await this.versionsRepository.findOneBy({
      id: versionId,
      programId,
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    const programEducationObjectives = await this.find({
      where: {
        version
      },
      select: {
        id: true,
        name: true,
        description: true,
        versionId: true,
        versionProgramId: true
      }
    });
    return programEducationObjectives;
  }

  async getAProgramEducationObjective(
    programId: number,
    versionId: number,
    programEducationObjectiveId: number,
  ) {
    const version = await this.versionsRepository.findOneBy({
      id: versionId,
      programId,
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${versionId} of program with id ${programId} not found`,
      );
    }
    const programEducationObjective = await this.findOne({
      where: {
        version,
        id: programEducationObjectiveId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        versionId: true,
        versionProgramId: true
      }
    });

    if (!programEducationObjective) {
      throw new NotFoundException(
        `Program Education Objective with id ${programEducationObjectiveId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    return programEducationObjective;
  }

  async updateAProgramEducationObjective(
    programId: number,
    versionId: number,
    programEducationObjectiveId: number,
    updateProgramEducationObjectiveDto: UpdateProgramEducationObjectiveDto
  ) {
    const { name, description } = updateProgramEducationObjectiveDto;
    const programEducationObjective = await this.findOneBy({
      versionProgramId: programId,
      versionId,
      id: programEducationObjectiveId
    });

    if (!programEducationObjective) {
      throw new NotFoundException(
        `Program Education Objective with id ${programEducationObjectiveId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    if (name) programEducationObjective.name = name;
    if (description) programEducationObjective.description = description;

    await this.save(programEducationObjective);

    return programEducationObjective;
  }
}
