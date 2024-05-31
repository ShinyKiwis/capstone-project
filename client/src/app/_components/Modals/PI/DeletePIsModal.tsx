import { Button } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { toggleNotification } from "@/app/lib/notification";
import { PI } from "@/app/interfaces/Program.interface";

const DeletePIsModal = ({
  selectedRecords,
  PIs,
  setPIs,
  programId,
  versionId,
  soId
}: {
  selectedRecords: PI[];
  PIs: PI[];
  setPIs: Dispatch<SetStateAction<PI[]>>;
  programId: string;
  versionId: string;
  soId: string;
}) => {

  const deletePIs = () => {
    let newPIsList = PIs.filter((existedPI: PI) => !selectedRecords.includes(existedPI))
    setPIs(newPIsList);
    selectedRecords.forEach(async record => {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${soId}/performance-indicators/${record.id}`)
    })
    toggleNotification(
      `Deletion Successful`,
      `${selectedRecords.length} PIs have been deleted from the program`,
      "success",
    );
  }
  const openModal = () =>
    modals.openConfirmModal({
      title: <Text fw={600}>Delete all selected PIs ?</Text>,
      centered: true,
      children: (
        <Text size="sm">
          The following PIs will be deleted:
          {selectedRecords.map((record) => (
            <Text key={record.id}>{record.name} - {record.description}</Text>
          ))}
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => deletePIs(),
    });
  return (
    <Button
      onClick={openModal}
      leftSection={<IconTrash size={16} />}
      disabled={selectedRecords.length === 0}
      color="red"
    >
      Delete selected PIs
    </Button>
  );
};

export default DeletePIsModal;
