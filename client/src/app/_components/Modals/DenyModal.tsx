import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button, Textarea, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent, useRef, useState } from "react";

const DenyModal = ({ targetProject }: { targetProject: Project }) => {
  const queryClient = useQueryClient();
  const {invalidateAndRefresh} = useProjects();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const openDeleteModal = (e:SyntheticEvent) =>{
    e.stopPropagation();
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="red" fw={600}>
          Please confirm your denial
        </Text>
      ),
      centered: true,
      children: (
        <div>
          <Text size="sm" pb="1rem">
            Are you sure you want to deny this project?
          </Text>
          <Textarea
            label="Deny reason"
            description="Denial reason will be sent to the project owner"
            placeholder="Input deny reason"
            autosize
            minRows={4}
            maxRows={8}
            ref={inputRef}
          />
        </div>
      ),
      labels: { confirm: "Deny", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: async () => {
        console.log(
          `Rejected project ${targetProject.code} with reason:${inputRef.current?.value}`,
        );
        axios
          .patch(
            `http://localhost:3500/projects/${targetProject.code}/status`,
            { status: "REJECTED" },
          )
          .then(async (res) => {
            invalidateAndRefresh();
          })
          .catch((err) => console.error("Error denying project:", err));
      },
    });
  }

  return (
    <Button onClick={openDeleteModal} color="red">
      Deny
    </Button>
  );
};

export default DenyModal;
