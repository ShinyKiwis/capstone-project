import { Injectable } from '@nestjs/common';
import { BranchesRepository } from './branches.repository';
import { MajorsRepository } from './majors.repository';
import { CreateMajorDto } from './dto/create-major.dto';
import { CreateBranchDto } from './dto/create-branch.dto';

@Injectable()
export class ProgramsService {
  constructor(private branchesRepository: BranchesRepository, private majorsRepository: MajorsRepository) {}

  async createAMajor(createMajorDto: CreateMajorDto) {
    return this.majorsRepository.createAMajor(createMajorDto);
  }

  async createABranch(createBranchDto: CreateBranchDto) {
    return this.branchesRepository.createABranch(createBranchDto);
  }
}
