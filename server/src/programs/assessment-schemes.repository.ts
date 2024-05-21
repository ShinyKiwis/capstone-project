import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VersionsRepository } from './versions.repository';
import { AssessmentScheme } from './entities/assessment-scheme.entity';
import { CreateAssessmentSchemeDto } from './dto/create-assessment-scheme.dto';
import { CriteriaRepository } from './criteria.repository';
import { AssessmentSchemesToPerformanceIndicatorsRepository } from './assessment-scheme-to-performance-indicator.repository';

@Injectable()
export class AssessmentSchemesRepository extends Repository<AssessmentScheme> {
  constructor(
    private dataSource: DataSource,
    private versionsRepository: VersionsRepository,
    private criterionRepository: CriteriaRepository,
    private assessmentSchemesToPerformanceIndicatorsRepository: AssessmentSchemesToPerformanceIndicatorsRepository
  ) {
    super(AssessmentScheme, dataSource.createEntityManager());
  }

  async createAssessmentScheme(
    programId: number,
    versionId: number,
    createAssessmentSchemeDto: CreateAssessmentSchemeDto,
  ) {
    const { name, generation, semester, description, criteria, performanceIndicators } = createAssessmentSchemeDto;
    const version = await this.versionsRepository.findOneBy({
      id: versionId,
      programId,
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    const assessmentScheme = this.create({
      version,
      name,
      description,
      semester,
      generation
    });

    await this.save(assessmentScheme);

    for (let criterion of criteria) {
      this.criterionRepository.createCriterion({assessmentScheme, ...criterion});
    }

    for (let performanceIndicator of performanceIndicators) {
      await this.assessmentSchemesToPerformanceIndicatorsRepository.createAssessmentSchemeToPerformanceIndicator({assessmentScheme, ...performanceIndicator})
    }
    return assessmentScheme;
  }

  async getAllAssessmentSchemes(
    programId: number,
    versionId: number,
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

    const assessmentSchemes = await this.find({
      where: {
        version
      },
    });
    return assessmentSchemes;
  }

  async getAnAssessmentSchemeOfAVersion(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
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
    const assessmentScheme = await this.findOne({
      where: {
        version,
        id: assessmentSchemeId,
      },
      // relations: {
      //   : true,
      // },
    });

    if (!assessmentScheme) {
      throw new NotFoundException(
        `Student Outcome with id ${assessmentSchemeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    return assessmentScheme;
  }
}
