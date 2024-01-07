import { DataSource, Repository } from 'typeorm';
import { Semester } from './entities/semester.entity';
export declare class SemestersRepository extends Repository<Semester> {
    private dataSource;
    constructor(dataSource: DataSource);
}
