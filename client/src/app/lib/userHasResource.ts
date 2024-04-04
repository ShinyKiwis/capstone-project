import { useAuth } from "../providers/AuthProvider";

export function userHasResource(targetResource: string, currentUser?: User|null) {
  if (!currentUser){
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
    currentUser = useAuth().user;
  }
  if (!currentUser) return false;

  // console.log("GOt user:", currentUser)
  return currentUser.roles.some((role) =>
    role.resources.some((resource) => resource.name.includes(resourceStr)),
  );
}
