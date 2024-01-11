import React, { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'

const useUser = () => {
  const authContext = useContext(AuthContext)
  if(!authContext) {
    return {id: -1, name: "Loading", email: "Loading", roles: [], project: {code: -1}}
  }
  const {user} = authContext
  if(!user) {
    return {id: -1,name: "Invalid", email: "Invalid", roles: [], project: {code: -1}}
  }
  return user
}

export default useUser