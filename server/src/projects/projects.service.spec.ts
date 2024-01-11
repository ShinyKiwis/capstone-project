import { Test } from "@nestjs/testing";
import { ProjectsRepository } from "./projects.repository";
import { ProjectsService } from "./projects.service"

const mockProjectsRepository = () => ({
  getProjects: jest.fn(),
})

const mockFilter = {
  search: 'd',
  members: 3,
  limit: 3,
  page: 1,
}

describe('ProjectsService', () => {
  let projectsService: ProjectsService;
  let projectsRepository: ProjectsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: ProjectsRepository, useFactory: mockProjectsRepository }
      ]
    }).compile();

    projectsService = module.get(ProjectsService);
    projectsRepository = module.get(ProjectsRepository);
  })

  describe('getProjects', () => {
    it('calls ProjectsRepository.getProjects and returns the result', () => {
      expect(projectsRepository.getProjects).not.toHaveBeenCalled();
      projectsService.getProjects(mockFilter);
      expect(projectsRepository.getProjects).toHaveBeenCalled();
    })
  })
})