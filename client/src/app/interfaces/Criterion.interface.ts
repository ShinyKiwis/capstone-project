import { PI } from "./Program.interface";

export interface Criterion{
  description: string;
  associatedPI: PI | null;
  assessment: MultipleLevelCriterion | MultipleChoiceCriterion | WrittenResponseCriterion;
}

interface LevelOption {
  level: string;
  description: string;
  minScore: number;
  maxScore: number;
}

export interface MultipleLevelCriterion {
  type: 'MultipleLevelCriterion';
  numberOfLevels: number;
  options: LevelOption[]
}

export interface WrittenResponseCriterion {
  type: 'WrittenResponseCriterion';
  maximumScore: number
}

interface MultipleChoiceOption {
  level: string;
  description: string;
  is_correct: boolean;
}

export interface MultipleChoiceCriterion {
  type: 'MultipleChoiceCriterion';
  score: number;
  options: MultipleChoiceOption[];
}
