import useUser from "../hooks/useUser";

const hasRole = (roleName: string) => {
  const user = useUser()
  for (const role of user.roles) {
    if (role!.name === roleName) {
      return true
    }
  }
  return false
}

export default hasRole;