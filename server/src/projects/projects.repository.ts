import { DataSource, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './project-status.enum';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { RequirementRepository } from './requirements.repository';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProjectsRepository extends Repository<Project> {
  constructor(
    private dataSource: DataSource,
    private requirementRepository: RequirementRepository,
  ) {
    super(Project, dataSource.createEntityManager());
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, stage, detail, semester, requirements, supervisors } =
      createProjectDto;

    const project = this.create({
      name,
      stage,
      detail,
      semester,
      supervisors,
      status: ProjectStatus.WAITING_FOR_DEPARTMENT_HEAD,
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

  async getProjects(filterDto: GetProjectsFilterDto) {
    const { search, members, limit, page } = filterDto;
    const query = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.semester', 'semester')
      .leftJoinAndSelect('project.requirements', 'requirements')
      .leftJoinAndSelect('project.students', 'students')
      .leftJoinAndSelect('project.supervisors', 'supervisors')
      // .leftJoinAndSelect('students.userId', 'students')
      .loadRelationCountAndMap('project.studentsCount', 'project.students');

    if (members) {
      // query.andWhere('project.studentsCount = :members', {
      //   members,
      // });
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

  async getProjectByCode(code: number) {
    const found = await this.findOne({
      where: { code },
      relations: { semester: true, supervisors: true, students: true },
    });

    if (!found) {
      throw new NotFoundException(`Project with code "${code}" not found`);
    }
    return found;
  }
}
