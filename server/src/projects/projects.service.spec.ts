import { Test } from '@nestjs/testing';
import { ProjectsRepository } from './projects.repository';
import { ProjectsService } from './projects.service';
import { ProjectStatus } from './project-status.enum';
import { UsersRepository } from 'src/users/users.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockProjectsRepository = () => ({
  getProjects: jest.fn(),
  getProjectByCode: jest.fn(),
  createProject: jest.fn(),
  updateAProject: jest.fn(),
  delete: jest.fn(),
});

const mockFilter = {
  search: 'd',
  members: 0,
  limit: 3,
  page: 1,
  status: ProjectStatus.WAITING_FOR_DEPARTMENT_HEAD,
  owner: 3,
  stage: 1,
  majors: [1],
  branches: [1],
  supervisors: [1]
};

describe('ProjectsService', () => {
  let projectsService: ProjectsService;
  let projectsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: ProjectsRepository, useFactory: mockProjectsRepository },
      ],
    }).compile();

    projectsService = module.get(ProjectsService);
    projectsRepository = module.get(ProjectsRepository);
  });

  describe('getProjects', () => {
    it('calls ProjectsRepository.getProjects and returns the result', async () => {
      const mockProjects = {
        total: 1,
        current: 1,
        projects: [
          {
            code: 11,
            name: 'Developing a system for outcome-based evaluation',
            stage: 1,
            description:
              '<p>Outcome-based assessment and evaluation are the crucial processes for continuous improvement in education all over the world. They include many subprocesses and involve many constituents. Above all, evidence is always required for their clarity and accountability. As a result, a lot of data, information, and knowledge exist along with these processes. Information systems must be desired for them over time.</p><p>However, in practice, their simple calculations and storage have been mainly supported by computers and basic software. There is still a gap between the existing so-called information systems and the expected one, especially for outcome-based evaluation. One of the obvious rationales behind this gap is the dynamics from the changes made for continuous improvement. Therefore, developing a system for outcome-based evaluation is non-trivial but significant.</p><p>In short, the project focuses on an information system for outcome-based evaluation. The resulting system tentatively facilitates outcome-based assessment and evaluation. It also makes the greatest effort possible for sustainable continuous improvement in education.</p>',
            tasks:
              '<ol><li>Study outcome-based assessment and outcome-based evaluation.</li><li>Do research on the existing works (systems) related to outcome-based assessment and outcome-based evaluation. Based on the review of those, determine the challenges (difficulties) in developing a system for outcome-based evaluation.</li><li>Describe the proposed system for outcome-based evaluation.</li><li>Analyze and design the system.</li><li>Implement and test the system.</li><li>Evaluate the system.</li></ol><p>Specialized Project: complete tasks 1, 2 and 3; complete part of tasks 4, 5, and 6.</p><p>Capstone Project: complete all the tasks.</p>',
            references:
              '<ul></li>http: //abet.org</li><li>References from the Internet</li></ul>',
            status: 'WAITING_FOR_DEPARTMENT_HEAD',
            programChairApprovedAt: null,
            departmentHeadApprovedAt: null,
            rejectedReason: null,
            limit: 3,
            semester: {
              year: 2023,
              no: 1,
              start: '2023-08-14T17:00:00.000Z',
              end: '2023-12-30T17:00:00.000Z',
            },
            requirements: [
              {
                projectCode: 11,
                id: 10,
                attribute: 'GPA',
                operator: '>=',
                value: '8.0',
              },
            ],
            students: [],
            supervisors: [
              {
                id: 2919,
                email: 'chauvtn@hcmut.edu.vn',
                username: 'chauvtn',
                name: 'Võ Thị Ngọc Châu',
              },
            ],
            owner: {
              id: 3,
              email: 'giabao@hcmut.edu.vn',
              username: 'giabao',
              name: 'Gia Bảo',
            },
            majors: [
              {
                id: 1,
                name: 'Computer Science',
              },
            ],
            branches: [
              {
                id: 1,
                name: 'High Quality',
              },
            ],
            studentsCount: 0,
          },
        ],
      };
      projectsRepository.getProjects.mockResolvedValue(mockProjects);
      // expect(projectsRepository.getProjects).not.toHaveBeenCalled();
      const projects = await projectsService.getProjects(mockFilter);
      // expect(projectsRepository.getProjects).toHaveBeenCalledWith(mockFilter);
      expect(projects).toEqual(mockProjects);
    });
  });

  describe('getProjectByCode', () => {
    it('calls ProjectsRepository.getProjectByCode and returns the result', async () => {
      const code = 11;
      const mockProject = {
        code,
        name: 'Developing a system for outcome-based evaluation',
        stage: 1,
        description:
          '<p>Outcome-based assessment and evaluation are the crucial processes for continuous improvement in education all over the world. They include many subprocesses and involve many constituents. Above all, evidence is always required for their clarity and accountability. As a result, a lot of data, information, and knowledge exist along with these processes. Information systems must be desired for them over time.</p><p>However, in practice, their simple calculations and storage have been mainly supported by computers and basic software. There is still a gap between the existing so-called information systems and the expected one, especially for outcome-based evaluation. One of the obvious rationales behind this gap is the dynamics from the changes made for continuous improvement. Therefore, developing a system for outcome-based evaluation is non-trivial but significant.</p><p>In short, the project focuses on an information system for outcome-based evaluation. The resulting system tentatively facilitates outcome-based assessment and evaluation. It also makes the greatest effort possible for sustainable continuous improvement in education.</p>',
        tasks:
          '<ol><li>Study outcome-based assessment and outcome-based evaluation.</li><li>Do research on the existing works (systems) related to outcome-based assessment and outcome-based evaluation. Based on the review of those, determine the challenges (difficulties) in developing a system for outcome-based evaluation.</li><li>Describe the proposed system for outcome-based evaluation.</li><li>Analyze and design the system.</li><li>Implement and test the system.</li><li>Evaluate the system.</li></ol><p>Specialized Project: complete tasks 1, 2 and 3; complete part of tasks 4, 5, and 6.</p><p>Capstone Project: complete all the tasks.</p>',
        references:
          '<ul></li>http: //abet.org</li><li>References from the Internet</li></ul>',
        status: 'WAITING_FOR_DEPARTMENT_HEAD',
        programChairApprovedAt: null,
        departmentHeadApprovedAt: null,
        rejectedReason: null,
        limit: 3,
        semester: {
          year: 2023,
          no: 1,
          start: '2023-08-14T17:00:00.000Z',
          end: '2023-12-30T17:00:00.000Z',
        },
        requirements: [
          {
            projectCode: 11,
            id: 10,
            attribute: 'GPA',
            operator: '>=',
            value: '8.0',
          },
        ],
        students: [],
        supervisors: [
          {
            id: 2919,
            email: 'chauvtn@hcmut.edu.vn',
            username: 'chauvtn',
            name: 'Võ Thị Ngọc Châu',
          },
        ],
        majors: [
          {
            id: 1,
            name: 'Computer Science',
          },
        ],
        branches: [
          {
            id: 1,
            name: 'High Quality',
          },
        ],
        studentsCount: 0,
      };
      projectsRepository.getProjectByCode.mockResolvedValue(mockProject);
      const project = await projectsService.getProjectByCode(code);
      expect(project).toEqual(mockProject);
    });
  });

  describe('createProject', () => {
    it('calls ProjectsRepository.createProject and returns the result', async () => {
      const mockCreatedProject = {
        name: 'Test project 699',
        stage: 1,
        description: 'test test test test',
        tasks: 'test test test test',
        references: 'test test test test',
        status: 'DRAFT',
        limit: 3,
        semester: {
          year: 2023,
          no: 1,
        },
        supervisors: [
          {
            id: '002919',
          },
          {
            id: '3',
          },
        ],
        students: [
          {
            userId: 2052725,
          },
        ],
        majors: [
          {
            id: 1,
          },
        ],
        branches: [
          {
            id: 2,
          },
        ],
        owner: {
          id: 3,
        },
        programChairApprovedAt: null,
        departmentHeadApprovedAt: null,
        rejectedReason: null,
        code: 23,
      };

      const mockCreateProjectDto: CreateProjectDto = {
        name: 'Test project 699',
        stage: 1,
        description: 'test test test test',
        tasks: 'test test test test',
        references: 'test test test test',
        limit: 3,
        semester: {
          year: 2023,
          no: 1,
        },
        requirements: [
          {
            attribute: 'GPA',
            operator: '>=',
            value: '8.0',
          },
        ],
        status: ProjectStatus.DRAFT,
        supervisors: [
          {
            id: 2919,
          },
          {
            id: 3,
          },
        ],
        owner: {
          id: 3,
        },
        students: [
          {
            userId: 2052725,
          },
        ],
        majors: [
          {
            id: 1,
          },
        ],
        branches: [
          {
            id: 2,
          },
        ],
      };

      projectsRepository.createProject.mockResolvedValue(mockCreatedProject);
      const createdProject =
        await projectsService.createProject(mockCreateProjectDto);
      expect(createdProject).toEqual(mockCreatedProject);
    });
  });

  describe('updateAProject', () => {
    it('calls ProjectsRepository.updateProject and returns the result', async () => {
      const mockUpdateProjectDto: UpdateProjectDto = {
        name: 'Test project 2 updated',
        description: 'test test test test',
        stage: 2,
        tasks: 'test test test test',
        references: 'test test test test updated baby',
        limit: 3,
        supervisors: [2919],
        students: [],
        majors: [2],
        branches: [2],
        requirements: null,
      };
      const code = 13;

      const mockUpdatedProject = {
        code,
        name: 'Test project 2 updated',
        stage: 1,
        description: 'test test test test',
        tasks: 'test test test test',
        references: 'test test test test updated baby',
        status: 'WAITING_FOR_DEPARTMENT_HEAD',
        programChairApprovedAt: null,
        departmentHeadApprovedAt: null,
        rejectedReason: null,
        limit: 3,
        supervisors: [
          {
            id: 2919,
            email: 'chauvtn@hcmut.edu.vn',
            username: 'chauvtn',
            name: 'Võ Thị Ngọc Châu',
          },
        ],
        students: [],
        majors: [
          {
            id: 2,
            name: 'Computer Engineering',
          },
        ],
        branches: [
          {
            id: 2,
            name: 'General',
          },
        ],
      };

      projectsRepository.updateAProject.mockResolvedValue(mockUpdatedProject);
      const updatedProject = await projectsService.updateAProject(
        code,
        mockUpdateProjectDto,
      );
      expect(updatedProject).toEqual(mockUpdatedProject);
    });
  });

  describe('deleteProject', () => {
    it('calls ProjectsRepository.delete and deletes an existing project', async () => {
      const code = 13;
      const mockResult = { affected: 1 };
      let hasError = false;
      projectsRepository.delete.mockResolvedValue(mockResult);
      try {
        await projectsService.deleteProject(code);
      } catch (error) {
        hasError = true;
      }
      expect(projectsRepository.delete).toHaveBeenCalledWith(code);
      expect(hasError).toEqual(false);
    });

    it('calls ProjectsRepository.delete and throw NotFoundException for trying to delete an unexisting project', async () => {
      const code = 13;
      const mockResult = { affected: 0 };
      let hasError = false;
      projectsRepository.delete.mockResolvedValue(mockResult);
      expect(projectsService.deleteProject(code)).rejects.toThrow(NotFoundException);
      expect(projectsRepository.delete).toHaveBeenCalledWith(code);
    });
  });
});
