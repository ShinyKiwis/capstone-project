import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentOutcomeDto } from './dto/create-student-outcome.dto';
import { VersionsRepository } from 'src/programs/versions.repository';
import { PerformanceIndicator } from './entities/performance-indicator.entity';
import { CreatePerformanceIndicatorDto } from './dto/create-performance-indicator.dto';
import { StudentOutcomesRepository } from './student-outcomes.repository';
import { UpdatePerformanceIndicatorDto } from './dto/update-performance-indicator.dto';

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
    const { name, description, expectedGoal, passingThreshold } =
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
      select: {
        id: true,
        studentOutcomeVersionId: true,
        studentOutcomeVersionProgramId: true,
        studentOutcomeId: true,
        code: true,
        description: true,
      }
    });

    if(!performanceIndicator) {
      throw new NotFoundException(
        `Performance Indicator with id ${performanceIndicatorId} of Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }
    return performanceIndicator;
  }

  async updateAPerformanceIndicator(
    programId: number,
    versionId: number,
    studentOutcomeId: number,
    performanceIndicatorId: number,
    updatePerformanceIndicatorDto: UpdatePerformanceIndicatorDto
  ) {
    const { name, description, expectedGoal, passingThreshold } = updatePerformanceIndicatorDto;
    const performanceIndicator = await this.findOneBy({
      studentOutcomeVersionProgramId: programId,
      studentOutcomeVersionId: versionId,
      studentOutcomeId,
      id: performanceIndicatorId
    });
    if(!performanceIndicator) {
      throw new NotFoundException(
        `Performance Indicator with id ${performanceIndicatorId} of Student Outcome with id ${studentOutcomeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    if(name) performanceIndicator.name = name;
    if(description) performanceIndicator.description = description;
    if(expectedGoal) performanceIndicator.expectedGoal = expectedGoal;
    if(passingThreshold) performanceIndicator.passingThreshold = passingThreshold

    await this.save(performanceIndicator);

    return performanceIndicator;
  }
}
