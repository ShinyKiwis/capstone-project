import { DataSource, Repository } from 'typeorm';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementDto } from './dto/create-requirement.dto';
export declare class RequirementRepository extends Repository<Requirement> {
    private dataSource;
    constructor(dataSource: DataSource);
    createRequirement(createRequirementDto: CreateRequirementDto): Promise<Requirement>;
}
