import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Requirement } from './entities/requirement.entity';
import { CreateRequirementDto } from './dto/create-requirement.dto';

@Injectable()
export class RequirementRepository extends Repository<Requirement> {
  constructor(private dataSource: DataSource) {
    super(Requirement, dataSource.createEntityManager());
  }

  async createRequirement(createRequirementDto: CreateRequirementDto) {
    const { projectCode, attribute, operator, value } = createRequirementDto;
    const requirement = this.create({
      projectCode,
      attribute,
      operator,
      value,
    });

    await this.save(requirement);
    return requirement;
  }
}
