import { PI } from "./Program.interface";

export type CriterionType = "multilevel" | "written" | "multiplechoice";
export interface Criterion {
  description: string;
  associatedPI: PI | null;
  type: CriterionType
  assessment:
    | MultipleLevelCriterion
    | MultipleChoiceCriterion
    | WrittenResponseCriterion;

  // Methods
  changeType: (type:CriterionType|null) => void;
}

export class CriterionObject implements Criterion {
  description: string;
  type: CriterionType;
  associatedPI: PI | null;
  assessment:
    | MultipleLevelCriterion
    | MultipleChoiceCriterion
    | WrittenResponseCriterion;

  constructor(desc: string, type: CriterionType) {
    this.description = desc;
    this.type = type;
    this.associatedPI = null;

    switch (type) {
      case "multilevel":
        this.assessment = new CriterionLevels_multi();
        break;
      case "written":
        this.assessment = {maximumScore: 3};
        break;
      case "multiplechoice":
        this.assessment = new CriterionLevels_choice();
        break;

      default:
        this.assessment = new CriterionLevels_multi();
        break;
    }
  }

  changeType(type:CriterionType|null){
    switch (type) {
      case "multilevel":
        this.type = 'multilevel';
        this.assessment = new CriterionLevels_multi();
        break;
      case "written":
        this.type = 'written';
        this.assessment = {maximumScore: 3};
        break;
      case "multiplechoice":
        this.type = 'multiplechoice';
        this.assessment = new CriterionLevels_choice();
        break;

      default:
        this.assessment = new CriterionLevels_multi();
        break;
    }
    return;
  }
  
}

interface MultiLevelOption {
  levelLabel: string;
  description: string;
  minScore: number;
  maxScore: number;
}

export interface MultipleLevelCriterion {
  numberOfLevels: number;
  options: MultiLevelOption[];
}

class CriterionLevels_multi implements MultipleLevelCriterion {
  numberOfLevels: number;
  options: MultiLevelOption[];

  constructor() {
    this.numberOfLevels = 4;
    this.options = [
      {
        levelLabel: "A",
        description: "",
        minScore: 0,
        maxScore: 0,
      },
      {
        levelLabel: "B",
        description: "",
        minScore: 1,
        maxScore: 1,
      },
      {
        levelLabel: "C",
        description: "",
        minScore: 2,
        maxScore: 2,
      },
      {
        levelLabel: "D",
        description: "",
        minScore: 3,
        maxScore: 4,
      },
    ];
  }
}

export interface WrittenResponseCriterion {
  maximumScore: number;
}

interface MultipleChoiceOption {
  levelLabel: string;
  description: string;
  is_correct: boolean;
}

export interface MultipleChoiceCriterion {
  score: number;
  numberOfLevels: number;
  options: MultipleChoiceOption[];
}

class CriterionLevels_choice implements MultipleChoiceCriterion {
  score: number;
  numberOfLevels: number;
  options: MultipleChoiceOption[];

  constructor() {
    this.score=3;
    this.numberOfLevels = 4;
    this.options = [
      {
        levelLabel: "A",
        description: "",
        is_correct: false,
      },
      {
        levelLabel: "B",
        description: "",
        is_correct: false,
      },
      {
        levelLabel: "C",
        description: "",
        is_correct: false,
      },
      {
        levelLabel: "D",
        description: "",
        is_correct: false,
      },
    ];
  }
}

