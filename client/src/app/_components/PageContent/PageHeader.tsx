"use client";

import React, { useContext, useEffect } from "react";
import { Profile } from "..";
import { MdArrowDropDown } from "react-icons/md";
import { Avatar, Button, Popover, Stack, Text } from "@mantine/core";
import { useAuth } from "@/app/providers/AuthProvider";
import { getShortUserName } from "@/app/lib/getShortName";
import { IconLogout } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import useNavigate from "@/app/hooks/useNavigate";

const PageHeader = ({pageTitle}: {pageTitle: string}) => {
  // const { pageTitle } = usePageTitleContext();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const openModal = () =>
    modals.openConfirmModal({
      title: <Text fw={600}>Confirm logout</Text>,
      centered: true,
      children: <Text size="sm">Are you sure you want to logout ?</Text>,
      labels: { confirm: "Logout", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        setUser(null);
        sessionStorage.removeItem("user");
      },
    });
  
  return (
    <div className="relative flex w-full h-20 items-center gap-4">
      <Text size="xl" fw={700} c="blue">
        {pageTitle}
      </Text>
      <div className="ms-auto flex gap-4">
        {/* <button className="w-fit">
          <FaBell size={20} />
        </button> */}
        <Popover position="bottom-end" shadow="md" width={200}>
          <Popover.Target>
            <div className="flex items-center gap-2">
              <Profile username={user!.name} type="horizontal" />
              <MdArrowDropDown size={35} className="cursor-pointer" />
            </div>
          </Popover.Target>
          <Popover.Dropdown p={16}>
            <Stack align="center">
              <Avatar color="blue" size="lg">
                {getShortUserName(user!.name)}
              </Avatar>
              <Text fw={600} size="lg">
                {user?.name}
              </Text>
              <Button
                color="red"
                fullWidth
                leftSection={<IconLogout size={16} />}
                onClick={openModal}
              >
                Logout
              </Button>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </div>
    </div>
  );
};

export default PageHeader;
