'use client'

import React, { useContext } from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { Typography, Button } from '..';
import { ModalContext } from '@/app/providers/ModalProvider';


export interface StatusModalProps{
  title: string,
  messages?: string[]
}


const WarningModal = ({title, messages}: StatusModalProps) => {
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
        <Typography variant='h1' text={title} color='text-yellow' className='mb-2 text-2xl'/>
        {messages?.map(function(msg, index){
          return (
            <div className='mb-2 text-gray font-normal' key={index.toString()}>
              {msg}
            </div>
          )
        })}
      </div>
    </div>
    <Button 
      isPrimary={true} 
      variant="confirm" 
      className='mt-6 w-44 py-2 text-lg'
      onClick={()=>toggleModal(false)}
    >
      Close
    </Button>
  </div>
  )
}

const SuccessModal = ({title}: StatusModalProps) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return null;
  }
  const { toggleModal } = modalContextValue;

  return(
  <div className='flex flex-col items-center max-w-[60vw]'>
    <div className='flex gap-4 items-center'>
      <FaCheckCircle size={96} className='text-lightgreen min-w-[5rem]' />
      <Typography variant='h1' text={title} color='text-lightgreen' />
    </div>
    <Button 
      isPrimary={true} 
      variant="confirm" 
      className='mt-8 w-44 py-2 text-lg'
      onClick={()=>toggleModal(false)}
    >
      Close
    </Button>
  </div>)
}


export {
  WarningModal,
  SuccessModal
}