"use client";
import { RoleModal, RoleCard } from "@/app/_components";
import { useRoles } from "@/app/providers/RolesProvider";
import { Grid, Text } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";

const Roles = () => {
  const {roles} = useRoles()
  return (
    <div>
      <RoleModal Icon={IoMdAdd} action="Create role" />
      <Text size="lg" fw={600} c="blue" className="mt-4">
        Roles
      </Text>
      <Grid className="mt-2">
        {roles.map((role) => (
          <Grid.Col key={role.roleName} span={2}>
            <RoleCard role={role} />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default Roles;
