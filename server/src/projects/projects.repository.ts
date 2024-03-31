import { DataSource, In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectStatus } from './project-status.enum';
import { GetProjectsFilterDto } from './dto/get-projects-filter.dto';
import { RequirementRepository } from './requirements.repository';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UsersRepository } from '../users/users.repository';
import { BranchesRepository } from '../programs/branches.repository';
import { GetProjectsByStatusDto } from './dto/get-projects-by-status.dto';
import { ApproveProjectDto } from './dto/approve-project.dto';
import { RejectProjectDto } from './dto/reject-project.dto';
import { ApproveProjectsDto } from './dto/approve-projects.dto';
import { StudentsRepository } from 'src/students/students.repository';
import { CreateProjectFromFileDto } from './dto/create-project-from-file.dto';
import { ProgramsRepository } from 'src/programs/programs.repository';

@Injectable()
export class ProjectsRepository extends Repository<Project> {
  constructor(
    private dataSource: DataSource,
    private requirementRepository: RequirementRepository,
    private usersRepository: UsersRepository,
    private branchesRepository: BranchesRepository,
    private programsRepository: ProgramsRepository,
    @Inject(forwardRef(() => StudentsRepository))
    private studentsRepository: StudentsRepository,
  ) {
    super(Project, dataSource.createEntityManager());
  }

  async createProjectFromFile(
    createProjectFromFileDto: CreateProjectFromFileDto,
  ): Promise<Project> {
    const {
      name,
      branch,
      description,
      emails,
      instructors,
      limit,
      program,
      references,
      students,
      tasks,
    } = createProjectFromFileDto;

    let retrieveBranch = await this.branchesRepository.findOneBy({
      name: branch,
    });

    if (!retrieveBranch) {
      throw new NotFoundException(`${branch} does not exist`);
    }

    let retrieveProgram = await this.programsRepository.findOneBy({
      name: program,
    });
    if (!retrieveProgram) {
      throw new NotFoundException(`${program} does not exist`);
    }

    let retrieveInstructors = [];
    for (let email in emails) {
      if (emails[email] !== '') {
        let retrieveInstructor = await this.usersRepository.findOneBy({
          email: emails[email],
        });
        if (retrieveInstructor) retrieveInstructors.push(retrieveInstructor);
      }
    }

    let retrieveStudents = [];
    for (let student of students) {
      let retrieveStudent = await this.usersRepository.findOneBy({
        id: +student.studentID,
      });
      if (retrieveStudent) retrieveStudents.push(retrieveStudent);
    }
    console.log(retrieveInstructors);

    return this.createProject({
      name,
      stage: 1,
      description,
      tasks,
      references,
      registration: {
        semester: {
          year: 2023,
          no: 1,
        },
        id: 1,
      },
      students: retrieveStudents,
      supervisors: retrieveInstructors,
      programs: [retrieveProgram],
      owner: retrieveInstructors[0],
      branches: [retrieveBranch],
      limit,
      status: ProjectStatus.WAITING_FOR_DEPARTMENT_HEAD,
      requirements: null,
    });
  }

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const {
      name,
      stage,
      description,
      tasks,
      references,
      registration,
      students,
      requirements,
      supervisors,
      owner,
      programs,
      branches,
      limit,
      status,
    } = createProjectDto;

