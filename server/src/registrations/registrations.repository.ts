import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { SemestersRepository } from 'src/semesters/semesters.repository';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationsRepository extends Repository<Registration> {
  constructor(private dataSource: DataSource, private semestersRepository: SemestersRepository) {
    super(Registration, dataSource.createEntityManager());
  }

  async createRegistration(createRequirementDto: CreateRegistrationDto) {
    const { semester, name, startDate, endDate } = createRequirementDto;
    const requirement = this.create({
      semester,
      name,
      startDate,
      endDate
    });

    await this.save(requirement);
    return requirement;
  }

  async updateRegistration(id: number, updateRequirementDto: UpdateRegistrationDto) {
    const { semester, name, startDate, endDate } = updateRequirementDto;
    const requirement = await this.findOneBy({id});
    const getSemester = await this.semestersRepository.findOneBy(semester);
    requirement.semester = getSemester;
    requirement.startDate = startDate;
    requirement.endDate = endDate;
    requirement.name = name;

    await this.save(requirement);
    return requirement;
  }
}
