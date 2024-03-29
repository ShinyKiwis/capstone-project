// A function to get common branches between selected program(s)
export function getBranchOptions(
  selectedPrograms: string[],
  programBranches: ProgramBranch[],
) {
  if (Array.isArray(selectedPrograms) && selectedPrograms.length === 0)
    return [];
  if (programBranches.length === 0) return [];

  const programBranchesFiltered = programBranches.filter((program) =>
    selectedPrograms.includes(program.id.toString()),
  );

  const branchesArrays = programBranchesFiltered.map(
    (program) => program.branches,
  );

  // Find common branches
  const commonBranches = branchesArrays.reduce(
    (accumulator, currentBranches) => {
      return accumulator.filter((branch) =>
        currentBranches.some((currentBranch) => currentBranch.id === branch.id),
      );
    },
  );
  const mappedBranches = commonBranches.map((branch) => ({
    label: branch.name,
    value: branch.id.toString(),
  }));

  return mappedBranches;
}
