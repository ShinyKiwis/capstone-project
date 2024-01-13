import React, { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "@/app/providers/ModalProvider";

const ActivateButton = ({
  className,
  projectId,
}: {
  className: string;
  projectId: number;
}) => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) return <></>;
  const { toggleModal, setModalType, setModalProps } = modalContext;

  const handleDeactivateProjectClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setModalType("project_activation");
    setModalProps({ title: projectId.toString() });
    toggleModal(true);
  };
  return (
    <Button
      isPrimary={false}
      variant="danger"
      className={className}
      onClick={handleDeactivateProjectClick}
    >
      Deactivate
    </Button>
  );
};

export default ActivateButton;
