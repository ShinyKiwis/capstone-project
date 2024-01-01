import React, { useContext } from "react";
import { CgClose } from "react-icons/cg";
import { ModalContext } from "../providers/ModalProvider";

const FilterModal = () => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { toggleModal } = modalContextValue;
  return (
    <div
      className="border-lightgray fixed inset-x-44 inset-y-20 rounded-md border-2 bg-white px-8 py-4"
      style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="relative">
        <div className="absolute right-0">
          <CgClose
            size={30}
            className="text-lightgray cursor-pointer hover:text-blue"
            onClick={() => toggleModal(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
