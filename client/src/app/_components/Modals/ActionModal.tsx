'use client'

import React, { useContext } from 'react'
import { IoIosWarning } from "react-icons/io";
import { Typography, Button } from '..';
import { ModalContext } from '@/app/providers/ModalProvider';

interface ActionModalProps{
  subType: string,
  actionWords: string[]
  modalContent?: object
}

interface ModalDetails{
  actions: string[],
  content?: object
}

const RemovalModal = ({actions, content}: ModalDetails) => {
  if (!content) return "No content passed for warning modal";
  if (!('title' in content) || typeof(content.title)!='string')
    return "No title provided for warning modal";
  if (!('messages' in content) || !Array.isArray(content.messages))
    return "No title provided for warning modal";

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return "No context set up for rejection modal";
  }
  const { toggleModal } = modalContextValue;

  return(
  <div className='flex flex-col items-center w-fit max-w-[60vw]'>
    <div className='flex gap-4 items-center'>
      <IoIosWarning size={96} className='text-red min-w-[5em]'/>
      <div>
        <Typography variant='h1' text={content.title} color='text-red' className='mb-2 text-2xl'/>
        {content.messages.map(function(msg){
          return (
            <div className='mb-2 text-gray font-normal'>
              {msg}
            </div>
          )
        })}
      </div>
    </div>
    <div className='flex gap-4'>
      <Button
        isPrimary={true}
        variant="red_cancel"
        className='mt-6 w-44'
        onClick={()=>{alert('Action button clicked'); toggleModal(false)}}
      >
        {actions[0]}
      </Button>
      <Button
        isPrimary={true}
        variant="gray_close"
        className='mt-6 w-44'
        onClick={()=>toggleModal(false)}
      >
        {actions[1]}
      </Button>
    </div>
  </div>
  )
}

const RejectionModal = ({actions, content}: ModalDetails) => {
  if (!content) return "No content passed for rejection modal";
  if (!('title' in content) || typeof(content.title)!='string')
    return "No title provided for rejection modal";
  if (!('messages' in content) || !Array.isArray(content.messages))
    return "No title provided for rejection modal";

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return "No context set up for rejection modal";
  }
  const { toggleModal } = modalContextValue;

  return(
  <div className='flex flex-col items-center max-w-[60vw]'>
    <div className='flex gap-4 items-center'>
      <IoIosWarning size={96} className='text-red min-w-[5rem]'/>
      <div>
        <Typography variant='h1' text={content.title} color='text-red' className='mb-2 text-2xl'/>
        {content.messages.map(function(msg){
          return (
            <div className='mb-2 text-gray font-normal'>
              {msg}
            </div>
          )
        })}
      </div>
    </div>
    <div>
      <textarea 
        name="deny-reason" 
        autoFocus={true} 
        cols={60} rows={5}
        style={{resize: 'none'}}
        className='border-2 border-gray rounded-lg mt-2 px-2 py-2'
      >
      </textarea>
    </div>
    <div className='flex gap-4'>
      <Button
        isPrimary={true}
        variant="red_cancel"
        className='mt-6 w-44'
        onClick={()=>{alert('Action button clicked'); toggleModal(false)}}
      >
        {actions[0]}
      </Button>
      <Button
        isPrimary={true}
        variant="green_confirm"
        className='mt-6 w-44'
        onClick={()=>toggleModal(false)}
      >
        {actions[1]}
      </Button>
    </div>
  </div>
  )
}

const ActionModal = ({subType, actionWords, modalContent}: ActionModalProps) => {
  if (!actionWords) return "missing action params for action modal"
  switch (subType) {
    case "removal":
      return <RemovalModal actions={actionWords} content={modalContent} />;
    case "rejection":
      return <RejectionModal actions={actionWords} content={modalContent} />;
    default:
      return "Invalid Action modal subType";
  }
  return (
    <div>ActionModal</div>
  )
}

export default ActionModal