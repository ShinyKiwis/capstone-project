import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AssessmentSchemeToPerformanceIndicator } from './entities/assessment-scheme-to-performance-indicator.entity';
import { CreateAssessmentSchemeToPerformanceIndicatorDto } from './dto/create-assessment-scheme-to-performance-indicator.dto';
import { PerformanceIndicatorsRepository } from './performance-indicators.repository';
import { UpdateAssessmentSchemeToPerformanceIndicatorDto } from './dto/update-assessment-scheme-to-performance-indicator.dto';
import { AssessmentScheme } from './entities/assessment-scheme.entity';

@Injectable()
export class AssessmentSchemesToPerformanceIndicatorsRepository extends Repository<AssessmentSchemeToPerformanceIndicator> {
  constructor(
    private dataSource: DataSource,
    private performanceIndicatorsRepository: PerformanceIndicatorsRepository
  ) {
    super(AssessmentSchemeToPerformanceIndicator, dataSource.createEntityManager());
  }

  async createAssessmentSchemeToPerformanceIndicator(
    createAssessmentSchemeToPerformanceIndicatorDto: CreateAssessmentSchemeToPerformanceIndicatorDto
  ) {
    const { performanceIndicator, assessmentScheme, passingGoal } = createAssessmentSchemeToPerformanceIndicatorDto;
    const PI = await this.performanceIndicatorsRepository.findOneBy(performanceIndicator);
    if (!PI) {
      throw new NotFoundException(
        `Performance Indicator not found`,
      );
    }

    const assessmentSchemeToPerformanceIndicator = this.create({
      assessmentScheme,
      performanceIndicator: PI,
      passingGoal
    });

    await this.save(assessmentSchemeToPerformanceIndicator);
    return assessmentSchemeToPerformanceIndicator;
  }

  async updateAssessmentSchemeToPerformanceIndicator(
    assessmentScheme: AssessmentScheme,
    updateAssessmentSchemeToPerformanceIndicatorDto: UpdateAssessmentSchemeToPerformanceIndicatorDto
  ) {
    const { performanceIndicator, passingGoal } = updateAssessmentSchemeToPerformanceIndicatorDto;

    const existingAssessmentSchemeToPerformanceIndicator = await this.findOneBy({
      assessmentScheme,
      performanceIndicator
    });
    if(!existingAssessmentSchemeToPerformanceIndicator) {
      await this.createAssessmentSchemeToPerformanceIndicator({
        performanceIndicator,
        assessmentScheme,
        passingGoal
      });
    } else {
      existingAssessmentSchemeToPerformanceIndicator.passingGoal = passingGoal;
      await this.save(existingAssessmentSchemeToPerformanceIndicator);
    }
  }
}
