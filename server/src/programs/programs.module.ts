import { Module } from '@nestjs/common';
import { ProgramsController } from './programs.controller';
import { ProgramsService } from './programs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { BranchesRepository } from './branches.repository';
import { ProgramsRepository } from './programs.repository';
import { Program } from './entities/program.entity';
import { Version } from './entities/version.entity';
import { VersionsRepository } from './versions.repository';
import { StudentOutcome } from './entities/student-outcome.entity';
import { StudentOutcomesRepository } from './student-outcomes.repository';
import { PerformanceIndicator } from './entities/performance-indicator.entity';
import { PerformanceIndicatorsRepository } from './performance-indicators.repository';
import { AssessmentScheme } from './entities/assessment-scheme.entity';
import { Criterion } from './entities/criterion.entity';
import { Level } from './entities/level.entity';
import { AssessmentRecord } from './entities/assessment-record.entity';
import { ProgramEducationObjective } from './entities/program-education-objectives.entity';
import { ProgramEducationObjectivesRepository } from './program-education-objectives.repository';
import { AssessmentSchemeToPerformanceIndicator } from './entities/assessment-scheme-to-performance-indicator.entity';
import { AssessmentSchemesRepository } from './assessment-schemes.repository';
import { CriteriaRepository } from './criteria.repository';
import { LevelsRepository } from './levels.repository';
import { AssessmentSchemesToPerformanceIndicatorsRepository } from './assessment-scheme-to-performance-indicator.repository';
import { SemestersRepository } from 'src/semesters/semesters.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Program, Version, ProgramEducationObjective,StudentOutcome, PerformanceIndicator, AssessmentScheme, Criterion, Level, AssessmentRecord, AssessmentSchemeToPerformanceIndicator])],
  controllers: [ProgramsController],
  providers: [ProgramsService, BranchesRepository, ProgramsRepository, VersionsRepository, ProgramEducationObjectivesRepository, StudentOutcomesRepository, PerformanceIndicatorsRepository, AssessmentSchemesRepository, CriteriaRepository, LevelsRepository, AssessmentSchemesToPerformanceIndicatorsRepository, SemestersRepository]
})
export class ProgramsModule {}
