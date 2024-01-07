import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourcesRepository } from './resources.repository';
import { Resource } from './entities/resource.entity';
export declare class ResourcesService {
    private resourcesRepository;
    constructor(resourcesRepository: ResourcesRepository);
    createAResource(createResourceDto: CreateResourceDto): Promise<Resource>;
    getAllResources(): Promise<Resource[]>;
    findOne(id: number): string;
    update(id: number, updateResourceDto: UpdateResourceDto): string;
    deleteAResource(id: number): Promise<void>;
}
