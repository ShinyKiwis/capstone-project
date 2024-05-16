import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { CreateLevelDto } from './dto/create-level.dto';

@Injectable()
export class LevelsRepository extends Repository<Level> {
  constructor(
    private dataSource: DataSource,
  ) {
    super(Level, dataSource.createEntityManager());
  }

  async createLevel(
    CreateLevelDto: CreateLevelDto
  ) {
    const { criterion, content, maxScore, minScore } = CreateLevelDto;

    const level = this.create({
      criterion,
      content,
      maxScore,
      minScore
    });

    await this.save(level);
    return level;
  }
}
