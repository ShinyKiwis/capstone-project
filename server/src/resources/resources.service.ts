import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesRepository } from './resources.repository';
import { Resource } from './entities/resource.entity';

@Injectable()
export class ResourcesService {
  constructor(private resourcesRepository: ResourcesRepository) {}

  async createAResource(
    createResourceDto: CreateResourceDto,
  ): Promise<Resource> {
    return this.resourcesRepository.createResource(createResourceDto);
  }

  async getAllResources(): Promise<Resource[]> {
    return this.resourcesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} resource`;
  }

  update(id: number, updateResourceDto: UpdateResourceDto) {
    return `This action updates a #${id} resource`;
  }

  async deleteAResource(id: number): Promise<void> {
    const result = await this.resourcesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Resource with Id "${id}" not found`);
    }
  }
}
