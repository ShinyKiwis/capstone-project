"use client"

import { useEffect, useState } from "react"

export default function useUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {

  }, [])
  
  const login = (username:string, password:string) => {

  }

  const logout = () => {
    setUser(null)
  }

  return {user, login, logout}
}