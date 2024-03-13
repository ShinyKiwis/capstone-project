import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

const UnenrollModal = () => {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="red" fw={600}>
          Please confirm your enrollment
        </Text>
      ),
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to unenroll from this project?
        </Text>
      ),
      labels: { confirm: "Unenroll", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Button onClick={openDeleteModal} color="red">
      Unenroll
    </Button>
  );
};

export default UnenrollModal;
