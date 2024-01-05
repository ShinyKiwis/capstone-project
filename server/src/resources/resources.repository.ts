import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesRepository extends Repository<Resource> {
  constructor(private dataSource: DataSource) {
    super(Resource, dataSource.createEntityManager());
  }

  async createResource(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    const { name } = createResourceDto;
    const resource = this.create({
      name,
    });

    await this.save(resource);

    return resource;
  }
}
