"use client";

import { Button } from "@mantine/core";
import React from "react";

interface UserFilterButtonsProps {
  selectedFilter: string;
  filterHandler: (role: Role) => void;
}

function UserFilterButtons({
  selectedFilter,
  filterHandler,
}: UserFilterButtonsProps) {
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
  //   const filterOptions = [roles[4], roles[1], roles[0]]    // pick out some roles at any orders as filter options

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="text-lg font-medium">Users group:</div>
      <div className="flex gap-6 flex-wrap">
      	<Button
      	  variant={selectedFilter === "All" ? "normal" : "outline"}
      	  className="px-4"
      	  onClick={() => filterHandler({ id: 0, name: "All" })}
      	>
      	  All Users
      	</Button>
      	{roles &&
      	  roles.map((role) => {
      	    return (
      	      <Button
      	        variant={selectedFilter === role.name ? "normal" : "outline"}
      	        className="px-4"
      	        onClick={() => filterHandler(role)}
                key={role.id}
      	      >
      	        {role.name}s
      	      </Button>
      	    );
      	  })}
      </div>
    </div>
  );
}

export default UserFilterButtons;
