import { BsTelephoneMinus } from "react-icons/bs";
import { PI } from "./Program.interface";

export const index_levelMapping: { [key: number]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
};

export const level_indexMapping: { [key: string]: number } = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
};

export type CriterionType = "multilevel" | "written" | "multiplechoice";
export interface Criterion {
  description: string;
  associatedPI: PI | null;
  type: CriterionType;
  assessment:
    | MultipleLevelCriterion
    | MultipleChoiceCriterion
    | WrittenResponseCriterion;

  // Methods
  changeType: (type: CriterionType | null) => void;
  setDesc: (newDesc: string) => void;
  getDesc: () => string;
  setPI: (newPI: PI) => void;
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
        this.assessment = new CriterionLevels_written();
        break;
      case "multiplechoice":
        this.assessment = new CriterionLevels_choice();
        break;

      default:
        this.assessment = new CriterionLevels_multi();
        break;
    }
  };

  // Methods
  changeType(newtype: CriterionType | null) {
    switch (newtype) {
      case "multilevel":
        this.type = "multilevel";
        this.assessment = new CriterionLevels_multi();
        break;
      case "written":
        this.type = "written";
        this.assessment = new CriterionLevels_written();
        break;
      case "multiplechoice":
        this.type = "multiplechoice";
        this.assessment = new CriterionLevels_choice();
        break;

      default:
        this.assessment = new CriterionLevels_multi();
        break;
    }
    return;
  }

  setDesc(newDesc: string) {
    this.description = newDesc;
  }

  getDesc() {
    return this.description;
  }

  setPI(newPI: PI) {
    // set new PI
    this.associatedPI = newPI;
  }
}

export interface MultiLevelOption {
  levelLabel: string;
  description: string;
  minScore: number;
  maxScore: number;

  // Methods
}

// class MultiLevelOption implements MultiLevelOption {
//   levelLabel: string;
//   description: string;
//   minScore: number;
//   maxScore: number;

//   constructor(label: string, desc: string, min: number, max: number) {
//     this.levelLabel = label;
//     this.description = desc;
//     this.minScore = min;
//     this.maxScore = max;
//   }
// }

export interface MultipleLevelCriterion {
  numberOfLevels: number;
  options: MultiLevelOption[];

  //Methods
  addLevel: (desc?:string, max?: number, min?:number) => void;
  removeLevel: (label: string) => void;
  getMaxScore: () => number;
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

  addLevel(desc?:string, max?: number, min?:number) {
    this.numberOfLevels += 1;
    this.options.push({
      levelLabel: index_levelMapping[this.numberOfLevels - 1],
      description: desc || "",
      minScore: min || this.numberOfLevels - 1,
      maxScore: max || this.numberOfLevels - 1,
    });
  }

  removeLevel(label: string) {
    this.numberOfLevels -= 1;
    this.options.splice(level_indexMapping[label], 1);
    this.options.forEach(
      (option, index) => (option.levelLabel = index_levelMapping[index]),
    );
  }

  getMaxScore(){
    let max = 0;
    this.options.forEach(option => {
      if (option.maxScore > max) max = option.maxScore
    })
    return max;
  }
}

export interface WrittenResponseCriterion {
  maximumScore: number;

  // Methods
  getMaxScore: () => number;
}

class CriterionLevels_written implements WrittenResponseCriterion {
  maximumScore: number;

  constructor(){
    this.maximumScore = 3;
  }

  getMaxScore(){
    return this.maximumScore;
  }
}

export interface MultipleChoiceOption {
  levelLabel: string;
  description: string;
  is_correct: boolean;
}

export interface MultipleChoiceCriterion {
  score: number;
  numberOfLevels: number;
  options: MultipleChoiceOption[];

  //Methods
  addLevel: (desc?:string, isCorrect?:boolean) => void;
  removeLevel: (label: string) => void;
  changeSelection: (newOption: string) => void;
  getValue: () => string;
  getMaxScore: () => number;
}

class CriterionLevels_choice implements MultipleChoiceCriterion {
  score: number;
  numberOfLevels: number;
  options: MultipleChoiceOption[];

  constructor() {
    this.score = 3;
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

  // Methods
  addLevel(desc?:string, isCorrect?:boolean) {
    this.numberOfLevels += 1;
    this.options.push({
      levelLabel: index_levelMapping[this.numberOfLevels - 1],
      description: desc || "",
      is_correct: isCorrect || false,
    });
  }

  removeLevel(label: string) {
    this.numberOfLevels -= 1;
    if (label === this.getValue()) this.changeSelection("");
    this.options.splice(level_indexMapping[label], 1);
    this.options.forEach(
      (option, index) => (option.levelLabel = index_levelMapping[index]),
    );
  }

  changeSelection(newOption: string) {
    this.options.forEach((option) => {
      if (option.levelLabel !== newOption) option.is_correct = false;
      else option.is_correct = true;
    });
  }

  getValue() {
    for (let option of this.options) {
      if (option.is_correct === true) {
        return option.levelLabel;
      }
    }
    return "";
  }

  getMaxScore(){
    return this.score;
  }
}
