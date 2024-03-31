import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Branch } from "./entities/branch.entity";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { Version } from "./entities/version.entity";
import { CreateVersionDto } from "./dto/create-version.dto";
import { ProgramsRepository } from "./programs.repository";

@Injectable()
export class VersionsRepository extends Repository<Version> {
  constructor(private dataSource: DataSource, private programsRepository: ProgramsRepository) {
    super(Version, dataSource.createEntityManager());
  }

  async getAllVersions() {
    const versions = await this.find();
    return versions;
  }

  async createAVersion(id: number, createVersionDto: CreateVersionDto) {
    const { name, startDate, endDate } = createVersionDto;
    const program = await this.programsRepository.findOneBy({id: id});
    if(!program) {
      throw new NotFoundException(`Program with id ${id} does not exist`);
    }
    const branch = this.create({
      name,
      startDate,
      endDate,
      program
    });

    await this.save(branch);

    return branch;
  }

  async getAllVersionsOfAProgram(id: number) {
    const program = await this.programsRepository.findOneBy({id: id});
    if(!program) {
      throw new NotFoundException(`Program with id ${id} does not exist`);
    }
    const versions = await this.findBy({
      program
    });

    return versions;
  }
}