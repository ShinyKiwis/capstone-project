import useUser from "../hooks/useUser";

const useHasRole = (expectedRole: string) => {
  const user = useUser()
  const hasRole = user.roles.find(role => role.name.toLowerCase() == expectedRole)
  return hasRole
}

export default useHasRole;