import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { VersionsRepository } from 'src/programs/versions.repository';
import { StudentOutcome } from './entities/student-outcome.entity';

@Injectable()
export class StudentOutcomesRepository extends Repository<StudentOutcome> {
  constructor(
    private dataSource: DataSource,
    private versionsRepository: VersionsRepository,
  ) {
    super(StudentOutcome, dataSource.createEntityManager());
  }

  async createStudentOutcome(
    programId: number,
    versionId: number,
    createStudentOutcomeDto: CreateStudentOutcomeDto,
  ) {
    const { code, name, description, expectedGoal, passingThreshold } =
      createStudentOutcomeDto;
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
      code,
      version,
      name,
      description,
      expectedGoal,
      passingThreshold,
    });

    await this.save(studentOutcome);
    return studentOutcome;
  }

  async getAStudentOutcomeOfAVersion(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
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
    const studentOutcome = await this.findOne({
      where: {
        version,
        id: studentOutcomeId,
      },
      relations: {
        performanceIndicators: true,
      },
    });

    if (!studentOutcome) {
      throw new NotFoundException(
        `Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    return studentOutcome;
  }
}
