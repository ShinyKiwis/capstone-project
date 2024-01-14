import React, { useContext } from "react";
import Button from "./Button";
import { useUser } from "@/app/hooks";
import axios from "axios";
import { AuthContext } from "@/app/providers/AuthProvider";
import { ModalContext } from "@/app/providers/ModalProvider";
import { ProjectContext } from "@/app/providers/ProjectProvider";

const EnrollButton = ({
  projectId,
  className,
}: {
  projectId: number;
  className: string;
}) => {
  const user = useUser();
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);
  const projectContext = useContext(ProjectContext);

  if (!authContext) return <></>;
  if (!modalContext) return <></>;
  if (!projectContext) return <></>;
  const { toggleModal, setModalType } = modalContext;
  const { setUser } = authContext;
  const { handleEnrollment } = projectContext;

  const handleEnrollClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    axios
      .post("http://localhost:3500/users/student/enroll", {
        studentId: user.id,
        projectCode: projectId,
      })
      .then((_) => {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            project: {
              code: projectId,
            },
          }),
        );
        const updatedUser = {
          ...user,
          project: {
            code: projectId,
          },
        };
        setUser(updatedUser);
        handleEnrollment(projectId)
        setModalType("status_success");
        toggleModal(true);
      });
  };
  return (
    <Button
      isPrimary
      variant="normal"
      className={className}
      onClick={handleEnrollClick}
    >
      Enroll
    </Button>
  );
};

export default EnrollButton;
