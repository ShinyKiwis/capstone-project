"use client";

import { useState, useEffect } from "react";

const useRole = () => {
  const [roles, setRoles] = useState<Role[]>();
  // if (!roles)
  //   axios.get("http://localhost:3500/roles").then(function (response) {
  //     setRoles(response.data);
  //   });

  useEffect(() => {
    // const storedRoles = sessionStorage.getItem("roles")
    // if(storedRoles) {
    //   setRoles(JSON.parse(storedRoles))
    // }
    const roles = [
      { id: 1, name: "Teacher" },
      { id: 2, name: "Student" },
      { id: 3, name: "Department Head" },
      { id: 4, name: "Program Chair" },
      { id: 5, name: "Dean" },
      // { id: 6, name: "Department Head1" },
      // { id: 7, name: "Program Chair2" },
      // { id: 8, name: "Dean3" },
    ];
    setRoles(roles)
  }, [])
  
  return {
    roles,
    setRoles,
  };
};

export default useRole;
