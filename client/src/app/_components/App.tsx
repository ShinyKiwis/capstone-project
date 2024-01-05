"use client"

import React from "react"
import { PageContent, SideBar } from "."
import { ModalProvider } from "../providers/ModalProvider"
import isAuth from "../lib/isAuth"


const App = ({children}: {children: React.ReactNode}) => {
  return (
    <ModalProvider>
      <SideBar />
      <PageContent children={children} />
    </ModalProvider>
  )
}

export default isAuth(App)