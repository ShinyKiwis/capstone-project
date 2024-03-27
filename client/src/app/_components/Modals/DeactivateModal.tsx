import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const DeactivateModal = ({targetProject}:{targetProject: Project}) => {
  const queryClient = useQueryClient();
  const {refreshProjects} = useProjects();

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
      onCancel: () => {},
      onConfirm: async () => {
        axios.patch(`http://localhost:3500/projects/${targetProject.code}/status`, {status: "DEACTIVATED"})
        .then(async (res) =>{
          await queryClient.invalidateQueries({
            queryKey: ["projects"],
            refetchType: 'all'
          });
          refreshProjects()
          console.log(`Deactivated project ${targetProject.code}`)
        })
        .catch((err) => console.error("Error deactivating project:", err))
      },
    });

  return (
    <Button color="gray" onClick={openModal}>
      Deactivate
    </Button>
  );
};

export default DeactivateModal;
