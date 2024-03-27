import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent } from "react";

const ApproveModal = ({targetProject}:{targetProject: Project}) => {
  const queryClient = useQueryClient();
  const {invalidateAndRefresh} = useProjects();

  const openModal = (e:SyntheticEvent) =>{
    e.stopPropagation();
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
      onCancel: () => {},
      onConfirm: async () => {
        let nextStatus = targetProject.status === "WAITING_FOR_DEPARTMENT_HEAD" ? "WAITING_FOR_PROGRAM_CHAIR" : "APPROVED";
        axios.patch(`http://localhost:3500/projects/${targetProject.code}/status`, {status: nextStatus})
        .then(async (res) =>{
          invalidateAndRefresh();
          console.log(`Approved project ${targetProject.code} to: ${nextStatus}`)
        })
        .catch((err) => console.error("Error approving project:", err))
      },
    });
  }
    

  return (
    <Button color="green" onClick={openModal}>
      Approve
    </Button>
  );
};

export default ApproveModal;
