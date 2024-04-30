import { useProjects } from "@/app/providers/ProjectProvider";
import { Text, Button } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { SyntheticEvent } from "react";
import { IoIosRemoveCircleOutline } from "react-icons/io";

const RemoveCriterionModal = ({
  criterionNum,
  removeFunction
}: {
  criterionNum: number;
  removeFunction: ()=>void;
}) => {
  const { invalidateAndRefresh } = useProjects();

  const openModal = (e: SyntheticEvent) => {
    e.stopPropagation();
    modals.openConfirmModal({
      title: (
        <Text size="lg" c="gray" fw={600}>
          Remove criterion {criterionNum}?
        </Text>
      ),
      children: (
        <Text size="sm">
          Contents and configurations of this criterion will be discarded
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: removeFunction,
    });
  };

  return (
    <Button variant="transparent" c={"red"} px={0} py={0} onClick={openModal}>
      <IoIosRemoveCircleOutline size={25} />
    </Button>
  );
};

export default RemoveCriterionModal;