    const project = this.create({
      name,
      stage,
      description,
      tasks,
      references,
      registration,
      students,
      supervisors,
      programs,
      owner,
      branches,
      limit,
      status,
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

  async updateAProject(id: number, updateProjectDto: UpdateProjectDto) {
    const {
      name,
      description,
      tasks,
      status,
      references,
      stage,
      supervisors,
      students,
      programs,
      branches,
      limit,
    } = updateProjectDto;

    const project = await this.findOneBy({
      code: id,
    });

    // const query = this.createQueryBuilder('project').update().set({
    //   name,
    //   description,
    //   tasks,
    //   references,
    //   supervisors,
    //   majors,
    //   branches,
    //   limit,
    // }).where("code = :id", {id});

    // const updatedProject = await query.execute();

    // const updatedProject = await this.update({code: id}, {
    //   name,
    //   description,
    //   tasks,
    //   references,
    //   supervisors,
    //   majors,
    //   branches,
    //   limit,
    // });

    const supervisorsList = await this.usersRepository.find({
      where: {
        id: In(supervisors),
      },
    });

    const studentsList = await this.studentsRepository.find({
      where: {
        userId: In(students),
      },
    });

    const branchesList = await this.branchesRepository.find({
      where: {
        id: In(branches),
      },
    });

    const programsList = await this.programsRepository.find({
      where: {
        id: In(programs),
      },
    });

    project.name = name;
    project.description = description;
    project.tasks = tasks;
    project.status = status;
    project.references = references;
    project.stage = stage;
    project.supervisors = supervisorsList;
    project.programs = programsList;
    project.branches = branchesList;
    project.limit = limit;
    project.students = studentsList;
    await this.save(project);

    // const project = await this.findOneBy({code: id});
    // Object.assign(project, {
    //   name,
    //   description,
    //   tasks,
    //   references,
    //   supervisors,
    //   majors,
    //   branches,
    //   limit,
    // });

    // const updatedProject = this.save(project);

    // const updatedProject = await this.preload({
    //   code: id,
    //   name,
    //   description,
    //   tasks,
    //   references,
    //   supervisors,
    //   majors,
    //   branches,
    //   limit,
    // })

    // await this.save(updatedProject);

    // const updatedProject = await this.save({
    //   code: id,
    //   name,
    //   description,
    //   tasks,
    //   references,
    //   supervisors,
    //   majors,
    //   branches,
    //   limit,
    // })

    // return updatedProject;
    return project;
  }

  async getProjectsByStatus(getProjectsByStatusDto: GetProjectsByStatusDto) {
    const { status } = getProjectsByStatusDto;
    const query = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.semester', 'semester')
      .leftJoinAndSelect('project.requirements', 'requirements')
      .leftJoinAndSelect('project.students', 'students')
      .leftJoinAndSelect('project.supervisors', 'supervisors')
      .leftJoinAndSelect('project.majors', 'majors')
      .leftJoinAndSelect('project.branches', 'branches')
      .leftJoinAndSelect('students.user', 'users')
      .loadRelationCountAndMap('project.studentsCount', 'project.students')
      .where('status = :status', { status });

    const projects = await query.getMany();

    return projects;
  }

  async getProjects(filterDto: GetProjectsFilterDto) {
    const {
      search,
      members,
      limit,
      page,
      status,
      owner,
      registration,
      stage,
      programs,
      branches,
      supervisors,
    } = filterDto;
    const query = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.registration', 'registration')
      .leftJoinAndSelect('project.requirements', 'requirements')
      .leftJoinAndSelect('project.students', 'students')
      .leftJoinAndSelect('project.supervisors', 'supervisors')
      .leftJoinAndSelect('project.owner', 'owner')
      .leftJoinAndSelect('project.programs', 'programs')
      .leftJoinAndSelect('project.branches', 'branches')
      .leftJoinAndSelect('students.user', 'users')
      .loadRelationCountAndMap('project.studentsCount', 'project.students');

    if (search) {
      query.andWhere(
        'LOWER(project.name) LIKE LOWER (:search) OR LOWER(project.description) LIKE LOWER (:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    if (status) {
      query.andWhere('project.status = :status', { status });
    }
    console.log(registration);
    if (registration) {
      query.andWhere(
        'registration.id = :id AND registration.semesterYear = :year AND registration.semesterNo = :no',
        {
          id: registration.id,
          year: registration.semester.year,
          no: registration.semester.no,
        },
      );
    }

    if (owner) {
      query.andWhere('owner.id = :owner', { owner });
    }

    if (stage) {
      query.andWhere('project.stage = :stage', { stage });
    }

    if (programs) {
      // for(let major of majors) {
      //   console.log(major);
      //   query.andWhere('majors.id = :major', {major})
      // }
      let newPrograms = [];
      if (!Array.isArray(programs)) {
        newPrograms = [programs];
      } else {
        newPrograms = programs;
      }
      query.andWhere('programs.id IN (:...programs)', {
        programs: newPrograms,
      });
      query.leftJoinAndSelect('project.programs', 'allPrograms');
    }

    if (branches) {
      let newBranches = [];
      if (!Array.isArray(branches)) {
        newBranches = [branches];
      } else {
        newBranches = branches;
      }
      query.andWhere('branches.id IN (:...branches)', {
        branches: newBranches,
      });
      query.leftJoinAndSelect('project.branches', 'allBranches');
    }

    if (supervisors) {
      let newSupervisors = [];
      if (!Array.isArray(supervisors)) {
        newSupervisors = [supervisors];
      } else {
        newSupervisors = supervisors;
      }

      query.andWhere('supervisors.id IN (:...supervisors)', {
        supervisors: newSupervisors,
      });
      query.leftJoinAndSelect('project.supervisors', 'allSupervisors');
    }

    if (members) {
      // query.andWhere((qb) => {
      //   const subQuery = qb
      //     .subQuery()
      //     .select('project.code')
      //     .from(Project, 'project')
      //     .leftJoin('project.students', 'student')
      //     .groupBy('project.code')
      //     .having('COUNT(student.userId) = :members', { members })
      //     .getQuery();
      //   return 'project.code IN ' + subQuery;
      // });
      query.andWhere('project.limit = :members', { members });
      // const subQuery = this.createQueryBuilder('project').select('project.code').leftJoin('project.students', 'student').groupBy('project.code').having("COUNT(student.userId) = :members", {members});
      // console.log(subQuery.getSql());
      // const result = await subQuery.getMany();
      // console.log(result);
    }

    if (limit && page) {
      query.skip((page - 1) * limit).take(limit);
    }

    // const projects = await query.getMany();
    // const count = await query.getCount();
    let [projects, count] = await query.getManyAndCount();

    // if (members) {
    //   console.log(projects);
    //   projects = projects.filter((project) => project.studentsCount == members);
    // }
    return {
      total: Math.ceil(count / limit),
      current: +page,
      projects,
    };
  }

  async rejectProject(rejectProjectDto: RejectProjectDto) {
    const { id, code, reason } = rejectProjectDto;
    const project = await this.getProjectByCode(code);
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    const status = project.status;
    switch (status) {
      case ProjectStatus.WAITING_FOR_DEPARTMENT_HEAD:
      case ProjectStatus.WAITING_FOR_PROGRAM_CHAIR:
        project.status = ProjectStatus.REJECTED;
        project.rejectedBy = user;
        project.rejectedReason = reason;
        break;
      case ProjectStatus.APPROVED:
        throw new BadRequestException(
          `Cannot reject approved project with code ${code}`,
        );
      case ProjectStatus.REJECTED:
        throw new BadRequestException(
          `The project with code ${code} is alreay rejected`,
        );
      case ProjectStatus.DEACTIVATED:
        throw new BadRequestException(
          `Cannot reject project ${code} with status ${status}`,
        );
      case ProjectStatus.DRAFT:
        throw new BadRequestException(
          `Cannot reject project ${code} with status ${status}`,
        );
    }

    await this.save(project);
    return project;
  }

  async approveProject(approveProjectDto: ApproveProjectDto) {
    const { id, code } = approveProjectDto;
    const project = await this.findOne({
      where: { code },
      relations: {
        registration: true,
        supervisors: true,
        students: true,
        programs: true,
        branches: true,
        requirements: true,
      },
    });

    if (!project) {
      throw new NotFoundException(`Project with id "${code}" not found`);
    }

    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }

    const status = project.status;
    switch (status) {
      case ProjectStatus.WAITING_FOR_DEPARTMENT_HEAD:
        project.departmentHead = user;
        project.departmentHeadApprovedAt = new Date();
        project.status = ProjectStatus.WAITING_FOR_PROGRAM_CHAIR;
        break;
      case ProjectStatus.WAITING_FOR_PROGRAM_CHAIR:
        project.programChair = user;
        project.programChairApprovedAt = new Date();
        project.status = ProjectStatus.APPROVED;
        break;
      case ProjectStatus.APPROVED:
        throw new BadRequestException(
          `The project with code ${code} is alreay approved`,
        );
      case ProjectStatus.REJECTED:
        throw new BadRequestException(
          `Cannot approve project ${code} with status ${status}`,
        );
      case ProjectStatus.DEACTIVATED:
        throw new BadRequestException(
          `Cannot approve project ${code} with status ${status}`,
        );
      case ProjectStatus.DRAFT:
        throw new BadRequestException(
          `Cannot approve project ${code} with status ${status}`,
        );
    }

    await this.save(project);
    return project;
  }

  async approveProjects(approveProjectsDto: ApproveProjectsDto) {
    const { id, codes } = approveProjectsDto;
    let result = [];
    for (let code of codes) {
      const project = await this.approveProject({ id, code });
      result.push(project);
    }
    return result;
  }

  async getProjectByCode(code: number) {
    const query = this.createQueryBuilder('project')
      .leftJoinAndSelect('project.semester', 'semester')
      .leftJoinAndSelect('project.requirements', 'requirements')
      .leftJoinAndSelect('project.students', 'students')
      .leftJoinAndSelect('project.supervisors', 'supervisors')
      .leftJoinAndSelect('project.majors', 'majors')
      .leftJoinAndSelect('project.branches', 'branches')
      .leftJoinAndSelect('students.user', 'users')
      .loadRelationCountAndMap('project.studentsCount', 'project.students')
      .andWhere('project.code = :code', { code });
    // const found = await this.findOne({
    //   where: { code },
    //   relations: {
    //     semester: true,
    //     supervisors: true,
    //     students: true,
    //     majors: true,
    //     branches: true,
    //     requirements: true,
    //   },
    // });
    const found = await query.getOne();

    if (!found) {
      throw new NotFoundException(`Project with code "${code}" not found`);
    }
    return found;
  }
}
