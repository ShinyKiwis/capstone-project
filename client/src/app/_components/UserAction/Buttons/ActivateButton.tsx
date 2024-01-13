import React, { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "@/app/providers/ModalProvider";

const ActivateButton = ({
  className,
  projectId,
  action
}: {
  className: string;
  projectId: number;
  action: string;
}) => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) return <></>;
  const { toggleModal, setModalType, setModalProps } = modalContext;

  const handleDeactivateProjectClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setModalType("project_activation");
    setModalProps({ title: `${projectId}-${action.toLowerCase()}`.toString() });
    toggleModal(true);
  };
  return (
    <Button
      isPrimary={false}
      variant={action.toLowerCase() === 'deactivate' ? "danger": "success"}
      className={className}
      onClick={handleDeactivateProjectClick}
    >
      {action}
    </Button>
  );
};

export default ActivateButton;
