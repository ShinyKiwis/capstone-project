import { Test } from "@nestjs/testing";
import { Program } from "./entities/program.entity";
import { ProgramsService } from "./programs.service";
import { ProgramsRepository } from "./programs.repository";
import { BranchesRepository } from "./branches.repository";
import { VersionsRepository } from "./versions.repository";
import { StudentOutcomesRepository } from "./student-outcomes.repository";
import { PerformanceIndicatorsRepository } from "./performance-indicators.repository";
import { ProgramEducationObjectivesRepository } from "./program-education-objectives.repository";
import { AssessmentSchemesRepository } from "./assessment-schemes.repository";
import { DataSource } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { ProjectsRepository } from "src/projects/projects.repository";

const mockProgramsRepository = () => ({
  getAllPrograms: jest.fn(),
  createAProgram: jest.fn(),
  getAProgram: jest.fn(),
  updateAProgram: jest.fn(),
  delete: jest.fn(),
});

const mockBranchesRepository = () => ({
  getAllBranches: jest.fn(),
  createABranch: jest.fn(),
});

const mockVersionsRepository = () => ({
  createAVersionForAProgram: jest.fn(),
  getAVersionOfAProgram: jest.fn(),
  updateAVersion: jest.fn(),
  delete: jest.fn(),
});

const mockStudentOutcomesRepository = () => ({
  createStudentOutcome: jest.fn(),
  getAllStudentOutcomesOfAVersion: jest.fn(),
  getAStudentOutcome: jest.fn(),
  updateAStudentOutcome: jest.fn(),
  getAStudentOutcomeOfAVersion: jest.fn(),
  delete: jest.fn(),
});

const mockPerformanceIndicatorsRepository = () => ({
  createAPerformanceIndicator: jest.fn(),
  getAllPerformanceIndicatorsOfAStudentOutcome: jest.fn(),
  getAPerformanceIndicatorOfAStudentOutcome: jest.fn(),
  updateAPerformanceIndicator: jest.fn(),
  delete: jest.fn(),
});

const mockProgramEducationObjectivesRepository = () => ({
  createProgramEducationObjective: jest.fn(),
  getAllProgramEducationObjectiveOfAVersion: jest.fn(),
  getAProgramEducationObjective: jest.fn(),
  updateAProgramEducationObjective: jest.fn(),
  delete: jest.fn(),
});

const mockProjectsRepository = () => ({
  findOneBy: jest.fn(),
});

const mockAssessmentSchemesRepository = () => ({
  createAssessmentScheme: jest.fn(),
  getAllAssessmentSchemes: jest.fn(),
  getAnAssessmentScheme: jest.fn(),
  updateAssessmentScheme: jest.fn(),
});

