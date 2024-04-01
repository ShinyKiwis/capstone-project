"use client";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import React, { useEffect } from "react";

const Program = () => {
  const { updateBreadCrumb } = useBreadCrumbs();
  useEffect(() => {
    updateBreadCrumb("General Programs", "/program");
  }, []);
  return <div>Program</div>;
};

export default Program;
