"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const useRole = () => {
  const [roles, setRoles] = useState<Role[]>();
  // if (!roles)
  //   axios.get("http://localhost:3500/roles").then(function (response) {
  //     setRoles(response.data);
  //   });

  useEffect(() => {
    const storedRoles = sessionStorage.getItem("roles")
    if(storedRoles) {
      setRoles(JSON.parse(storedRoles))
    }
  }, [])
  
  return {
    roles,
    setRoles,
  };
};

export default useRole;
