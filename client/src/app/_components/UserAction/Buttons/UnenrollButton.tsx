import {useContext} from 'react'
import Button from './Button'
import axios from 'axios'
import { useUser } from '@/app/hooks'
import { AuthContext } from '@/app/providers/AuthProvider'
import { ModalContext } from '@/app/providers/ModalProvider'

export const unenroll = () => {
    const user = useUser()
    const authContext = useContext(AuthContext)
    if(!authContext) return <></>

    const {setUser} = authContext
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
    })
} 

const UnenrollButton = ({className}: {className: string}) => {
  const modalContext = useContext(ModalContext)
  if(!modalContext) return <></>
  const { toggleModal, setModalType, modalType} = modalContext;
  console.log(modalType)

  const handleUnenroll = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    console.log("HERE")
    setModalType("project_unenrollment")
    toggleModal(true)
  }
  return (
    <Button
      isPrimary
      variant="danger"
      className={className}
      onClick={handleUnenroll}
    >
      Unenroll
    </Button>
  )
}

export default UnenrollButton