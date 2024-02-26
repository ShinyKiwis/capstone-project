"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const useRole = () => {
  const [roles, setRoles] = useState<Role[]>();
  if (!roles)
    axios.get("http://localhost:3500/roles").then(function (response) {
      setRoles(response.data);
    });

  // useEffect(() => {
  //   // const storedRoles = sessionStorage.getItem("Roles")   // how, or API call ?
  //   const storedRoles = [
  //     {
  //       id: 1,
  //       name: "Student",
  //     },
  //     {
  //       id: 2,
  //       name: "Lecturer",
  //     },
  //     {
  //       id: 3,
  //       name: "Department Head",
  //     },
  //     {
  //       id: 4,
  //       name: "Program Chair",
  //     },
  //     {
  //       id: 5,
  //       name: "Dean",
  //     },
  //   ];

  //   if (storedRoles) {
  //     // setRoles(JSON.parse(storedRoles));
  //     // setRoles(storedRoles);
  //   }
  // }, []);
  return {
    roles,
    setRoles,
  };
};

export default useRole;
