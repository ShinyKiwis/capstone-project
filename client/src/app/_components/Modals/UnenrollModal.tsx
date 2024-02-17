'use client'

import React, { useContext } from 'react'
import { IoIosWarning } from "react-icons/io";
import { Typography, Button } from '..';
import { ModalContext } from '@/app/providers/ModalProvider';
import { useUser } from '@/app/hooks';
import { AuthContext } from '@/app/providers/AuthProvider';
import axios from 'axios';
import { ProjectContext } from '@/app/providers/ProjectProvider';


const UnenrollModal = ({title, messages}: UnenrollModalProps) => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    return "No context set up for rejection modal";
  }
  const { toggleModal } = modalContextValue;

  const user = useUser()
  const authContext = useContext(AuthContext)
  const projectContext = useContext(ProjectContext)

  if (!messages) messages = ["This action will remove your from the members list of this project."]
  if (!authContext) return <div>Loading</div>
  if (!projectContext) return <div>Loading</div>
  const {setUser} = authContext
  const {handleUnenrollment} = projectContext

  function unenroll(){
    axios.post("http://localhost:3500/users/student/unenroll", {
      studentId: user.id
    })
    .then(_ => {
      sessionStorage.setItem("user", JSON.stringify({
        ...user,
        project: {
          code: -1
        }
      }));
      const updatedUser = {
        ...user,
        project: {
          code: -1
        }
      }
      setUser(updatedUser)
      handleUnenrollment(user.project.code)
      toggleModal(false)
    })
  }

  return(
  <div className='flex flex-col items-center w-fit max-w-[60vw]'>
    <div className='flex gap-4 items-center'>
      <IoIosWarning size={96} className='text-red min-w-[5em]'/>
      <div>
        <Typography variant='h1' text={title ? title : "Unenroll from this project ?"} color='text-red' className='mb-2 text-2xl'/>
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
        variant="cancel"
        className='mt-6 w-44 py-2 text-lg'
        onClick={unenroll}
      >
        Unenroll
      </Button>
      <Button
        isPrimary={true}
        variant="close"
        className='mt-6 w-44 py-2 text-lg'
        onClick={()=>toggleModal(false)}
      >
        Cancel
      </Button>
    </div>
  </div>
  )
}

export default UnenrollModal