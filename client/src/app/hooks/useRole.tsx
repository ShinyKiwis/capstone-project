"use client"

import {useState, useEffect} from 'react'

const useRole = () => {
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    // const storedRoles = sessionStorage.getItem("Roles")   // how, or API call ?
    const storedRoles = [
      {
        id: 1,
        name: "Student",
      },
      {
        id: 2,
        name: "Lecturer",
      },
      {
        id: 3,
        name: "DepartmentHead",
      },
      {
        id: 4,
        name: "ProgramChair",
      },
    ];

    if(storedRoles) {
      // setRoles(JSON.parse(storedRoles));
      setRoles(storedRoles);
    }
  }, [])
  return {
    roles,
    setRoles
  }
}

export default useRole