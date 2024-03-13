import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

const DeactivateModal = () => {
  const openModal = () =>
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="gray" fw={600}>
          Please confirm your action
        </Text>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to deactivate this project? Please confirm to
          proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "gray" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Button color="gray" onClick={openModal}>
      Deactivate
    </Button>
  );
};

export default DeactivateModal;
