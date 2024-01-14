import React, { useContext } from "react";
import { IoIosWarning } from "react-icons/io";
import { Button, Typography } from "..";
import axios from "axios";
import { ModalContext } from "@/app/providers/ModalProvider";
import { ProjectContext } from "@/app/providers/ProjectProvider";

const ActivateProjectModal = ({
  projectId,
  action,
}: {
  projectId: string;
  action: string;
}) => {
  const modalContext = useContext(ModalContext);
  const projectContext = useContext(ProjectContext);
  if (!modalContext) return <div>Loading</div>;
  if (!projectContext) return <div>Loading</div>;

  const { toggleModal } = modalContext;
  const { handleChangeProjectStatus } = projectContext;
  const handleUpdateProjectStatus = () => {
    const status = action === "deactivate" ? "DEACTIVATED" : "ACTIVATED";
    axios
      .patch(`http://localhost:3500/projects/${projectId}/status`, {
        status: status,
      })
      .then((_) => {
        handleChangeProjectStatus(+projectId, status);
        toggleModal(false);
      });
  };
  return (
    <div className="flex w-fit max-w-[60vw] flex-col items-center">
      <div className="flex items-center gap-4">
        <IoIosWarning size={96} className={`min-w-[5em] ${action ==='deactivate' ? "text-red" : "text-green"}`} />
        <div>
          <Typography
            variant="h1"
            text={action ==='deactivate' ? "Deactivate this project ?" : "Activate this project ?"}
            color={action ==='deactivate' ? "text-red" : "text-green"}
            className="mb-2 text-2xl"
          />
        </div>
      </div>
      <div className="flex gap-8">
        <Button
          isPrimary={true}
          variant={action==='deactivate' ? "cancel": "success"}
          className="mt-6 w-44 py-2 text-lg"
          onClick={handleUpdateProjectStatus}
        >
          {action[0].toUpperCase() + action.substring(1)}
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

export default ActivateProjectModal;
