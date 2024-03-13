import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { FaRegCircleCheck } from "react-icons/fa6";
import React from "react";

const ApproveAllModal = () => {
  const openModal = () =>
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="blue" fw={600}>
          Please confirm your action
        </Text>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to approve all projects? Please confirm to
          proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return (
    <Button leftSection={<FaRegCircleCheck />} ms="md" onClick={openModal}>
      Approve all
    </Button>
  );
};

export default ApproveAllModal;
