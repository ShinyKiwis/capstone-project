import React, { useContext } from "react";
import Button from "./Button";
import { useUser } from "@/app/hooks";
import axios from "axios";
import { AuthContext } from "@/app/providers/AuthProvider";
import { ModalContext } from "@/app/providers/ModalProvider";

const EnrollButton = ({ projectId, className }: { projectId: number, className: string }) => {
  const user = useUser();
  const authContext = useContext(AuthContext)
  const modalContext = useContext(ModalContext)

  if(!authContext) return <></>
  if(!modalContext) return <></>
  const { toggleModal, setModalType } =
  modalContext;
  const {setUser} = authContext

  const handleEnroll = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    axios
      .post("http://localhost:3500/users/student/enroll", {
        studentId: user.id,
        projectCode: projectId,
      })
      .then((_) => {
        sessionStorage.setItem("user", JSON.stringify({
          ...user,
          project: {
            code: projectId
          }
        }));
        const updatedUser = {
          ...user,
          project: {
            code: projectId
          }
        }
        setUser(updatedUser)
        setModalType("status_success")
        toggleModal(true)
      });
  };
  return (
    <Button
      isPrimary
      variant="normal"
      className={className}
      onClick={handleEnroll}
    >
      Enroll
    </Button>
  );
};

export default EnrollButton;
