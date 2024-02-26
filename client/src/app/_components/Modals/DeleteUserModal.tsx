import React, { useContext } from "react";
import { IoIosWarning } from "react-icons/io";
import { Button, Typography } from "..";
import axios from "axios";
import { ModalContext } from "@/app/providers/ModalProvider";
import { useQueryClient } from "@tanstack/react-query";

const DeleteUserModal = ({ userId }: { userId: number }) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Modal context initialization failed !");
    return null;
  }
  const { toggleModal } = modalContextValue;
  const queryClient = useQueryClient();

  const handleDeleteUser = () => {
    axios.delete(`http://localhost:3500/users/${userId}`).then((_) => {
      toggleModal(false);
      queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch users in the cache
    })
    .catch((err) => {
      console.error("Err deleting user:", err)
    });
  };

  return (
    <div className="flex w-fit max-w-[60vw] flex-col items-center">
      <div className="flex items-center gap-4">
        <IoIosWarning size={96} className="min-w-[5em] text-red" />
        <div>
          <Typography
            variant="h1"
            text="Delete this User ?"
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
          onClick={handleDeleteUser}
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

export default DeleteUserModal;
