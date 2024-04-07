import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent } from "react";

const DeleteProjectModal = ({targetProject}:{targetProject: Project}) => {
  const {invalidateAndRefresh} = useProjects();

  const openModal = (e:SyntheticEvent) =>{
    e.stopPropagation();
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="gray" fw={600}>
          Please confirm deletion
        </Text>
      ),
      children: (
        <Text size="sm">
          Are you sure you want to delete this project? This cannot be undone!
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: async () => {
        axios.delete(`http://localhost:3500/projects/${targetProject.code}`)
        .then(async (res) =>{
          invalidateAndRefresh();
          console.log(`Deleted project ${targetProject.code}`)
        })
        .catch((err) => console.error("Error deleting project:", err))
      },
    });
  }

  return (
    <Button color="red" onClick={openModal}>
      Delete
    </Button>
  );
};

export default DeleteProjectModal;
