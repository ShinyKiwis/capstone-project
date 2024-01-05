import { Injectable } from '@nestjs/common';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { Semester } from './entities/semester.entity';
import { SemestersRepository } from './semesters.repository';

@Injectable()
export class SemestersService {
  constructor(private semestersRepository: SemestersRepository) {}
  create(createSemesterDto: CreateSemesterDto) {
    const semester = new Semester(createSemesterDto);
    return this.semestersRepository.save(semester);
  }

  findAll() {
    return `This action returns all semesters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} semester`;
  }

  update(id: number, updateSemesterDto: UpdateSemesterDto) {
    return `This action updates a #${id} semester`;
  }

  remove(id: number) {
    return `This action removes a #${id} semester`;
  }
}
