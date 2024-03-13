import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

const DenyModal = () => {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="red" fw={600}>
          Please confirm your denial
        </Text>
      ),
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to deny this project?</Text>
      ),
      labels: { confirm: "Unenroll", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Button onClick={openDeleteModal} color="red">
      Deny
    </Button>
  );
};

export default DenyModal;
