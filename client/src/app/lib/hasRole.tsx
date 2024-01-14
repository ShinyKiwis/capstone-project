import useUser from "../hooks/useUser";

const hasRole = (expectedRole: string) => {
  const user = useUser()
  return user.roles.find(role => role.name.toLowerCase() == expectedRole)
}

export default hasRole;