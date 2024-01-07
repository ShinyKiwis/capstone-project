import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    createAResource(createResourceDto: CreateResourceDto): Promise<import("./entities/resource.entity").Resource>;
    getAllResources(): Promise<import("./entities/resource.entity").Resource[]>;
    findOne(id: string): string;
    update(id: string, updateResourceDto: UpdateResourceDto): string;
    deleteAResource(id: string): Promise<void>;
}
