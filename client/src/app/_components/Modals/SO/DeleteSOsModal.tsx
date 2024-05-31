import { Button } from "@mantine/core";
import React, { Dispatch, SetStateAction } from "react";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { toggleNotification } from "@/app/lib/notification";
import { SO } from "@/app/interfaces/Program.interface";

const DeleteSOsModal = ({
  selectedRecords,
  SOs,
  setSOs,
  programId,
  versionId
}: {
  selectedRecords: SO[];
  SOs: SO[];
  setSOs: Dispatch<SetStateAction<SO[]>>;
  programId: string;
  versionId: string;
}) => {

  const deleteSOs = () => {
    let newSOsList = SOs.filter((existedSO: SO) => !selectedRecords.includes(existedSO))
    setSOs(newSOsList);
    selectedRecords.forEach(async record => {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/programs/${programId}/versions/${versionId}/student-outcomes/${record.id}`)
    })
    toggleNotification(
      `Deletion Successful`,
      `${selectedRecords.length} SOs have been deleted from the program`,
      "success",
    );
  }
  const openModal = () =>
    modals.openConfirmModal({
      title: <Text fw={600}>Delete all selected SOs ?</Text>,
      centered: true,
      children: (
        <Text size="sm">
          The following SOs will be deleted:
          {selectedRecords.map((record) => (
            <Text key={record.id}>{record.name} - {record.description}</Text>
          ))}
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => {},
      onConfirm: () => deleteSOs(),
    });
  return (
    <Button
      onClick={openModal}
      leftSection={<IconTrash size={16} />}
      disabled={selectedRecords.length === 0}
      color="red"
    >
      Delete selected SOs
    </Button>
  );
};

export default DeleteSOsModal;
