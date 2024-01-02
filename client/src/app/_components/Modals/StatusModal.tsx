import React from 'react'
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoWarningSharp } from "react-icons/io5";

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

  return(
  <div>
    <IoWarningSharp />
    <div>{content.title}</div>
    {content.messages.map(function(msg){
      return (<div>{msg}</div>)
    })}
  </div>
  )
}

const SuccessModal = ({content}: ModalDetails) => {
  return(<div>
    <IoMdCheckmarkCircle />
    Enrolled successfully !
  </div>)
}

const CancelModal = ({content}: ModalDetails) => {
  if (!content) return "No content passed for cancel modal";
  if (!('title' in content) || typeof(content.title)!='string')
    return "No title provided for cancel modal";
  if (!('messages' in content) || !Array.isArray(content.messages))
    return "No title provided for cancel modal";

  return(
  <div>
    <IoWarningSharp />
    <div>{content.title}</div>
    {content.messages.map(function(msg){
      return (<div>{msg}</div>)
    })}
  </div>
  )
}

const StatusModal = ({subType, modalContent}: StatusModalProps) => {
  switch (subType) {
    case "warning":
      return <WarningModal content={modalContent} />;
    case "success":
      return <SuccessModal content={modalContent} />;
    case "cancel":
      return <CancelModal content={modalContent} />;
    default:
      return <div>Invalid status modal subType</div>;
  }
  return (
    <div>StatusModal</div>
  )
}

export default StatusModal