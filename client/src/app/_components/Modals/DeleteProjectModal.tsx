import React, { useContext } from "react";
import { IoIosWarning } from "react-icons/io";
import { Button, Typography } from "..";
import axios from "axios";
import { ModalContext } from "@/app/providers/ModalProvider";
import { ProjectContext } from "@/app/providers/ProjectProvider";

const DeleteProjectModal = ({ projectId }: { projectId: string }) => {
  const modalContext = useContext(ModalContext);
  const projectContext = useContext(ProjectContext);
  if (!modalContext) return <div>Loading</div>;
  if (!projectContext) return <div>Loading</div>;

  const { toggleModal } = modalContext;
  const { handleDeletion } = projectContext;
  const handleDeleteProject = () => {
    axios.delete(`http://localhost:3500/projects/${projectId}`).then((_) => {
      handleDeletion(+projectId)
      toggleModal(false);
    });
  };
  return (
    <div className="flex w-fit max-w-[60vw] flex-col items-center">
      <div className="flex items-center gap-4">
        <IoIosWarning size={96} className="min-w-[5em] text-red" />
        <div>
          <Typography
            variant="h1"
            text="Delete this project ?"
            color="text-red"
            className="mb-2 text-2xl"
          />
        </div>
      </div>
      <div className="flex gap-8">
        <Button
          isPrimary={true}
          variant="danger"
          className="mt-6 w-44 py-2 text-lg"
          onClick={handleDeleteProject}
        >
          Delete
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

export default DeleteProjectModal;
