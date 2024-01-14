import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useUser = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return {
      id: -1,
      name: "Loading",
      email: "Loading",
      username: "Loading",
      credits: -1,
      generation: -1,
      GPA: -1,
      enrolledAt: "Loading",
      roles: [],
      project: { code: -1 },
    };
  }
  const { user } = authContext;
  if (!user) {
    return {
      id: -1,
      name: "Loading",
      email: "Loading",
      username: "Loading",
      credits: -1,
      generation: -1,
      GPA: -1,
      enrolledAt: "Loading",
      roles: [],
      project: { code: -1 },
    };
  }
  return user;
};

export default useUser;
