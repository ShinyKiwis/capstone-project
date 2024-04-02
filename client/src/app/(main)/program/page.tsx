"use client";
import { CreateProgramModal } from "@/app/_components";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import React, { useEffect } from "react";

const Program = () => {
  const { updateBreadCrumb } = useBreadCrumbs();
  useEffect(() => {
    updateBreadCrumb("Programs Management", "/program");
  }, []);
  return (
    <div>
      <CreateProgramModal />
    </div>
  );
};

export default Program;
