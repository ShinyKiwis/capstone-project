import React, { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "@/app/providers/ModalProvider";
import axios from "axios";
import { useUser } from "@/app/hooks";

const ApproveButton = ({
  projectId,
  className,
}: {
  projectId: number;
  className: string;
}) => {
  const user = useUser()
  const modalContext = useContext(ModalContext);
  if (!modalContext) return <></>;
  const { toggleModal, setModalType } = modalContext;
  const handleApprove = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    axios.post("http://localhost:3500/projects/approve", {
      id: user.id,
      code: projectId
    })
    setModalType("project_approval");
    toggleModal(true);
  };
  return (
    <Button
      isPrimary
      variant="success"
      className={className}
      onClick={handleApprove}
    >
      Approve
    </Button>
  );
};

export default ApproveButton;
