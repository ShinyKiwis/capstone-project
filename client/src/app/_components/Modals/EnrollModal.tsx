import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";

const EnrollModal = ({ targetProject }: { targetProject: Project }) => {
  const openModal = () =>
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="blue" fw={600}>
          Please confirm your enrollment
        </Text>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to enroll in this project? Please confirm to
          proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });

  return <Button onClick={openModal}>Enroll</Button>;
};

export default EnrollModal;
