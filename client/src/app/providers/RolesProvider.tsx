"use client"
import { useState, createContext, useContext } from "react";

export interface Role {
  roleName: string;
  resources: string[];
}

interface RolesContextType {
  roles: Role[];
  setRoles: (arg: Role[]) => void;
}

export const RolesContext = createContext<RolesContextType | null>(null);

const RolesProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<Role[]>([]);
  return (
    <RolesContext.Provider value={{ roles, setRoles }}>
      {children}
    </RolesContext.Provider>
  );
};

export const useRoles = () => {
  const context = useContext(RolesContext);
  if (!context) {
    throw new Error("useRoles must be used inside the RolesProvider");
  }

  return context;
};

export default RolesProvider;
