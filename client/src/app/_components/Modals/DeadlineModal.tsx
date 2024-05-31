"use client";
import { useDisclosure } from "@mantine/hooks";
import { Button, Group, Modal, TextInput, Text } from "@mantine/core";
import { Deadline, useDeadlines } from "@/app/providers/DeadlinesProvider";
import { DateTimePicker } from "@mantine/dates";
import React, { useState } from "react";
import { toggleNotification } from "@/app/lib/notification";
import axios from "axios";

interface DeadlineModalProps {
  deadline?: Deadline;
  Icon?: any;
  action: string;
}

const DeadlineModal = ({ Icon, action, deadline }: DeadlineModalProps) => {
  const { deadlines, setDeadlines } = useDeadlines();
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState(deadline?.name || "");
  const [semester, setSemester] = useState(deadline?.semester || "");
  const [startsAt, setStartsAt] = useState<Date>(
    deadline?.startsAt || new Date(),
  );
  const [endsAt, setEndsAt] = useState<Date>(deadline?.endsAt || new Date());
  const [nameError, setNameError] = useState("");
  const [semesterError, setSemesterError] = useState("");

  // const handleCreateDeadline = () => {
  //   let hasError = false;
  //   if (name.length === 0) {
  //     hasError = true;
  //     setNameError("Name is required");
  //   }

  //   if (semester.length === 0) {
  //     hasError = true;
  //     setSemesterError("Semester is required");
  //   }

  //   if (!hasError) {
  //     if (
  //       deadlines.some(
  //         (deadline) =>
  //           deadline.name === name && deadline.semester === semester,
  //       )
  //     ) {
  //       toggleNotification(
  //         `Deadline ${name} existed in semester ${semester}`,
  //         `The deadline ${name} is existed in semester ${semester}. Please try another.`,
  //         "danger",
  //       );
  //     } else {
  //       setDeadlines([
  //         ...deadlines,
  //         {
  //           name,
  //           semester,
  //           startsAt,
  //           endsAt,
  //         },
  //       ]);
  //       toggleNotification(
  //         `Create ${name} in semester ${semester} successfully`,
  //         `The deadline for event ${name} in semester ${semester} has been created successfully.`,
  //         "success",
  //       );
  //     }
  //     setNameError("");
  //     setSemesterError("");
  //     setName("");
  //     setSemester("");
  //     setStartsAt(new Date());
  //     setEndsAt(new Date());
  //     close();
  //   }
  // };

  const handleUpdateDeadline = () => {
    let hasError = false;
    if (name.length === 0) {
      hasError = true;
      setNameError("Name is required");
    }

    if (semester.length === 0) {
      hasError = true;
      setSemesterError("Semester is required");
    }

    if (!hasError) {
      // if (
      //   deadlines.some(
      //     (deadline) =>
      //       deadline.name === name && deadline.semester === semester,
      //   )
      // ) {
      //   toggleNotification(
      //     `Deadline ${name} existed in semester ${semester}`,
      //     `The deadline ${name} is existed in semester ${semester}. Please try another.`,
      //     "danger",
      //   );
      // } else {
      setDeadlines(
        deadlines.map((updateDeadline) => {
          if (
            updateDeadline.name == deadline?.name &&
            updateDeadline.semester == deadline?.semester
          ) {
            axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/registrations/${deadline.id}`,{
              semester: {
                year: 2023,
                no: 1
              },
              name: name,
              startDate: startsAt,
              endDate: endsAt
            })
            .then(res => {
              toggleNotification(
                `Update ${name} in semester ${semester} successfully`,
                `The deadline for event ${name} in semester ${semester} has been updated successfully.`,
                "success",
              );
            })
            .catch(err => {
              console.log("Err updating deadline:", err);
              toggleNotification(
                `Error`,
                `Updating deadline failed.`,
                "danger",
              );
            })
            let id = deadline.id;
            return {
              id,
              name,
              semester,
              startsAt,
              endsAt,
            };
          }
          return updateDeadline;
        }),
      );
      // }
      close();
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text size="lg" c="blue" fw={600}>
            {action} deadline
          </Text>
        }
        centered
      >
        <TextInput
          required
          value={name}
          error={nameError}
          inputWrapperOrder={["label", "error", "input"]}
          onChange={(event) => setName(event.currentTarget.value)}
          label={
            <Text size="md" fw={600} className="mb-2">
              Name
            </Text>
          }
          classNames={{
            label: "flex",
          }}
          placeholder="E.g. Specialized Project Registration"
          py="xs"
        />
        <TextInput
          required
          value={semester}
          error={semesterError}
          inputWrapperOrder={["label", "error", "input"]}
          onChange={(event) => setSemester(event.currentTarget.value)}
          label={
            <Text size="md" fw={600} className="mb-2">
              Semester
            </Text>
          }
          classNames={{
            label: "flex",
          }}
          placeholder="E.g. 223"
          py="xs"
        />
        <DateTimePicker
          defaultValue={startsAt}
          onChange={(value) =>
            value ? setStartsAt(value) : setStartsAt(new Date())
          }
          label={
            <Text size="md" fw={600} className="mb-2">
              Starts at
            </Text>
          }
          placeholder="Pick date and time"
          py="xs"
        />
        <DateTimePicker
          defaultValue={endsAt}
          onChange={(value) =>
            value ? setEndsAt(value) : setEndsAt(new Date())
          }
          label={
            <Text size="md" fw={600} className="mb-2">
              Ends at
            </Text>
          }
          placeholder="Pick date and time"
          py="xs"
        />
        <Group justify="flex-end" gap="xs">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button
            variant="filled"
            onClick={
              action.toLowerCase() === "edit"
                ? handleUpdateDeadline : ()=>{}
                // : handleCreateDeadline
            }
          >
            {action.toLowerCase() === "edit" ? "Update" : "Create"}
          </Button>
        </Group>
      </Modal>
      <Button variant="filled" leftSection={<Icon />} onClick={open}>
        {action}
      </Button>
    </>
  );
};

export default DeadlineModal;
