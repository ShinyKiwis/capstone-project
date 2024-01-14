import React, { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "@/app/providers/ModalProvider";

const DenyButton = ({
  className,
  projectId,
}: {
  className: string;
  projectId: number;
}) => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) return <></>;
  const { toggleModal, setModalType, setModalProps } = modalContext;
  const handleDenyProjectClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setModalType("project_denial");
    setModalProps({ title: projectId.toString() });
    toggleModal(true);
  };
  return (
    <Button
      isPrimary
      variant="danger"
      className={className}
      onClick={handleDenyProjectClick}
    >
      Deny
    </Button>
  );
};

export default DenyButton;
