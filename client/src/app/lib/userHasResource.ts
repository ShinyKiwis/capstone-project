import { useAuth } from "../providers/AuthProvider";

export function userHasResource(targetResource: string, currentUser?: User|null) {
  if (!currentUser){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentUser = useAuth().user;
  }
  if (!currentUser) return false;

  // console.log("GOt user:", currentUser)
  return currentUser.roles.some((role) =>
    role.resources.some((resource) => resource.name === targetResource),
  );
}

export function userResourcesIncludes(resourceStr: string, currentUser?: User|null) {
  if (!currentUser){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentUser = useAuth().user;
  }
  if (!currentUser) return false;

  // console.log("GOt user:", currentUser)
  return currentUser.roles.some((role) =>
    role.resources.some((resource) => resource.name.includes(resourceStr)),
  );
}

export function userHasRole(roleName?: string, roleId?: number, currentUser?: User|null){
  if (!currentUser){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentUser = useAuth().user;
  }
  if (!currentUser) return false;

  if (roleName){
    return currentUser.roles.some(role => role.name === roleName)
  }
  if (roleId){
    return currentUser.roles.some(role => role.id === roleId)
  }
  return false;
}