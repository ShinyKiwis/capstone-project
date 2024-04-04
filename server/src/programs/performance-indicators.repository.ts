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

  async createAPerformanceIndicator(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
    createPerformanceIndicatorDto: CreatePerformanceIndicatorDto,
  ) {
    const { code, name, description, expectedGoal, passingThreshold } =
      createPerformanceIndicatorDto;
    const studentOutcome = await this.studentOutcomesRepository.findOneBy({
      id: studentOutcomeId,
      versionId,
      versionProgramId: programId,
    });
    if (!studentOutcome) {
      throw new NotFoundException(
        `Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
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

  async getAPerformanceIndicatorOfAStudentOutcome(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
    performanceIndicatorId: number,
  ) {
    const studentOutcome = await this.studentOutcomesRepository.findOneBy({
      id: studentOutcomeId,
      versionId,
      versionProgramId: programId,
    });
    if (!studentOutcome) {
      throw new NotFoundException(
        `Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }
    const performanceIndicator = await this.findOne({
      where: {
        studentOutcome,
      },
    });

    if(!performanceIndicator) {
      throw new NotFoundException(
        `Performance Indicator with id ${performanceIndicatorId} of Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }
    return performanceIndicator;
  }
}