import { projectData } from "@/app/(main)/project/projectData";
import { useAuth } from "@/app/providers/AuthProvider";
import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { SyntheticEvent } from "react";
import { toggleNotification } from "@/app/lib/notification";

const EnrollModal = ({ targetProject }: { targetProject: Project }) => {
  const { user, handleUserEnrollProject } = useAuth();
  const { invalidateAndRefresh } = useProjects();

  async function submitEnroll() {
    axios
      .post("http://localhost:3500/users/student/enroll", {
        studentId: user?.id,
        projectCode: targetProject.code,
      })
      .then(async (res) => {
        invalidateAndRefresh();
        handleUserEnrollProject(targetProject.code);
        toggleNotification('Enroll Success', `Successfully enrolled into project ${targetProject.name}!`, 'success')
        // console.log(`Enrolled into project ${targetProject.code}`)
      })
      .catch((err) => {
        console.error("Error enrolling project:", err)
        toggleNotification('Enroll Failed', `Cannot enroll into project!`, 'danger')
      });
  }

  const openModal = async (e: SyntheticEvent, enrolledCode: number) => {
    e.stopPropagation();
    let currentEnrolled = await axios.get(`http://localhost:3500/projects/${enrolledCode}`)
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="blue" fw={600}>
          Confirm enrollment
        </Text>
      ),
      children: (
        <>
          <Text size="sm">
            You are already enrolled into project:
          </Text>
          <Text size="sm" c='blue'>
            {currentEnrolled.data.code} - {currentEnrolled.data.name}
          </Text>
          <Text size="sm">
            Do you want to unenroll from it and enroll into new project:
          </Text>
          <Text size="sm" c='blue'>
          {targetProject.code} - {targetProject.name}?
          </Text>
        </>
        
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => {},
      onConfirm: submitEnroll,
    });
  };

  return (
    user?
    <Button
      onClick={(e) => {
        if (user.project?.code && user.project.code !== -1)
          openModal(e, user.project.code);
        else
          submitEnroll();
      }}
    >
      Enroll
    </Button>
    :
    <span>Loading user</span>
  );
};

export default EnrollModal;
