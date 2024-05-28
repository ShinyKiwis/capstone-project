import { Text, Button, Checkbox, Group, TextInput, Modal } from "@mantine/core";
import { modals } from "@mantine/modals";
import React, { SyntheticEvent, useRef, useState } from "react";
import { toggleNotification } from "@/app/lib/notification";
import { AiOutlineFileWord } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import { AssessSchemeDetail } from "@/app/interfaces/Assessment.interface";

const FormExportModal = ({ targetScheme }: { targetScheme: AssessSchemeDetail }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedOptions, setSelectedOptions] = useState([
    "pi",
    "ranges",
    "input",
  ]);

  const handleExport = () => {
    toggleNotification(
      "Success",
      `Assessment form ${targetScheme.name} has been exported!`,
      "success",
    );
    close();
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        centered
        size="45%"
        padding="md"
        yOffset="8em"
        title={
          <Text size="lg" fw={600}>
            Export options
          </Text>
        }
      >
        <Checkbox.Group value={selectedOptions} onChange={setSelectedOptions}>
          <div className="mt-2 flex flex-col gap-2">
            <Checkbox value="pi" label="PIs" />
            <Checkbox value="ranges" label="Score ranges" />
            <Checkbox value="input" label="Score input" />
          </div>
        </Checkbox.Group>
        <Group justify="flex-end" gap="xs" mt="md">
          <Button
            onClick={() => {
              close();
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button variant="filled" onClick={handleExport}>
              Export
          </Button>
        </Group>
      </Modal>

      <Button
        w={"20rem"}
        leftSection={<AiOutlineFileWord size={20} />}
        classNames={{ inner: "justify-start px-2" }}
        onClick={open}
      >
        Export Assessment Form
      </Button>
    </div>
  );
};

export default FormExportModal;
