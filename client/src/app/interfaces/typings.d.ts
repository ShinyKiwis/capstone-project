type OptionType = {
  label: string;
  value: string;
  dataObject: any;
}

type Resource = {
  id: number;
  name: string
}

type Role = {
  id: number;
  name: string;
  resources: Resource[]
}

type Branch = {
	id: number,
	name: string
}

type Program = {
  id: number,
  name: string
}

type ProgramBranch = {
  id: number,
  name: string,
  branches: Branch[],
}

type MantineOptType = {value:string, label: string}