import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'

const useUser = () => {
  const authContext = useContext(AuthContext)
  if(!authContext) {
    return {name: "Loading", email: "Loading", roles: []}
  }
  const {user} = authContext
  if(!user) {
    return {name: "Invalid", email: "Invalid", roles: []}
  }
  return user
}

export default useUser