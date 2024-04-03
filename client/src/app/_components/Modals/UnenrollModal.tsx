import { useAuth } from "@/app/providers/AuthProvider";
import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent } from "react";
import { toggleNotification } from "@/app/lib/notification";

const UnenrollModal = ({ targetProject }: { targetProject: Project }) => {
  const { user, handleUserEnrollProject } = useAuth();
  const {invalidateAndRefresh} = useProjects();

  const openDeleteModal = (e:SyntheticEvent) =>{
    e.stopPropagation();
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="red" fw={600}>
          Confirm Unenrollment
        </Text>
      ),
      centered: true,
      children: (
        <>
          <Text size="sm">
            Are you sure you want to unenroll from this project?
          </Text>
          <Text size="sm" c='blue'>
            {targetProject.code} - {targetProject.name}
          </Text>
        </>
      ),
      labels: { confirm: "Unenroll", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: async () => {
        axios.post("http://localhost:3500/users/student/unenroll", {
          studentId: user?.id
        })
        .then(async (res) =>{
          handleUserEnrollProject(-1);
          invalidateAndRefresh();
          toggleNotification('Success', `Successfully unenroll from project ${targetProject.name}`, 'success')
          console.log(`Unenrolled`)
        })
        .catch((err) => {
          console.error("Error unenrolling project:", err);
          toggleNotification("Error","Unenrollment failed!", 'danger')
        })
      },
    });
  }

  return (
    <Button onClick={openDeleteModal} color="red">
      Unenroll
    </Button>
  );
};

export default UnenrollModal;
