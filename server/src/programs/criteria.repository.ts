import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Criterion } from './entities/criterion.entity';
import { CreateCriterionDto } from './dto/create-criterion.dto';
import { PerformanceIndicatorsRepository } from './performance-indicators.repository';
import { LevelsRepository } from './levels.repository';

@Injectable()
export class CriteriaRepository extends Repository<Criterion> {
  constructor(
    private dataSource: DataSource,
    private performanceIndicatorsRepository: PerformanceIndicatorsRepository,
    private levelsRepository: LevelsRepository
  ) {
    super(Criterion, dataSource.createEntityManager());
  }

  async createCriterion(
    createCriterionDto: CreateCriterionDto,
  ) {
    const { assessmentScheme, type, content, performanceIndicator, levels } = createCriterionDto;
    const PI = await this.performanceIndicatorsRepository.findOneBy(performanceIndicator);
    if (!PI) {
      throw new NotFoundException(
        `Performance Indicator not found`,
      );
    }

    const criterion = this.create({
      assessmentScheme,
      content,
      performanceIndicator: PI,
      type
    });

    await this.save(criterion);

    for(let level of levels) {
      await this.levelsRepository.createLevel({criterion, ...level})
    }

    return criterion;
  }
}
