import React, { useContext } from "react";
import Button from "./Button";
import { AuthContext } from "@/app/providers/AuthProvider";

const LogoutButton = () => {
  const authContext = useContext(AuthContext)
  const handleLogout = () => {
    authContext?.logout()
  }
  return (
    <Button
      isPrimary
      variant="danger"
      className="mx-auto mt-4 block px-4 py-2"
      onClick={() => handleLogout()}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
