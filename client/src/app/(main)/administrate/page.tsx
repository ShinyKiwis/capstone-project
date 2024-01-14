'use client';
import { ModalContext } from '@/app/providers/ModalProvider';
import React, { useContext } from 'react'

const Administrate = () => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Model context not initiated !");
    return;
  }
  const { toggleModal, setModalType, setModalProps, modalProps } = modalContextValue;

  function openUploadModal(event: React.SyntheticEvent){
    event.stopPropagation()
    setModalType('upload')
    toggleModal(true)
  }

  return (
    <div>
      Administration....
      <button className='border-2 bg-blue px-4 py-2' onClick={openUploadModal}>Open upload modal</button>
    </div>
  )
}

export default Administrate