import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VersionsRepository } from 'src/programs/versions.repository';
import { AssessmentScheme } from './entities/assessment-scheme.entity';
import { CreateAssessmentSchemeDto } from './dto/create-assessment-scheme.dto';

@Injectable()
export class AssessmentSchemesRepository extends Repository<AssessmentScheme> {
  constructor(
    private dataSource: DataSource,
    private versionsRepository: VersionsRepository,
  ) {
    super(AssessmentScheme, dataSource.createEntityManager());
  }

  async createAssessmentScheme(
    programId: number,
    versionId: number,
    createAssessmentSchemeDto: CreateAssessmentSchemeDto,
  ) {
    const { name, semester, description } = createAssessmentSchemeDto;
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
    });

    await this.save(assessmentScheme);
    return assessmentScheme;
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
