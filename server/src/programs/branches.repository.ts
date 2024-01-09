import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Branch } from "./entities/branch.entity";
import { CreateBranchDto } from "./dto/create-branch.dto";

@Injectable()
export class BranchesRepository extends Repository<Branch> {
  constructor(private dataSource: DataSource) {
    super(Branch, dataSource.createEntityManager());
  }

  async getAllBranches() {
    const branches = await this.find();
    return branches;
  }

  async createABranch(createBranchDto: CreateBranchDto) {
    const { name } = createBranchDto;
    const branch = this.create({
      name
    });

    await this.save(branch);

    return branch;
  }
}