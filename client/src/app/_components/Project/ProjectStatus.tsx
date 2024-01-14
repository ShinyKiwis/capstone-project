import React from 'react'

const getStatusStyle = (status: string) => {
  const lowercaseStatus = status.toLowerCase()
  if(lowercaseStatus.includes("waiting")) {
    return "bg-lightred/20 text-red"
  }else if(lowercaseStatus.includes("deactivated")) {
    return "bg-lightgray/20 text-gray"
  }
  return "bg-lightgreen/20 text-green"
}

const getCustomStatus =(status: string) => {
  switch(status) {
    case 'WAITING_FOR_DEPARTMENT_HEAD':
      return 'Waiting for approval from Department Head'
    case 'WAITING_FOR_PROGRAM_CHAIR':
      return 'Waiting for approval from Program Chair'
    case 'DRAFT':
      return 'Draft'
    case "DEACTIVATED":
      return "Deactivated"
  }
}

const ProjectStatus = ({status}: {status:string}) => {
  return (
    <div className={`${getStatusStyle(status)} font-bold px-2 py-1 rounded-md w-fit`}>
      {getCustomStatus(status)}
    </div>
  )
}

export default ProjectStatus