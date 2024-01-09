import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Major } from "./entities/major.entity";
import { CreateMajorDto } from "./dto/create-major.dto";

@Injectable()
export class MajorsRepository extends Repository<Major> {
  constructor(private dataSource: DataSource) {
    super(Major, dataSource.createEntityManager());
  }

  async getAllMajors() {
    const majors = await this.find();
    return majors;
  }

  async createAMajor(createMajorDto: CreateMajorDto) {
    const { name } = createMajorDto;
    const major = this.create({
      name
    });

    await this.save(major);

    return major;
  }
}