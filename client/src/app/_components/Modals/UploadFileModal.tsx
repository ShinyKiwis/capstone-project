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
import { FaFileWord, FaFilePdf, FaFileExcel } from "react-icons/fa";
import axios from "axios";
import { toggleNotification } from "@/app/lib/notification";

const getFileIcon = (fileType: string) => {
  if (fileType.includes("word")) {
    return <FaFileWord size={20} />;
  } else if (fileType.includes("pdf")) {
    return <FaFilePdf size={20} />;
  } else if (fileType.includes("xls")) {
    return <FaFileExcel size={20} />;
  }
  return <FiFileText size={20} />;
};

const UploadFileModal = ({
  object,
  uploadPath,
  setFileUploaded,
}: {
  object: string;
  uploadPath: string;
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
      formData.append("file", file);
    });
    const response = await axios.post(
      uploadPath,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    console.log("Upload response:", response)
    const { failure, error } = response.data;
    if (failure || error) {
      toggleNotification(
        `Upload unsucessful`,
        "Check file format and data",
        "danger",
      );
    }
    else {
      toggleNotification(
        `Uploaded sucessfully`,
        `New ${object} added to the system`,
        "success",
      );
      setFileUploaded(true);
    }
    close();
  };

  const handleDownloadTemplateFile = async () => {
    var response = null;
    switch (object) {
      case 'project':      
        response = await fetch("ProjectTemplate.docx");
        break;
      case 'SOs':     
        console.log("SOs case") 
        response = await fetch("SOs_template.xlsx");
        break;
      case 'PIs':      
        response = await fetch("PIs_template.xlsx");
        break;
      default:
        response = await fetch("ProjectTemplate.docx");
        break;
    }
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    // Update later with switch case for different objects
    link.download = `${object}_template.xlsx`;
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
          accept={[MIME_TYPES.doc, MIME_TYPES.docx, MIME_TYPES.csv, MIME_TYPES.xls, MIME_TYPES.xlsx]}
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
        <Text size="sm" my='sm'>Accepted types: .xls, .xlsx, .csv</Text>
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
      >
        Upload {object}
      </Button>
    </>
  );
};

export default UploadFileModal;