describe('ProgramsService', () => {
  let programsService: ProgramsService;
  let programsRepository;
  let branchesRepository;
  let versionsRepository;
  let studentOutcomesRepository;
  let performanceIndicatorsRepository;
  let programEducationObjectivesRepository;
  let assessmentSchemesRepository;
  let projectsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProgramsService,
        { provide: ProgramsRepository, useFactory: mockProgramsRepository },
        { provide: BranchesRepository, useFactory: mockBranchesRepository },
        { provide: VersionsRepository, useFactory: mockVersionsRepository },
        { provide: StudentOutcomesRepository, useFactory: mockStudentOutcomesRepository },
        { provide: PerformanceIndicatorsRepository, useFactory: mockPerformanceIndicatorsRepository },
        { provide: ProgramEducationObjectivesRepository, useFactory: mockProgramEducationObjectivesRepository },
        { provide: AssessmentSchemesRepository, useFactory: mockAssessmentSchemesRepository },
        { provide: ProjectsRepository, useFactory: mockProjectsRepository },
        { provide: DataSource, useValue: {} },
      ],
    }).compile();

    programsService = module.get(ProgramsService);
    programsRepository = module.get(ProgramsRepository);
    branchesRepository = module.get(BranchesRepository);
    versionsRepository = module.get(VersionsRepository);
    studentOutcomesRepository = module.get(StudentOutcomesRepository);
    performanceIndicatorsRepository = module.get(PerformanceIndicatorsRepository);
    programEducationObjectivesRepository = module.get(ProgramEducationObjectivesRepository);
    assessmentSchemesRepository = module.get(AssessmentSchemesRepository);
    programsService = module.get(ProjectsRepository);
  });

  describe('getPrograms', () => {
    it('calls ProgramsRepository.getAllPrograms and returns the result', async () => {
      const mockProgram = {
        id: 1,
        name: 'Computer Science',
        major: 'Software Engineering',
        description: 'This is a program description',
        faculty: null
      };
      programsRepository.getAllPrograms.mockResolvedValue(mockProgram);
      const result = await programsService.getPrograms();
      expect(result).toEqual(mockProgram);
    });
  });

  describe('createAProgram', () => {
    it('calls ProgramsRepository.createAProgram and returns the created program', async () => {
      const createProgramDto = {
        name: 'Computer Science',
        major: 'Software Engineering',
        description: 'This is a program description',
        faculty: null
      };
      const createdProgram = {
        id: 1,
        name: 'Computer Science',
        major: 'Software Engineering',
        description: 'This is a program description',
        faculty: null
      };
      programsRepository.createAProgram.mockResolvedValue(createdProgram);
      const result = await programsService.createAProgram(createProgramDto);
      expect(result).toEqual(createdProgram);
    });
  });

  describe('getAProgram', () => {
    it('calls ProgramsRepository.getAProgram and returns the specified program', async () => {
      const programId = 1;
      const program = {
        id: 1,
        name: 'Computer Science',
        major: 'Software Engineering',
        description: 'This is a program description',
        faculty: null
      };
      programsRepository.getAProgram.mockResolvedValue(program);
      const result = await programsService.getAProgram(programId);
      expect(result).toEqual(program);
    });
  });

  describe('updateAProgram', () => {
    it('calls ProgramsRepository.updateAProgram and returns the updated program', async () => {
      const programId = 1;
      const updateProgramDto = {
        name: 'Updated Program',
        major: 'Updated Major',
        description: 'Updated description',
        faculty: 'Updated Faculty'
      };
      const updatedProgram = {
        id: 1,
        name: 'Updated Program',
        major: 'Updated Major',
        description: 'Updated description',
        faculty: 'Updated Faculty'
      };
      programsRepository.updateAProgram.mockResolvedValue(updatedProgram);
      const result = await programsService.updateAProgram(programId, updateProgramDto);
      expect(result).toEqual(updatedProgram);
    });
  });

  describe('createABranch', () => {
    it('calls BranchesRepository.createABranch and returns the created branch', async () => {
      const createBranchDto = {
        name: 'Computer Science',
        description: 'This is a branch description',
      };
      const createdBranch = {
        id: 1,
        name: 'Computer Science',
        description: 'This is a branch description',
      };
      branchesRepository.createABranch.mockResolvedValue(createdBranch);
      const result = await programsService.createABranch(createBranchDto);
      expect(result).toEqual(createdBranch);
    });
  });

  describe('createAVersionForAProgram', () => {
    it('calls VersionsRepository.createAVersionForAProgram and returns the created version', async () => {
      const programId = 1;
      const createVersionDto = {
        name: 'Version 1',
        description: 'This is a version description',
        startDate: new Date(),
        endDate: new Date(),
      };
      const createdVersion = {
        id: 1,
        name: 'Version 1',
        description: 'This is a version description',
      };
      versionsRepository.createAVersionForAProgram.mockResolvedValue(createdVersion);
      const result = await programsService.createAVersionForAProgram(programId, createVersionDto);
      expect(result).toEqual(createdVersion);
    });
  });

  describe('getAVersionOfAProgram', () => {
    it('calls VersionsRepository.getAVersionOfAProgram and returns the specified version', async () => {
      const programId = 1;
      const versionId = 1;
      const version = {
        id: 1,
        name: 'Version 1',
        description: 'This is a version description',
      };
      versionsRepository.getAVersionOfAProgram.mockResolvedValue(version);
      const result = await programsService.getAVersionOfAProgram(programId, versionId);
      expect(result).toEqual(version);
    });
  });

  describe('updateAVersion', () => {
    it('calls VersionsRepository.updateAVersion and returns the updated version', async () => {
      const programId = 1;
      const versionId = 1;
      const updateVersionDto = {
        name: 'Updated Version',
        description: 'Updated description',
        startDate: new Date(),
        endDate: new Date(),
      };
      const updatedVersion = {
        id: 1,
        name: 'Updated Version',
        description: 'Updated description',
      };
      versionsRepository.updateAVersion.mockResolvedValue(updatedVersion);
      const result = await programsService.updateAVersion(programId, versionId, updateVersionDto);
      expect(result).toEqual(updatedVersion);
    });
  });

  describe('deleteAVersion', () => {
    it('calls VersionsRepository.deleteAVersion and returns void', async () => {
      const programId = 1;
      const versionId = 1;
      versionsRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await programsService.deleteAVersion(programId, versionId);
      expect(result).toBeUndefined();
    });

    it('calls VersionsRepository.deleteAVersion and throws NotFoundException', async () => {
      const programId = 1;
      const versionId = 1;
      versionsRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(programsService.deleteAVersion(programId, versionId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAStudentOutcome', () => {
    it('calls StudentOutcomesRepository.createAStudentOutcome and returns the created student outcome', async () => {
      const programId = 1;
      const versionId = 1;
      const createStudentOutcomeDto = {
        name: 'Student Outcome 1',
        description: 'This is a student outcome description',
        expectedGoal: 70,
        passingThreshold: 70,
      };
      const createdStudentOutcome = {
        id: 1,
        name: 'Student Outcome 1',
        description: 'This is a student outcome description',
        expectedGoal: 70,
        passingThreshold: 70,
      };
      studentOutcomesRepository.createStudentOutcome.mockResolvedValue(createdStudentOutcome);
      const result = await programsService.createAStudentOutcome(programId, versionId, createStudentOutcomeDto);
      expect(result).toEqual(createdStudentOutcome);
    });
  });

  describe('getAStudentOutcomeOfAversion', () => {
    it('calls StudentOutcomesRepository.getAStudentOutcome and returns the specified student outcome', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      const studentOutcome = {
        id: 1,
        name: 'Student Outcome 1',
        description: 'This is a student outcome description',
        expectedGoal: 70,
        passingThreshold: 70,
      };
      studentOutcomesRepository.getAStudentOutcomeOfAVersion.mockResolvedValue(studentOutcome);
      const result = await programsService.getAStudentOutcomeOfAVersion(programId, versionId, studentOutcomeId);
      expect(result).toEqual(studentOutcome);
    });
  });

  describe('updateAStudentOutcome', () => {
    it('calls StudentOutcomesRepository.updateAStudentOutcome and returns the updated student outcome', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      const updateStudentOutcomeDto = {
        name: 'Updated Student Outcome',
        description: 'Updated description',
        expectedGoal: 80,
        passingThreshold: 80,
      };
      const updatedStudentOutcome = {
        id: 1,
        name: 'Updated Student Outcome',
        description: 'Updated description',
        expectedGoal: 80,
        passingThreshold: 80,
      };
      studentOutcomesRepository.updateAStudentOutcome.mockResolvedValue(updatedStudentOutcome);
      const result = await programsService.updateAStudentOutcome(programId, versionId, studentOutcomeId, updateStudentOutcomeDto);
      expect(result).toEqual(updatedStudentOutcome);
    });
  });

  describe('deleteAStudentOutcome', () => {
    it('calls StudentOutcomesRepository.deleteAStudentOutcome and returns void', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      studentOutcomesRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await programsService.deleteAStudentOutcome(programId, versionId, studentOutcomeId);
      expect(result).toBeUndefined();
    });

    it('calls StudentOutcomesRepository.deleteAStudentOutcome and throws NotFoundException', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      studentOutcomesRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(programsService.deleteAStudentOutcome(programId, versionId, studentOutcomeId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAProgramEducationObjective', () => {
    it('calls ProgramEducationObjectivesRepository.createAProgramEducationObjective and returns the created program education objective', async () => {
      const programId = 1;
      const versionId = 1;
      const createProgramEducationObjectiveDto = {
        name: 'Program Education Objective 1',
        description: 'This is a program education objective description',
      };
      const createdProgramEducationObjective = {
        id: 1,
        name: 'Program Education Objective 1',
        description: 'This is a program education objective description',
      };
      programEducationObjectivesRepository.createProgramEducationObjective.mockResolvedValue(createdProgramEducationObjective);
      const result = await programsService.createAProgramEducationObjective(programId, versionId, createProgramEducationObjectiveDto);
      expect(result).toEqual(createdProgramEducationObjective);
    });
  });

  describe('getAllProgramEducationObjectiveOfAVersion', () => {
    it('calls ProgramEducationObjectivesRepository.getAllProgramEducationObjectiveOfAVersion and returns the program education objectives', async () => {
      const programId = 1;
      const versionId = 1;
      const programEducationObjectives = [
        {
          id: 1,
          name: 'Program Education Objective 1',
          description: 'This is a program education objective description',
        },
        {
          id: 2,
          name: 'Program Education Objective 2',
          description: 'This is another program education objective description',
        },
      ];
      programEducationObjectivesRepository.getAllProgramEducationObjectiveOfAVersion.mockResolvedValue(programEducationObjectives);
      const result = await programsService.getAllProgramEducationObjectiveOfAVersion(programId, versionId);
      expect(result).toEqual(programEducationObjectives);
    });
  });

  describe('getAProgramEducationObjectiveOfAVersion', () => {
    it('calls ProgramEducationObjectivesRepository.getAProgramEducationObjectiveOfAVersion and returns the specified program education objective', async () => {
      const programId = 1;
      const versionId = 1;
      const programEducationObjectiveId = 1;
      const programEducationObjective = {
        id: 1,
        name: 'Program Education Objective 1',
        description: 'This is a program education objective description',
      };
      programEducationObjectivesRepository.getAProgramEducationObjective.mockResolvedValue(programEducationObjective);
      const result = await programsService.getAProgramEducationObjectiveOfAVersion(programId, versionId, programEducationObjectiveId);
      expect(result).toEqual(programEducationObjective);
    });
  });

  describe('updateAProgramEducationObjective', () => {
    it('calls ProgramEducationObjectivesRepository.updateAProgramEducationObjective and returns the updated program education objective', async () => {
      const programId = 1;
      const versionId = 1;
      const programEducationObjectiveId = 1;
      const updateProgramEducationObjectiveDto = {
        name: 'Updated Program Education Objective',
        description: 'Updated description',
      };
      const updatedProgramEducationObjective = {
        id: 1,
        name: 'Updated Program Education Objective',
        description: 'Updated description',
      };
      programEducationObjectivesRepository.updateAProgramEducationObjective.mockResolvedValue(updatedProgramEducationObjective);
      const result = await programsService.updateAProgramEducationObjective(programId, versionId, programEducationObjectiveId, updateProgramEducationObjectiveDto);
      expect(result).toEqual(updatedProgramEducationObjective);
    });
  });

  describe('deleteAProgramEducationObjective', () => {
    it('calls ProgramEducationObjectivesRepository.deleteAProgramEducationObjective and returns void', async () => {
      const programId = 1;
      const versionId = 1;
      const programEducationObjectiveId = 1;
      programEducationObjectivesRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await programsService.deleteAProgramEducationObjective(programId, versionId, programEducationObjectiveId);
      expect(result).toBeUndefined();
    });

    it('calls ProgramEducationObjectivesRepository.deleteAProgramEducationObjective and throws NotFoundException', async () => {
      const programId = 1;
      const versionId = 1;
      const programEducationObjectiveId = 1;
      programEducationObjectivesRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(programsService.deleteAProgramEducationObjective(programId, versionId, programEducationObjectiveId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAPerformanceIndicator', () => {
    it('calls PerformanceIndicatorsRepository.createAPerformanceIndicator and returns the created performance indicator', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      const createPerformanceIndicatorDto = {
        name: 'Performance Indicator 1',
        description: 'This is a performance indicator description',
      };
      const createdPerformanceIndicator = {
        id: 1,
        name: 'Performance Indicator 1',
        description: 'This is a performance indicator description',
      };
      performanceIndicatorsRepository.createAPerformanceIndicator.mockResolvedValue(createdPerformanceIndicator);
      const result = await programsService.createAPerformanceIndicator(programId, versionId, studentOutcomeId, createPerformanceIndicatorDto);
      expect(result).toEqual(createdPerformanceIndicator);
    });
  });

  describe('getAPerformanceIndicatorOfAStudentOutcome', () => {
    it('calls PerformanceIndicatorsRepository.getAPerformanceIndicatorOfAStudentOutcome and returns the specified performance indicator', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      const performanceIndicatorId = 1;
      const performanceIndicator = {
        id: 1,
        name: 'Performance Indicator 1',
        description: 'This is a performance indicator description',
      };
      performanceIndicatorsRepository.getAPerformanceIndicatorOfAStudentOutcome.mockResolvedValue(performanceIndicator);
      const result = await programsService.getAPerformanceIndicatorOfAStudentOutcome(programId, versionId, studentOutcomeId, performanceIndicatorId);
      expect(result).toEqual(performanceIndicator);
    });
  });

  describe('updateAPerformanceIndicator', () => {
    it('calls PerformanceIndicatorsRepository.updateAPerformanceIndicator and returns the updated performance indicator', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      const performanceIndicatorId = 1;
      const updatePerformanceIndicatorDto = {
        name: 'Updated Performance Indicator',
        description: 'Updated description',
      };
      const updatedPerformanceIndicator = {
        id: 1,
        name: 'Updated Performance Indicator',
        description: 'Updated description',
      };
      performanceIndicatorsRepository.updateAPerformanceIndicator.mockResolvedValue(updatedPerformanceIndicator);
      const result = await programsService.updateAPerformanceIndicator(programId, versionId, studentOutcomeId, performanceIndicatorId, updatePerformanceIndicatorDto);
      expect(result).toEqual(updatedPerformanceIndicator);
    });
  });

  describe('deleteAPerformanceIndicator', () => {
    it('calls PerformanceIndicatorsRepository.deleteAPerformanceIndicator and returns void', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      const performanceIndicatorId = 1;
      performanceIndicatorsRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await programsService.deleteAPerformanceIndicator(programId, versionId, studentOutcomeId, performanceIndicatorId);
      expect(result).toBeUndefined();
    });

    it('calls PerformanceIndicatorsRepository.deleteAPerformanceIndicator and throws NotFoundException', async () => {
      const programId = 1;
      const versionId = 1;
      const studentOutcomeId = 1;
      const performanceIndicatorId = 1;
      performanceIndicatorsRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(programsService.deleteAPerformanceIndicator(programId, versionId, studentOutcomeId, performanceIndicatorId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateAProgram', () => {
    it('calls ProgramsRepository.updateAProgram and returns the updated program', async () => {
      const programId = 1;
      const updateProgramDto = {
        name: 'Updated Program',
        major: 'Updated Major',
        description: 'Updated description',
        faculty: 'Updated Faculty'
      };
      const updatedProgram = {
        id: 1,
        name: 'Updated Program',
        major: 'Updated Major',
        description: 'Updated description',
        faculty: 'Updated Faculty'
      };
      programsRepository.updateAProgram.mockResolvedValue(updatedProgram);
      const result = await programsService.updateAProgram(programId, updateProgramDto);
      expect(result).toEqual(updatedProgram);
    });
  });

  describe('deleteProgram', () => {
    it('calls ProgramsRepository.deleteProgram and returns void', async () => {
      const programId = 1;
      programsRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await programsService.deleteProgram(programId);
      expect(result).toBeUndefined();
    });

    it('calls ProgramsRepository.deleteProgram and throws NotFoundException', async () => {
      const programId = 1;
      programsRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(programsService.deleteProgram(programId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createAnAssessmentScheme', () => {
    it('calls AssessmentSchemesRepository.createAnAssessmentScheme and returns the created assessment scheme', async () => {
      const programId = 1;
      const versionId = 1;
      const createAssessmentSchemeDto = {
        name: 'Assessment Scheme 1',
        description: 'This is an assessment scheme description',
        semester: {
          year: 2023,
          no: 1,
        },
        generation: '2020',
        criteria: [],
        performanceIndicators: [],
      };
      const createdAssessmentScheme = {
        id: 1,
        name: 'Assessment Scheme 1',
        description: 'This is an assessment scheme description',
      };
      assessmentSchemesRepository.createAssessmentScheme.mockResolvedValue(createdAssessmentScheme);
      const result = await programsService.createAnAssessmentScheme(programId, versionId,createAssessmentSchemeDto);
      expect(result).toEqual(createdAssessmentScheme);
    }
    );
  });

  describe('getAllAssessmentSchemesOfAProgram', () => {
    it('calls AssessmentSchemesRepository.getAllAssessmentSchemesOfAProgram and returns the assessment schemes', async () => {
      const programId = 1;
      const versionId = 1;
      const assessmentSchemes = [
        {
          id: 1,
          name: 'Assessment Scheme 1',
          description: 'This is an assessment scheme description',
        },
        {
          id: 2,
          name: 'Assessment Scheme 2',
          description: 'This is another assessment scheme description',
        },
      ];
      assessmentSchemesRepository.getAllAssessmentSchemes.mockResolvedValue(assessmentSchemes);
      const result = await programsService.getAllAssessmentSchemes(programId, versionId);
      expect(result).toEqual(assessmentSchemes);
    });
  });
});
