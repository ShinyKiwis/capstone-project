import React from 'react'

interface StatusModalProps{
  subType: string,
  modalContent?: object
}

interface ModalDetails{
  content?: object
}

const WarningModal = ({content}: ModalDetails) => {
  return(<div>
    Warning
  </div>)
}

const SuccessModal = ({content}: ModalDetails) => {
  return(<div>
    Success
  </div>)
}

const CancelModal = ({content}: ModalDetails) => {
  return(<div>
    Cancel project ?
  </div>)
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