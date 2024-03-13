import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

const ApproveModal = () => {
  const openModal = () =>
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="green" fw={600}>
          Please confirm your action
        </Text>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to approve this project? Please confirm to
          proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "green" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Button color="green" onClick={openModal}>
      Approve
    </Button>
  );
};

export default ApproveModal;
