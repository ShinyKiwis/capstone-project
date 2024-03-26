"use client";
import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

export interface Role {
  id?: number;
  roleName: string;
  resources: string[];
}

interface RolesContextType {
  roles: Role[];
  setRoles: (arg: Role[]) => void;
  syncRoles: (
    action: string,
    roleName: string,
    resources: string[],
    id?: number,
  ) => void;
  deleteRole: (id?: number) => void;
}

export const RolesContext = createContext<RolesContextType | null>(null);

const RolesProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_ROLES_URL!);
      const parsedRoles: Role[] = [];
      // console.log("FETCHROLES: ", response.data);
      response.data.forEach((role: any) => {
        parsedRoles.push({
          id: role.id,
          roleName: role.name,
          resources: role.resources,
        });
      });
      setRoles(parsedRoles);
    };
    fetchRoles();
  }, []);

  const syncRoles = async (
    action: string,
    roleName: string,
    resources: string[],
    id?: number,
  ) => {
    if (action == "create") {
      const response = await axios.post(process.env.NEXT_PUBLIC_ROLES_URL!, {
        name: roleName,
        resources: resources,
      });
      setRoles([
        ...roles,
        {
          id: response.data.id,
          roleName: roleName,
          resources: resources,
        },
      ]);
      return response.data;
    } else {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_ROLES_URL!}/${id}`,
        {
          name: roleName,
          resources: resources,
        },
      );
    }
  };

  const deleteRole = async (id?: number) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_ROLES_URL!}/${id}`,
    );
  };
  return (
    <RolesContext.Provider value={{ roles, setRoles, syncRoles, deleteRole }}>
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
