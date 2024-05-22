import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Version } from './entities/version.entity';
import { CreateVersionDto } from './dto/create-version.dto';
import { ProgramsRepository } from './programs.repository';
import { UpdateVersionDto } from './dto/update-version.dto';
import { SemestersRepository } from 'src/semesters/semesters.repository';

@Injectable()
export class VersionsRepository extends Repository<Version> {
  constructor(
    private dataSource: DataSource,
    private programsRepository: ProgramsRepository,
    private semestersRepository: SemestersRepository,
  ) {
    super(Version, dataSource.createEntityManager());
  }

  async getAllVersions() {
    const versions = await this.find();
    return versions;
  }

  async createAVersionForAProgram(
    programId: number,
    createVersionDto: CreateVersionDto,
  ) {
    const { name, description, startDate, endDate } = createVersionDto;
    const program = await this.programsRepository.findOneBy({ id: programId });
    if (!program) {
      throw new NotFoundException(
        `Program with id ${programId} does not exist`,
      );
    }

    try {
      const version = this.create({
        name,
        description,
        startDate,
        endDate,
        program,
      });

      const start = new Date(startDate);
      const end = new Date(endDate);

      const startYear = start.getFullYear();
      const endYear = end.getFullYear();

      for (let i = startYear; i <= endYear; i++) {
        const semester1 = await this.semestersRepository.findOneBy({
          year: i,
          no: 1
        });

        if (!semester1) {
          const newSemester1 = this.semestersRepository.create({
            year: i,
            no: 1,
            start: new Date(i, 7, 15),
            end: new Date(i, 11, 31)
          });
          await this.semestersRepository.save(newSemester1);
        }

        const semester2 = await this.semestersRepository.findOneBy({
          year: i,
          no: 2
        });

        if (!semester2) {
          const newSemester2 = this.semestersRepository.create({
            year: i,
            no: 2,
            start: new Date(i + 1, 0, 1),
            end: new Date(i + 1, 5, 1)
          });
          await this.semestersRepository.save(newSemester2);
        }
      }

      await this.save(version);

      return version;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException("Version existed!");
    }
  }

  async getAVersionOfAProgram(programId: number, versionid: number) {
    const program = await this.programsRepository.findOneBy({ id: programId });
    if (!program) {
      throw new NotFoundException(`Program with id ${programId} not found`);
    }
    const version = await this.findOne({
      where: {
        program,
        id: versionid,
      },
      relations: {
        studentOutcomes: true,
        program: false,
        programEducationObjectives: true
        // semesters: true,
      },
    });

    if (!version) {
      throw new NotFoundException(`Version with id ${versionid} not found`);
    }

    return version;
  }

  async getAllSemestersOfAVersion(id: number, programId: number) {
    const version = await this.findOneBy({
      id,
      programId,
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${id} of program with id ${programId} does not exist`,
      );
    }
    return;
  }

  async updateAVersion(programId: number, versionId: number, updateVersionDto: UpdateVersionDto) {
    const { name, description, startDate, endDate } = updateVersionDto;
    const version = await this.findOneBy({
      programId,
      id: versionId
    });
    if (!version) {
      throw new NotFoundException(
        `Version with id ${versionId} of program with id ${programId} does not exist`,
      );
    }
    if (name) {
      version.name = name;
    }

    if (description) {
      version.description = description;
    }

    if (startDate) {
      version.startDate = startDate;
    }

    if (endDate) {
      version.endDate = endDate;
    }

    await this.save(version);

    return version;
  }
}
