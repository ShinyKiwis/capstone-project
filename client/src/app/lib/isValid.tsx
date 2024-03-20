import { ReadonlyURLSearchParams } from "next/navigation";
import React from "react";
import { User } from "../providers/AuthProvider";

const isValid = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  user: User | null,
) => {
  if (user) {
    if (
      pathname === "/project/create" &&
      user?.resources.includes("create_projects")
    ) {
      return true;
    }
  }
  return false;
};

export default isValid;
