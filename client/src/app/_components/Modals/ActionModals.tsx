"use client";

import React, { useContext, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { Typography, Button } from "..";
import { ModalContext } from "@/app/providers/ModalProvider";
import { useUser } from "@/app/hooks";
import axios from "axios";

const RemovalModal = ({
  title,
  messages,
  buttonLabels,
  mainAction,
}: ActionModalProps) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return "No context set up for rejection modal";
  }
  const { toggleModal } = modalContextValue;

  return (
    <div className="flex w-fit max-w-[60vw] flex-col items-center">
      <div className="flex items-center gap-4">
        <IoIosWarning size={96} className="min-w-[5em] text-red" />
        <div>
          <Typography
            variant="h1"
            text={title}
            color="text-red"
            className="mb-2 text-2xl"
          />
          {messages?.map(function (msg, index) {
            return (
              <div
                className="mb-2 font-normal text-gray"
                key={index.toString()}
              >
                {msg}
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex gap-8">
        <Button
          isPrimary={true}
          variant="cancel"
          className="mt-6 w-44 py-2 text-lg"
          onClick={mainAction}
        >
          {buttonLabels[0]}
        </Button>
        <Button
          isPrimary={true}
          variant="close"
          className="mt-6 w-44 py-2 text-lg"
          onClick={() => toggleModal(false)}
        >
          {buttonLabels[1]}
        </Button>
      </div>
    </div>
  );
};

const ProjDenyModal = () => {
  const [reason, setReason] = useState("");
  const user = useUser();
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return "No context set up for rejection modal";
  }
  const { toggleModal, modalProps } = modalContextValue;

  const handleDeny = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    axios.post("http://localhost:3500/projects/reject", {
      id: user.id,
      code: +modalProps.title,
      reason: reason,
    });
    toggleModal(false);
  };
  return (
    <div className="flex max-w-[60vw] flex-col items-center">
      <div className="flex items-center gap-4">
        <IoIosWarning size={96} className="min-w-[5rem] text-red" />
        <div>
          <Typography
            variant="h1"
            text="Deny this project ?"
            color="text-red"
            className="mb-2 text-2xl"
          />
          <div className="mb-2 font-normal text-gray">
            Send denial notification and reason to the project's supervisor.
          </div>
        </div>
      </div>
      <div>
        <textarea
          name="deny-reason"
          autoFocus={true}
          cols={60}
          rows={5}
          style={{ resize: "none" }}
          className="mt-2 rounded-lg border-2 border-gray px-2 py-2"
          onChange={(e) => setReason(e.target.value)}
        ></textarea>
      </div>
      <div className="flex gap-8">
        <Button
          isPrimary={true}
          variant="danger"
          className="mt-6 w-44 py-2 text-lg"
          onClick={handleDeny}
        >
          Deny
        </Button>
        <Button
          isPrimary={true}
          variant="close"
          className="mt-6 w-44 py-2 text-lg"
          onClick={() => toggleModal(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export { RemovalModal, ProjDenyModal };
