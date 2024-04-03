export const isStudent = (user: User|null) => {
  // console.log("user:", user)
  if (!user) return false;
  return user.roles.length === 1 &&  user.roles[0].name === "Student";
};

