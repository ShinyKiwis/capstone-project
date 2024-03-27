import { useAuth } from "@/app/providers/AuthProvider";
import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const UnenrollModal = () => {
  const queryClient = useQueryClient();
  const { user, handleUserEnrollProject } = useAuth();
  const {refreshProjects} = useProjects();

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
      onCancel: () => {},
      onConfirm: async () => {
        axios.post("http://localhost:3500/users/student/unenroll", {
          studentId: user?.id
        })
        .then(async (res) =>{
          handleUserEnrollProject(-1)
          await queryClient.invalidateQueries({
            queryKey: ["projects"],
            refetchType: 'all'
          });
          refreshProjects()
          console.log(`Unenrolled`)
        })
        .catch((err) => console.error("Error unenrolling project:", err))
      },
    });

  return (
    <Button onClick={openDeleteModal} color="red">
      Unenroll
    </Button>
  );
};

export default UnenrollModal;
