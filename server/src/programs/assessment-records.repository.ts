import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CriteriaRepository } from './criteria.repository';
import { AssessmentRecord } from './entities/assessment-record.entity';
import { CreateAssessmentRecordDto } from './dto/create-assessment-record.dto';
import { CreateAssessmentRecordsDto } from './dto/create-assessment-records.dto';
import { ProjectsRepository } from 'src/projects/projects.repository';

@Injectable()
export class AssessmentRecordsRepository extends Repository<AssessmentRecord> {
  constructor(
    private dataSource: DataSource,
    private criterionRepository: CriteriaRepository,
    private projectsRepository: ProjectsRepository,
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

        const assessmentRecord = this.create({
          criterion,
          answer: record.answer,
          user: { id: record.userId },
          project,
        });

        await this.save(assessmentRecord);
      }
    }
  }

  async getAllAssessmentRecords(
    programId: number,
    versionId: number,
    assessmentSchemeId: number,
    criterionId: number,
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

    const assessmentRecords = await this.find({
      where: {
        criterion
      },
    });

    return assessmentRecords;
  }
}
