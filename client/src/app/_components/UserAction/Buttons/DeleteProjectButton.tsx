import React, { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "@/app/providers/ModalProvider";

const DeleteProjectButton = ({
  className,
  projectId,
}: {
  className: string;
  projectId: number;
}) => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) return <></>;
  const { toggleModal, setModalType, setModalProps } = modalContext;

  const handleDeleteProject = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setModalType("project_deletion");
    setModalProps({title: projectId.toString()})
    toggleModal(true);
  };
  return (
    <Button
      isPrimary
      variant="danger"
      className={className}
      onClick={handleDeleteProject}
    >
      Delete
    </Button>
  );
};

export default DeleteProjectButton;
