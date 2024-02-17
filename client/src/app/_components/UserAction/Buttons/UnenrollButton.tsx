import { useContext } from "react";
import Button from "./Button";
import { ModalContext } from "@/app/providers/ModalProvider";

const UnenrollButton = ({
  className,
}: {
  className: string;
}) => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) return <></>;
  const { toggleModal, setModalType } = modalContext;

  const handleUnenroll = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setModalType("project_unenrollment");
    toggleModal(true);
  };
  return (
    <Button
      isPrimary
      variant="danger"
      className={className}
      onClick={handleUnenroll}
    >
      Unenroll
    </Button>
  );
};

export default UnenrollButton;
