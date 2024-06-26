import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CriteriaRepository } from './criteria.repository';
import { AssessmentRecord } from './entities/assessment-record.entity';
import { CreateAssessmentRecordDto } from './dto/create-assessment-record.dto';
import { CreateAssessmentRecordsDto } from './dto/create-assessment-records.dto';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { GetAssessmentRecordsFilterDto } from './dto/get-assessment-records-filter.dto';
import { AssessmentSchemesRepository } from './assessment-schemes.repository';

@Injectable()
export class AssessmentRecordsRepository extends Repository<AssessmentRecord> {
  constructor(
    private dataSource: DataSource,
    private criterionRepository: CriteriaRepository,
    private projectsRepository: ProjectsRepository,
    private assessmentSchemesRepository: AssessmentSchemesRepository
  ) {
    super(AssessmentRecord, dataSource.createEntityManager());
  }

  async createAssessmentRecords(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
    createAssessmentRecordsDto: CreateAssessmentRecordsDto,
  ) {
    const { records } = createAssessmentRecordsDto;
    // const version = await this.versionsRepository.findOneBy({
    //   id: versionId,
    //   programId,
    // });
    const createdRecords = [];

    for (let record of records) {
      const criterion = await this.criterionRepository.findOneBy({
        id: record.criterionId,
        assessmentSchemeId,
        assessmentSchemeVersionId: versionId,
        assessmentSchemeVersionProgramId: programId,
      });

      if (!criterion) {
        throw new NotFoundException(
          `Criterion not found`,
        );
      }
      let project = null;

      if (record.projectId) {
        project = await this.projectsRepository.findOneBy({
          code: record.projectId,
        });

        if (!project) {
          throw new NotFoundException(
            `Project not found`,
          );
        }
      }

      const assessmentRecord = this.create({
        criterion,
        answer: record.answer,
        user: { id: record.userId },
        score: record.score,
        project,
      });

      createdRecords.push(assessmentRecord);

      await this.save(assessmentRecord);
    }

    return createdRecords;
  }

  async getAllAssessmentRecords(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
    criterionId: number,
    getAssessmentRecordsFilterDto: GetAssessmentRecordsFilterDto
  ) {
    const criterion = await this.criterionRepository.findOneBy({
      id: criterionId,
      assessmentSchemeId,
      assessmentSchemeVersionId: versionId,
      assessmentSchemeVersionProgramId: programId,
    });

    if (!criterion) {
      throw new NotFoundException(
        `Criterion not found`,
      );
    }

    const { projectId, userId } = getAssessmentRecordsFilterDto;

    // const assessmentRecords = await this.find({
    //   where: {
    //     criterion
    //   },
    // });

    const search = {}

    if (projectId) {
      search['project'] = { code: projectId };
    }

    if (userId) {
      search['user'] = { id: userId };
    }

    const assessmentRecords = await this.find({
      where: {
        criterion,
        ...search
      },
    });

    return assessmentRecords;
  }

  async getAssessmentRecordsOfAScheme(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
    getAssessmentRecordsFilterDto: GetAssessmentRecordsFilterDto
  ) {
    const { projectId, userId } = getAssessmentRecordsFilterDto;

    const assessmentScheme = await this.assessmentSchemesRepository.findOneBy({
      id: assessmentSchemeId,
      versionId,
      versionProgramId: programId,
    });

    if (!assessmentScheme) {
      throw new NotFoundException(
        `Assessment Scheme not found`,
      );
    }

    const search = {}

    search['project'] = { code: projectId };
    search['user'] = { id: userId };

    const assessmentRecords = await this.find({
      where: {
        criterion: {
          assessmentScheme,
        },
        ...search
      },
      order: {
        criterionId: 'ASC',
        id: 'ASC',
      }
    });

    return assessmentRecords;
  }

  async deleteAnAssessmentRecord(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
    criterionId: number,
    assessmentRecordId: number,
  ) {
    const criterion = await this.criterionRepository.findOneBy({
      id: criterionId,
      assessmentSchemeId,
      assessmentSchemeVersionId: versionId,
      assessmentSchemeVersionProgramId: programId,
    });

    if (!criterion) {
      throw new NotFoundException(
        `Criterion not found`,
      );
    }

    const assessmentRecord = await this.findOneBy({
      id: assessmentRecordId,
      criterion,
    });

    if (!assessmentRecord) {
      throw new NotFoundException(
        `Assessment Record not found`,
      );
    }

    await this.delete(assessmentRecord);
  }
}
