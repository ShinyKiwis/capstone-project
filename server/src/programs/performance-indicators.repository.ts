import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { VersionsRepository } from 'src/programs/versions.repository';
import { PerformanceIndicator } from './entities/performance-indicator.entity';
import { CreatePerformanceIndicatorDto } from './dto/create-performance-indicator.dto';
import { StudentOutcomesRepository } from './student-outcomes.repository';

@Injectable()
export class PerformanceIndicatorsRepository extends Repository<PerformanceIndicator> {
  constructor(
    private dataSource: DataSource,
    private studentOutcomesRepository: StudentOutcomesRepository,
  ) {
    super(PerformanceIndicator, dataSource.createEntityManager());
  }

  async createAPerformanceIndicator(studentOutcomeId: number, versionId: number, programId: number, createPerformanceIndicatorDto: CreatePerformanceIndicatorDto) {
    const { code, name, description, expectedGoal, passingThreshold } =
      createPerformanceIndicatorDto;
    const studentOutcome = await this.studentOutcomesRepository.findOneBy({
      id: studentOutcomeId,
      versionId,
      versionProgramId: programId
    });
    if (!studentOutcome) {
      throw new NotFoundException(
        `Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} does not exist`,
      );
    }
    const performanceIndicator = this.create({
      code,
      studentOutcome,
      name,
      description,
      expectedGoal,
      passingThreshold,
    });

    await this.save(performanceIndicator);
    return performanceIndicator;
  }

  async getAllPerformanceIndicatorsOfAStudentOutcome(studentOutcomeId: number, versionId: number, programId: number) {
    const studentOutcome = await this.studentOutcomesRepository.findOneBy({
      id: studentOutcomeId,
      versionId,
      versionProgramId: programId
    });
    if (!studentOutcome) {
      throw new NotFoundException(
        `Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} does not exist`,
      );
    }
    const performanceIndicators = await this.findBy({
      studentOutcome
    });
    return performanceIndicators;
  }
}
