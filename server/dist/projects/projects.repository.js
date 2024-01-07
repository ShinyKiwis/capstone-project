"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsRepository = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("./entities/project.entity");
const common_1 = require("@nestjs/common");
const project_status_enum_1 = require("./project-status.enum");
const requirements_repository_1 = require("./requirements.repository");
let ProjectsRepository = class ProjectsRepository extends typeorm_1.Repository {
    constructor(dataSource, requirementRepository) {
        super(project_entity_1.Project, dataSource.createEntityManager());
        this.dataSource = dataSource;
        this.requirementRepository = requirementRepository;
    }
    async createProject(createProjectDto) {
        const { name, stage, detail, semester, requirements, supervisors } = createProjectDto;
        const project = this.create({
            name,
            stage,
            detail,
            semester,
            supervisors,
            status: project_status_enum_1.ProjectStatus.WAITING_FOR_DEPARTMENT_HEAD,
        });
        await this.save(project);
        if (requirements) {
            for (const requirementDto of requirements) {
                await this.requirementRepository.createRequirement({
                    ...requirementDto,
                    projectCode: project.code,
                });
            }
        }
        return project;
    }
    async getProjects(filterDto) {
        const { search, members, limit, page } = filterDto;
        const query = this.createQueryBuilder('project')
            .leftJoinAndSelect('project.semester', 'semester')
            .leftJoinAndSelect('project.requirements', 'requirements')
            .leftJoinAndSelect('project.students', 'students')
            .leftJoinAndSelect('project.supervisors', 'supervisors')
            .loadRelationCountAndMap('project.studentsCount', 'project.students');
        if (members) {
        }
        if (search) {
            query.andWhere('LOWER(project.name) LIKE LOWER (:search)', {
                search: `%${search}%`,
            });
        }
        if (limit && page) {
            query.skip((page - 1) * limit).take(limit);
        }
        const [projects, count] = await query.getManyAndCount();
        return {
            total: Math.ceil(count / limit),
            current: +page,
            projects,
        };
    }
    async getProjectByCode(code) {
        const found = await this.findOne({
            where: { code },
            relations: { semester: true, supervisors: true, students: true },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Project with code "${code}" not found`);
        }
        return found;
    }
};
exports.ProjectsRepository = ProjectsRepository;
exports.ProjectsRepository = ProjectsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        requirements_repository_1.RequirementRepository])
], ProjectsRepository);
//# sourceMappingURL=projects.repository.js.map