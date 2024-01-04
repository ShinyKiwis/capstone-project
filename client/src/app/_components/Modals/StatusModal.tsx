'use client'

import React, { useContext } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { Typography, Button } from '..';
import { ModalContext } from '@/app/providers/ModalProvider';

interface StatusModalProps{
  subType: string,
  modalContent?: object
}

interface ModalDetails{
  content?: object
}


const WarningModal = ({content}: ModalDetails) => {
  if (!content) return "No content passed for warning modal";
  if (!('title' in content) || typeof(content.title)!='string')
    return "No title provided for warning modal";
  if (!('messages' in content) || !Array.isArray(content.messages))
    return "No title provided for warning modal";

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { toggleModal } = modalContextValue;

  return(
  <div className='flex flex-col items-center max-w-[60vw]'>
    <div className='flex gap-4 items-center'>
      <IoIosWarning size={96} className='text-yellow min-w-[5rem]'/>
      <div>
        <Typography variant='h1' text={content.title} color='text-yellow' className='mb-2 text-2xl'/>
        {content.messages.map(function(msg){
          return (
            <div className='mb-2 text-gray font-normal'>
              {msg}
            </div>
          )
        })}
      </div>
    </div>
    <Button 
      isPrimary={true} 
      variant="green_confirm-lg" 
      className='mt-6 w-44'
      onClick={()=>toggleModal(false)}
    >
      Close
    </Button>
  </div>
  )
}

const SuccessModal = ({content}: ModalDetails) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { toggleModal } = modalContextValue;

  return(
  <div className='flex flex-col items-center max-w-[60vw]'>
    <div className='flex gap-4 items-center'>
      <FaCheckCircle size={96} className='text-lightgreen min-w-[5rem]' />
      <Typography variant='h1' text='Enrolled Successfully !' color='text-lightgreen' />
    </div>
    <Button 
      isPrimary={true} 
      variant="green_confirm-lg" 
      className='mt-8 w-44'
      onClick={()=>toggleModal(false)}
    >
      Close
    </Button>
  </div>)
}


const StatusModal = ({subType, modalContent}: StatusModalProps) => {
  switch (subType) {
    case "warning":
      return <WarningModal content={modalContent} />;
    case "success":
      return <SuccessModal content={modalContent} />;
    default:
      return <div>Invalid status modal subType</div>;
  }
  return (
    <div>StatusModal</div>
  )
}

export default StatusModal