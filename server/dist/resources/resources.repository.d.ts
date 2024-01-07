import { Repository, DataSource } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { Resource } from './entities/resource.entity';
export declare class ResourcesRepository extends Repository<Resource> {
    private dataSource;
    constructor(dataSource: DataSource);
    createResource(createResourceDto: CreateResourceDto): Promise<Resource>;
}
