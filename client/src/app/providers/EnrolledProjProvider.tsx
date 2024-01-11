"use client";
import React, { createContext, useEffect, useState } from "react";

interface EnrolledProjContextProps {
  enrolledProjCode: number
  enrolledProjSetter: (arg0: number) => void;
}

export const EnrolledProjContext = createContext<EnrolledProjContextProps | null>(null);

export const EnrolledProjProvider = ({ children }: { children: React.ReactNode }) => {
  // Set initial enrolled code if user has already enrolled
  const [enrolledProjCode, enrolledProjSetter] = useState(-1);

  const enrolledContextValue: EnrolledProjContextProps = {
    enrolledProjCode,
    enrolledProjSetter,
  }

  return (
    <EnrolledProjContext.Provider value={enrolledContextValue}>
      {children}
    </EnrolledProjContext.Provider>
  );
};
