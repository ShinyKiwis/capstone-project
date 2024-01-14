"use client";

import { useState, useEffect } from "react";
import { useUser } from ".";

export interface Instructor {
  id: number;
  email: string;
  username: string;
  name: string;
}

const useInstructor = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const user = useUser();

  useEffect(() => {
    const storedInstructors = sessionStorage.getItem("instructors");
    if (storedInstructors) {
      setInstructors(
        JSON.parse(storedInstructors).filter((instructor: Instructor) => {
          return instructor.name != user.name;
        }),
      );
    }
  }, []);
  return {
    instructors,
    setInstructors,
  };
};

export default useInstructor;
