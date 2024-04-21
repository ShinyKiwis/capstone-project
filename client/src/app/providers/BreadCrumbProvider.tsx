"use client";
import React, { createContext, useContext, useState } from "react";
import Program, { Version } from "../interfaces/Program.interface";

interface BreadCrumb {
  title: string;
  href: string;
}
// /program/1/versions/
// /program/1/versions/2
// /program/1/versions/2/peos
// /program/1/versions/2/sos
// /program/1/versions/2/sos/3/pis

interface BreadCrumbContextType {
  breadCrumbs: BreadCrumb[];
  buildBreadCrumbs: (program?: Program, version?: Version) => void;
}

const BreadCrumbContext = createContext<BreadCrumbContextType | null>(null);

const BreadCrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);

  const buildBreadCrumbs = (program?: Program, version?: Version) => {
    const path = window.location.pathname;
    if (!path.includes("/program")) {
      setBreadCrumbs([]);
    }
    let breadCrumbsArray: BreadCrumb[] = [];
    const components = path.split("/").filter((component) => component !== "");
    const ids = components.filter((component) => !isNaN(parseInt(component)));
    if (path.includes("/program")) {
      breadCrumbsArray = buildProgramBreadCrumbs(ids, program, version);
    }
    console.log("BREAD:", breadCrumbsArray);
    setBreadCrumbs(breadCrumbsArray);
  };

  const buildProgramBreadCrumbs = (ids: string[], program?: Program, version?: Version) => {
    const path = window.location.pathname;
    const programBreadCrumbs: BreadCrumb[] = [];
    programBreadCrumbs.push({ title: "Programs Management", href: "/program" });
    if (program) {
      switch (ids.length) {
        case 1:
          programBreadCrumbs.push({
            title: program.name + " - " + program.major,
            href: `/program/${program.id}/versions`,
          });
          break
        case 2:
          programBreadCrumbs.push({
            title: program.name + " - " + program.major,
            href: `/program/${program.id}/versions`,
          });
          if(version) {
            programBreadCrumbs.push({
              title: version.name,
              href: `/program/${program.id}/versions/${version.id}`,
            });
            if(path.includes("sos")) {
              programBreadCrumbs.push({
                title: "SOs",
                href: `/program/${program.id}/versions/${version.id}/sos`,
              });
            } else if (path.includes("peos")) {
              programBreadCrumbs.push({
                title: "PEOs",
                href: `/program/${program.id}/versions/${version.id}/peos`,
              });
            }
          }
        case 3:
          break;
      }
    }
    return programBreadCrumbs;
  };

  return (
    <BreadCrumbContext.Provider value={{ breadCrumbs, buildBreadCrumbs }}>
      {children}
    </BreadCrumbContext.Provider>
  );
};

export const useBreadCrumbs = () => {
  const context = useContext(BreadCrumbContext);
  if (!context) {
    throw new Error(
      "useBreadCrumbs must be used inside the BreadCrumbProvider",
    );
  }

  return context;
};
export default BreadCrumbProvider;
