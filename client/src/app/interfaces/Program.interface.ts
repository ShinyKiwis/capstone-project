export interface Version {
  id: number,
  name: string,
  programId: number,
  endDate: string,
  startDate: string,
  description: string
}

export default interface Program {
  id: number,
  name: string,
  major: string,
  description: string,
  versions: Version[]
}

export interface SO {
  id: number,
  versionId: number,
  versionProgramId: number,
  name: string,
  description: string,
  performanceIndicators: any[]
}

export interface PEO {
  id: number,
  versionId: number,
  versionProgramId: number,
  name: string,
  description: string,
  versions: any[]
}

export interface PI {
  studentOutcomeId: number,
  studentOutcomeVersionId: number,
  studentOutcomeVersionProgramId: number,
  name: string,
  description: string,
  studentOutcome: any, 
  id: number,
  expectedGoal: string,
  passingThreshold: string
}
