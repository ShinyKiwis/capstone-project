import { Injectable } from '@nestjs/common';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { RegistrationsRepository } from './registrations.repository';

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly registrationsRepository: RegistrationsRepository,
  ) {}

  create(createRegistrationDto: CreateRegistrationDto) {
    return this.registrationsRepository.createRegistration(
      createRegistrationDto,
    );
  }

  findAll() {
    return this.registrationsRepository.find({ relations: { semester: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
