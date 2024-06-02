import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VersionsRepository } from './versions.repository';
import { AssessmentScheme } from './entities/assessment-scheme.entity';
import { CreateAssessmentSchemeDto } from './dto/create-assessment-scheme.dto';
import { CriteriaRepository } from './criteria.repository';
import { AssessmentSchemesToPerformanceIndicatorsRepository } from './assessment-scheme-to-performance-indicator.repository';
import { SemestersRepository } from 'src/semesters/semesters.repository';
import { UpdateAssessmentSchemeDto } from './dto/update-assessment-scheme.dto';

@Injectable()
export class AssessmentSchemesRepository extends Repository<AssessmentScheme> {
  constructor(
    private dataSource: DataSource,
    private versionsRepository: VersionsRepository,
    private criterionRepository: CriteriaRepository,
    private assessmentSchemesToPerformanceIndicatorsRepository: AssessmentSchemesToPerformanceIndicatorsRepository,
    private semestersRepository: SemestersRepository
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
      this.criterionRepository.createCriterion({ assessmentScheme, ...criterion });
    }

    for (let performanceIndicator of performanceIndicators) {
      await this.assessmentSchemesToPerformanceIndicatorsRepository.createAssessmentSchemeToPerformanceIndicator({ assessmentScheme, ...performanceIndicator })
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
      }
    });
    return assessmentSchemes;
  }

  async getAnAssessmentScheme(
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

    // const query = this.createQueryBuilder('assessmentScheme').leftJoinAndSelect('assessmentScheme.criteria', 'criteria').leftJoinAndSelect('assessmentScheme.version', 'version').where('assessmentScheme.id = :assessmentSchemeId', {assessmentSchemeId});

    // const assessmentScheme = await query.getMany();


    const assessmentScheme = await this.findOne({
      where: {
        version,
        id: assessmentSchemeId,
      },
      relations: {
        criteria: {
          levels: true,
          records: true
        },
        performanceIndicators: true
      },
      order: {
        criteria: {
          id: 'ASC',
          records: {
            criterionId: 'ASC',
            id: 'ASC'
          },
          levels: {
            id: 'ASC'
          }
        }
      }
      // relations: {
      //   : true,
      // },
    });

    if (!assessmentScheme) {
      throw new NotFoundException(
        `Student Outcome with id ${assessmentSchemeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    const records = [];

    for (let criterion of assessmentScheme.criteria) {
      const criterionRecords = criterion.records;
      records.push(...criterionRecords);
    }

    return { ...assessmentScheme, records };
  }

  async duplicateAssessmentScheme(
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
      relations: {
        criteria: true,
        performanceIndicators: true
      },
    });

    if (!assessmentScheme) {
      throw new NotFoundException(
        `Student Outcome with id ${assessmentSchemeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    const newAssessmentScheme = this.create({
      version,
      name: assessmentScheme.name + ' (Copy)',
      description: assessmentScheme.description,
      semester: assessmentScheme.semester,
      generation: assessmentScheme.generation
    });

    await this.save(newAssessmentScheme);

    for (let criterion of assessmentScheme.criteria) {
      const { id, ...criterionData } = criterion;
      this.criterionRepository.createCriterion({ assessmentScheme: newAssessmentScheme, ...criterionData });
    }

    for (let performanceIndicator of assessmentScheme.performanceIndicators) {
      await this.assessmentSchemesToPerformanceIndicatorsRepository.createAssessmentSchemeToPerformanceIndicator({ assessmentScheme: newAssessmentScheme, ...performanceIndicator })
    }
    return newAssessmentScheme;
  }

  async updateAssessmentScheme(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
    updateAssessmentSchemeDto: UpdateAssessmentSchemeDto,
  ) {
    const { name, generation, semester, description, criteria, performanceIndicators } = updateAssessmentSchemeDto;
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
      relations: {
        criteria: true,
        performanceIndicators: true
      },
    });

    if (!assessmentScheme) {
      throw new NotFoundException(
        `Student Outcome with id ${assessmentSchemeId} of version with id ${versionId} of program with id ${programId} not found`,
      );
    }

    const newSemester = await this.semestersRepository.findOneBy(semester);

    assessmentScheme.name = name;
    assessmentScheme.generation = generation;
    assessmentScheme.semester = newSemester;
    assessmentScheme.description = description;

    await this.save(assessmentScheme);

    for (let criterion of criteria) {
      if (criterion.id) {
        const existingCriterion = assessmentScheme.criteria.find(c => c.id === criterion.id);
        if (existingCriterion) {
          this.criterionRepository.updateCriterion(assessmentScheme ,criterion.id, criterion);
        }
      } else {
        this.criterionRepository.createCriterion({ assessmentScheme, ...criterion });
      }
    }

    for (let performanceIndicator of performanceIndicators) {
      await this.assessmentSchemesToPerformanceIndicatorsRepository.updateAssessmentSchemeToPerformanceIndicator(assessmentScheme, performanceIndicator)
    }

    return assessmentScheme;
  }
}
