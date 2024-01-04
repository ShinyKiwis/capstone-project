"use client"

import React from "react"
import { MainContent, SideBar } from "."
import { ModalProvider } from "../providers/ModalProvider"
import isAuth from "../lib/isAuth"


const App = ({children}: {children: React.ReactNode}) => {
  return (
    <ModalProvider>
      <SideBar />
      <MainContent children={children} />
    </ModalProvider>
  )
}

export default isAuth(App)