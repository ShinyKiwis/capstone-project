"use client";
import { RoleModal, RoleCard, PageHeader } from "@/app/_components";
import { useRoles } from "@/app/providers/RolesProvider";
import { Grid, Text } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";

const Roles = () => {
  const { roles } = useRoles();
  return (
    <div className="flex h-full flex-col gap-3 items-start">
      <PageHeader pageTitle="Roles Management" />
      <RoleModal Icon={IoMdAdd} action="Create" />
      <Text size="lg" fw={600} c="blue" className="mt-4">
        Roles
      </Text>
      <Grid className="mt-2 self-stretch">
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
