import { CriterionType } from "./Criterion.interface";

interface FetchedCriterionLevel_written {
	"id": number;
	"criterionId": number;
	"criterionAssessmentSchemeId": number;
	"criterionAssessmentSchemeVersionId": number;
	"criterionAssessmentSchemeVersionProgramId": number;
	"content": string;
	"maxScore": number;
	"minScore": number;
}

interface FetchedCriterionLevel_level{
	"id": number;
	"criterionId": number;
	"criterionAssessmentSchemeId": number;
	"criterionAssessmentSchemeVersionId": number;
	"criterionAssessmentSchemeVersionProgramId": number;
	"content": string;
	"maxScore": number;
	"minScore": number;
}

interface FetchedCriterion {
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
  }[];
  levels: FetchedCriterionLevel_level[] | FetchedCriterionLevel_written[];
	records: any[];
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
