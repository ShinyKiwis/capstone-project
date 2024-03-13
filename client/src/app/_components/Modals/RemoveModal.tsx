import React from "react";
import { Button, Modal } from "@mantine/core";
import { CiWarning } from "react-icons/ci";
import { CgClose } from "react-icons/cg";
import { FaRegTrashAlt } from "react-icons/fa";
import { IconType } from "react-icons/lib";

interface RemoveModalProps {
  opened: boolean;
  setOpen: (opened: boolean) => void;
  title: string;
  messages: string[];
  targetStrings?: string[];
  actionButtonTitle?: string;
  actionButtonIcon?: IconType
  actionFunction?: any;
  actionFuncParams?: any;
}

const RemoveModal = ({
  opened,
  setOpen,
  title,
  messages,
  targetStrings,
  actionButtonTitle = "Delete",
  actionButtonIcon : ActionIcon = FaRegTrashAlt,
  actionFunction,
  actionFuncParams,
}: RemoveModalProps) => {
  const ModalBody = () => {
    return (
      <>
        <div className="py-2 px-4">
          <div>
            {messages.map((msg, index) => (
              <div className="text-gray-500" key={index}>{msg}</div>
            ))}
          </div>
          <div className="my-1 px-2 max-h-52 overflow-auto">
            {targetStrings &&
              targetStrings.map((tarStr, index) => (
                <div className="text-blue-500" key={index}>{tarStr}</div>
              ))}
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-10 bg-gray-400 px-10 py-2">
          <Button
            variant="filled"
            color="red"
            onClick={() => {
              actionFunction && actionFunction(actionFuncParams);
            }}
            className="mt-2 px-2 py-1 drop-shadow-lg"
          >
            <ActionIcon size={20}/><span className="ml-2">{actionButtonTitle}</span>
          </Button>
          <Button
            variant="default"
            color="gray"
            onClick={() => {
              setOpen(false);
            }}
            className="mt-2 px-2 py-1 bg-white drop-shadow-lg"
          >
            <CgClose size={20}/><span className="ml-2">Cancel</span>
          </Button>
        </div>
      </>
    );
  };

  return (
    <Modal.Root
      opened={opened}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <div className="flex items-center gap-4">
              <CiWarning size={60} color="red" />
              <span className="text-xl font-semibold">{title}</span>
            </div>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body style={{ padding: 0 }}>
          <ModalBody />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default RemoveModal;
