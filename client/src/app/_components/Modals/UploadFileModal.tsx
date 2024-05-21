"use client";
import {
  Text,
  Group,
  Button,
  rem,
  Modal,
  Container,
  Badge,
  CloseButton,
  ScrollArea,
} from "@mantine/core";
import { Dropzone, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { useDisclosure } from "@mantine/hooks";
import { MdFileDownload, MdUploadFile } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FiFileText } from "react-icons/fi";
import { useState } from "react";
import { FaFileWord, FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { toggleNotification } from "@/app/lib/notification";

const getFileIcon = (fileType: string) => {
  if (fileType.includes("word")) {
    return <FaFileWord size={20} />;
  } else if (fileType.includes("pdf")) {
    return <FaFilePdf size={20} />;
  }
  return <FiFileText size={20} />;
};

const UploadFileModal = ({
  object,
  setFileUploaded,
}: {
  object: string;
  setFileUploaded: (arg: boolean) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleDeleteFile = (filename: string) => {
    setFiles(files.filter((file) => file.name != filename));
  };

  const handleUploadFiles = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    const response = await axios.post(
      process.env.NEXT_PUBLIC_UPLOAD_FILES_URL!,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    const { success, failure } = response.data;
    if (failure) {
      toggleNotification(
        `${failure} files uploaded unsucessfully`,
        "Try to contact admin and check the template format",
        "danger",
      );
    }
    if (success) {
      toggleNotification(
        `${success} files uploaded sucessfully`,
        `${success} files are uploaded and created successfully`,
        "success",
      );
    }
    setFileUploaded(true);
    close();
  };

  const handleDownloadTemplateFile = async () => {
    const response = await fetch("ProjectTemplate.docx");
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Update later with switch case for different objects
    link.download = "Project Template.docx";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Modal
        size="45%"
        yOffset="4em"
        centered
        opened={opened}
        onClose={close}
        title={
          <Text size="lg" c="blue" fw={600}>
            Upload {object} files
          </Text>
        }
      >
        <Button
          mb={12}
          leftSection={<MdFileDownload size={20} />}
          onClick={handleDownloadTemplateFile}
        >
          Download {object} template
        </Button>
        <Dropzone
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={[MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx, MIME_TYPES.csv]}
          onDrop={(newFiles) => {
            setFiles((currentFiles) => [...currentFiles, ...newFiles]);
          }}
          className="border-2"
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <FiUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <RxCross2
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <FiFileText
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag files here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
        <Container px={0} className="my-4">
          <ScrollArea.Autosize mah={250}>
            {files.map((file) => (
              <Badge
                className="flex justify-between normal-case"
                fullWidth
                key={file.name}
                variant="light"
                rightSection={
                  <CloseButton
                    size={20}
                    onClick={() => handleDeleteFile(file.name)}
                    c="blue"
                  />
                }
                radius="sm"
                size="lg"
                py={18}
                my={8}
              >
                <span className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  {file.name}
                </span>
              </Badge>
            ))}
          </ScrollArea.Autosize>
        </Container>
        <Group justify="flex-end" gap="xs">
          <Button onClick={close} variant="outline">
            Cancel
          </Button>
          <Button variant="filled" onClick={handleUploadFiles}>
            Upload
          </Button>
        </Group>
      </Modal>
      <Button
        variant="filled"
        leftSection={<MdUploadFile size={20} />}
        onClick={open}
        ms="md"
      >
        Upload {object}
      </Button>
    </>
  );
};

export default UploadFileModal;
