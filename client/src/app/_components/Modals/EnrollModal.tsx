import { projectData } from "@/app/(main)/project/projectData";
import { useAuth } from "@/app/providers/AuthProvider";
import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { SyntheticEvent } from "react";

const EnrollModal = ({ targetProject }: { targetProject: Project }) => {
  const { user, handleUserEnrollProject } = useAuth();
  const { invalidateAndRefresh} = useProjects();

  const openModal = (e:SyntheticEvent) =>{
    e.stopPropagation();
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
      onCancel: () => {},
      onConfirm: async () => {
        axios.post("http://localhost:3500/users/student/enroll", {
          studentId: user?.id,
          projectCode: targetProject.code,
        })
        .then(async (res) =>{
          invalidateAndRefresh();
          handleUserEnrollProject(targetProject.code);
          // console.log(`Enrolled into project ${targetProject.code}`)
        })
        .catch((err) => console.error("Error enrolling project:", err))
      },
    });
  }

  return <Button onClick={openModal}>Enroll</Button>;
};

export default EnrollModal;
