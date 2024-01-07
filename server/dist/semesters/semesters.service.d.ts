import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { Semester } from './entities/semester.entity';
import { SemestersRepository } from './semesters.repository';
export declare class SemestersService {
    private semestersRepository;
    constructor(semestersRepository: SemestersRepository);
    create(createSemesterDto: CreateSemesterDto): Promise<Semester>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSemesterDto: UpdateSemesterDto): string;
    remove(id: number): string;
}
