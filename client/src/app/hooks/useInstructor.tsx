"use client";

import { useState, useEffect } from "react";

const useInstructor = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);

  useEffect(() => {
    // const storedInstructors = sessionStorage.getItem("instructors");
    // if (storedInstructors) {
    //   setInstructors(
    //     JSON.parse(storedInstructors).filter((instructor: Instructor) => {
    //       return instructor.name != user.name;
    //     }),
    //   );
    // }

    setInstructors([
      {
        id: 2053102,
        name: "Trần Bình",
        username: "binhtran",
        email: "user2053102@example.com",
      },
      {
        id: 2053106,
        name: "Huỳnh Khánh",
        email: "user2053106@example.com",
        username: 'huynhkhanh123'
      },
      {
        id: 2053111,
        name: "Bùi An",
        email: "user2053111@example.com",
        username: "buoian12"
      },
      {
        id: 2053116,
        name: "Lý Khánh",
        email: "user2053116@example.com",
        username: "khanhLy"
      },
    ])
  }, []);
  return {
    instructors,
    setInstructors,
  };
};

export default useInstructor;
