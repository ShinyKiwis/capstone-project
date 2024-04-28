import { PI } from "./Program.interface";

const index_levelMapping = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  'A': 0, 
  'B': 1, 
  'C': 2, 
  'D': 3, 
  'E': 4, 
}

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
  setDesc: (newDesc: string) => void;
  getDesc: () => string;
  setPI: (newPI: number) => void;
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

  // Methods
  changeType(newtype:CriterionType|null){
    switch (newtype) {
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
  
  setDesc(newDesc: string){
    this.description = newDesc;
  };

  getDesc(){
    return this.description;
  };

  setPI(newPI: number){
    // set new PI
  };
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

  //Methods
  addLevel: ()=>void;
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

  addLevel(){
    this.numberOfLevels += 1;
    this.options.push({
      levelLabel: "E",
      description: "",
      minScore: 4,
      maxScore: 4,
    })
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

  //Methods
  addLevel: ()=>void;
  changeSelection: (newOption:string) => void
  getValue: ()=>string;
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

  addLevel(){
    this.numberOfLevels += 1;
    this.options.push({
      levelLabel: "E",
      description: "",
      is_correct: false
    })
  }

  changeSelection(newOption:string){
    this.options.forEach(option => {
      if (option.levelLabel !== newOption)
        option.is_correct = false;
      else
        option.is_correct = true;
    })
  }

  getValue(){
    for (let option of this.options) {
      if (option.is_correct === true){
        return option.levelLabel
      }
    }
    return '';
  }
}

