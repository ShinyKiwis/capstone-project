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
  performanceIndicators: PI[]
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
  id: number,
  name: string,
  description: string,
  expectedGoal: string,
  studentOutcome: any, 
  passingThreshold: string,
  studentOutcomeId: number,
  studentOutcomeVersionId: number,
  studentOutcomeVersionProgramId: number,
}
