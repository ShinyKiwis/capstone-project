'use client'

import React, { useContext } from 'react'
import { IoIosWarning } from "react-icons/io";
import { Typography, Button } from '..';
import { ModalContext } from '@/app/providers/ModalProvider';

export interface ActionModalProps{
  title: string,
  messages?: string[]
  buttonLabels: [string, string]
}

const RemovalModal = ({title, messages, buttonLabels}: ActionModalProps) => {
  // if (!content) return "No content passed for warning modal";
  // if (!('title' in content) || typeof(content.title)!='string')
  //   return "No title provided for warning modal";
  // if (!('messages' in content) || !Array.isArray(content.messages))
  //   return "No title provided for warning modal";

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
        <Typography variant='h1' text={title} color='text-red' className='mb-2 text-2xl'/>
        {messages?.map(function(msg, index){
          return (
            <div className='mb-2 text-gray font-normal' key={index.toString()}>
              {msg}
            </div>
          )
        })}
      </div>
    </div>
    <div className='flex gap-8'>
      <Button
        isPrimary={true}
        variant="red_cancel"
        className='mt-6 w-44'
        onClick={()=>{alert('Action button clicked'); toggleModal(false)}}
      >
        {buttonLabels[0]}
      </Button>
      <Button
        isPrimary={true}
        variant="gray_close"
        className='mt-6 w-44'
        onClick={()=>toggleModal(false)}
      >
        {buttonLabels[1]}
      </Button>
    </div>
  </div>
  )
}

const ProjDenyModal = () => {
  // if (!content) return "No content passed for rejection modal";
  // if (!('title' in content) || typeof(title)!='string')
  //   return "No title provided for rejection modal";
  // if (!('messages' in content) || !Array.isArray(messages))
  //   return "No title provided for rejection modal";

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
        <Typography variant='h1' text="Deny this project ?" color='text-red' className='mb-2 text-2xl'/>
        <div className='mb-2 text-gray font-normal'>Send denial notification and reason to the project's supervisor.</div>
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
    <div className='flex gap-8'>
      <Button
        isPrimary={true}
        variant="red_cancel"
        className='mt-6 w-44'
        onClick={()=>{alert('Action button clicked'); toggleModal(false)}}
      >
        Deny
      </Button>
      <Button
        isPrimary={true}
        variant="green_confirm"
        className='mt-6 w-44'
        onClick={()=>toggleModal(false)}
      >
        Cancel
      </Button>
    </div>
  </div>
  )
}

export {
  RemovalModal,
  ProjDenyModal
}