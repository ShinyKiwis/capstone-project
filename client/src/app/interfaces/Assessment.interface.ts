import { CriterionType } from "./Criterion.interface";

export interface FetchedRecordUser {
  id: number;
  name: string;
  username: string;
  email: string;
  roles: Role[];
  project?: {
    code: number;
  };
}

interface FetchedCriterionLevel_written {
  id: number;
  criterionId: number;
  criterionAssessmentSchemeId: number;
  criterionAssessmentSchemeVersionId: number;
  criterionAssessmentSchemeVersionProgramId: number;
  content: string;
  maxScore: number;
  minScore: number;
}

interface FetchedCriterionLevel_level {
  id: number;
  criterionId: number;
  criterionAssessmentSchemeId: number;
  criterionAssessmentSchemeVersionId: number;
  criterionAssessmentSchemeVersionProgramId: number;
  content: string;
  maxScore: number;
  minScore: number;
}

export interface FetchedCriterionRecord{
  id: number;
  criterionId: number;
  criterionAssessmentSchemeId: number;
  criterionAssessmentSchemeVersionId: number;
  criterionAssessmentSchemeVersionProgramId: number;
  answer: string;
  score: number;
  user: FetchedRecordUser | null;
  project: null | {
    code: number,
    name: string,
    [key:string]: any
  }
}

export interface FetchedCriterion {
  // Criterion as fetched from API
  id: number;
  assessmentSchemeId: number;
  assessmentSchemeVersionId: number;
  assessmentSchemeVersionProgramId: number;
  type: CriterionType;
  content: string;
  performanceIndicator: {
    id: number;
    studentOutcomeId: number;
    studentOutcomeVersionId: number;
    studentOutcomeVersionProgramId: number;
    name: string;
    description: string;
  };
  levels: FetchedCriterionLevel_level[] | FetchedCriterionLevel_written[];
  records: FetchedCriterionRecord[];
}

export interface AssessSchemeListItem {
  id: number;
  versionId: number;
  versionProgramId: number;
  name: string;
  generation: string;
  semester: { year: number; no: number };
  description: string;
  // lastModified: string;
  criteria: FetchedCriterion[];
}

export interface AssessSchemeDetail extends AssessSchemeListItem {
  performanceIndicators: {
    assessmentSchemeToPerformanceIndicatorId: number;
    passingGoal: number;
    performanceIndicator: {
      id: number;
      studentOutcomeId: number;
      studentOutcomeVersionId: number;
      studentOutcomeVersionProgramId: number;
      name: string;
      description: string;
    };
  }[];
  records: FetchedCriterionRecord[];
}
