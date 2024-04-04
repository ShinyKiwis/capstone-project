import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';

@Injectable()
export class RegistrationsRepository extends Repository<Registration> {
  constructor(private dataSource: DataSource) {
    super(Registration, dataSource.createEntityManager());
  }

  async createRegistration(createRequirementDto: CreateRegistrationDto) {
    const { semester, startDate, endDate } = createRequirementDto;
    const requirement = this.create({
      semester,
      startDate,
      endDate
    });

    await this.save(requirement);
    return requirement;
  }
}
