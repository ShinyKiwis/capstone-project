"use client";
import { PageHeader } from "@/app/_components";
import DeadlineModal from "@/app/_components/Modals/DeadlineModal";
import { toggleNotification } from "@/app/lib/notification";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { Deadline, useDeadlines } from "@/app/providers/DeadlinesProvider";
import { Badge, Button, Card, Group, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

const DeadlineCard = ({ deadline }: { deadline: Deadline }) => {
  const { deadlines, setDeadlines } = useDeadlines();
  const closeModal = () =>
    openConfirmModal({
      title: (
        <Text size="md" c="red" fw={600}>
          Delete deadline {deadline?.name} for semester {deadline?.semester} ?
        </Text>
      ),
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete {deadline?.name} for semester{" "}
          {deadline?.semester} ? This action can't be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => {
        setDeadlines(
          deadlines.filter(
            (existingDeadline) =>
              existingDeadline.name != deadline?.name ||
              existingDeadline.semester != deadline?.semester,
          ),
        );
        toggleNotification(
          `Delete deadline ${deadline?.name} in semester ${deadline?.semester} successfully`,
          `Deadline ${deadline?.name} in semester ${deadline?.semester} is deleted. This action can't be undone, recreate if necessary.`,
          "success",
        );
      },
    });
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="mt-4 self-stretch shadow transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <Badge variant="light" color="blue">
        Semester {deadline.semester}
      </Badge>
      <Text fw={600} c="blue" size="lg">
        {deadline.name}
      </Text>
      <Text>
        <b>Start:</b>{" "}
        {deadline.startsAt.toLocaleString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </Text>
      <Text>
        <b>End:</b>{" "}
        {deadline.endsAt.toLocaleString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </Text>
      <Group justify="flex-end">
        <DeadlineModal deadline={deadline} Icon={AiOutlineEdit} action="Edit" />
        {/* <Button variant="filled" color="red" onClick={closeModal}>
          Delete
        </Button> */}
      </Group>
    </Card>
  );
};

const DeadlinesManagement = () => {
  const { deadlines } = useDeadlines();
  const {buildBreadCrumbs} = useBreadCrumbs();
	buildBreadCrumbs();
  return (
    <div className="flex h-full flex-col gap-1 items-start">
      <PageHeader pageTitle="Deadline Management"/>
      {/* <DeadlineModal Icon={IoMdAdd} action="Create deadline" /> */}
      {/* <Text size="lg" fw={600} c="blue" className="mt-4">
        Deadlines
      </Text> */}
      {deadlines.map((deadline) => (
        <DeadlineCard deadline={deadline} />
      ))}
    </div>
  );
};

export default DeadlinesManagement;
