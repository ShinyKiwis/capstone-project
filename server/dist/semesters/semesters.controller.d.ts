import { SemestersService } from './semesters.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
export declare class SemestersController {
    private readonly semestersService;
    constructor(semestersService: SemestersService);
    create(createSemesterDto: CreateSemesterDto): Promise<import("./entities/semester.entity").Semester>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSemesterDto: UpdateSemesterDto): string;
    remove(id: string): string;
}
