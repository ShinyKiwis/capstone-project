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
