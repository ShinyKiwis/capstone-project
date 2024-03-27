import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { FaRegCircleCheck } from "react-icons/fa6";
import React from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useProjects } from "@/app/providers/ProjectProvider";

const ApproveAllModal = () => {
  const queryClient = useQueryClient();
  const {refreshProjects} = useProjects();

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
      onCancel: () => {},
      onConfirm: async () => {
        axios.post(`http://localhost:3500/approve/all`)
        .then(async (res) =>{
          await queryClient.invalidateQueries({
            queryKey: ["projects"],
            refetchType: 'all'
          });
          refreshProjects()
          console.log(`Approved all projects`, res)
        })
        .catch((err) => console.error("Error approving all projects:", err))
      },
    });

  return (
    <Button leftSection={<FaRegCircleCheck />} ms="md" onClick={openModal}>
      Approve all
    </Button>
  );
};

export default ApproveAllModal;
