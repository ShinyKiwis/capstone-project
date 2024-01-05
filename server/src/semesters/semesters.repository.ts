import { DataSource, Repository } from 'typeorm';
import { Semester } from './entities/semester.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SemestersRepository extends Repository<Semester> {
  constructor(private dataSource: DataSource) {
    super(Semester, dataSource.createEntityManager());
  }
}
