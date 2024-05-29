"use client";
import React, { createContext, useContext, useState } from "react";
import Program, { SO, Version } from "../interfaces/Program.interface";

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
  buildBreadCrumbs: (program?: Program, version?: Version, so?: SO) => void;
}

interface PassedScheme{
  id: string;
  name: string;
}

const BreadCrumbContext = createContext<BreadCrumbContextType | null>(null);

const BreadCrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [breadCrumbs, setBreadCrumbs] = useState<BreadCrumb[]>([]);
  const [currentModulePath, setCurrentModulePath] = useState<string>('nonincluded');

  const buildBreadCrumbs = (program?: Program, version?: Version, so?: SO, piName?:string, scheme?: PassedScheme) => {
    const path = window.location.pathname;
    if (currentModulePath === 'nonincluded'){
      if (path.includes('/assessment/')) setCurrentModulePath('/assessment')
      else if (path.includes('/program')) setCurrentModulePath('/program')
      else setCurrentModulePath('nonincluded');
    }
    if (!path.includes(currentModulePath)) {
      setBreadCrumbs([]);
    }

    let breadCrumbsArray: BreadCrumb[] = [];
    const components = path.split("/").filter((component) => component !== "");
    const ids = components.filter((component) => !isNaN(parseInt(component)));
    if (path.includes("/assessment/")) {
      breadCrumbsArray = buildAssessmentBreadCrumbs(ids, program, version, scheme);
    }
    else if (path.includes("/program")) {
      breadCrumbsArray = buildProgramBreadCrumbs(ids, program, version, so, piName);
    }
    console.log("BREAD:", breadCrumbsArray);
    setBreadCrumbs(breadCrumbsArray);
  };

  const buildProgramBreadCrumbs = (ids: string[], program?: Program, version?: Version, so?: SO, piName?: string) => {
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
        break;
        case 3:
          programBreadCrumbs.push({
            title: program.name + " - " + program.major,
            href: `/program/${program.id}/versions`,
          });
          if(version){
            programBreadCrumbs.push({
              title: version.name,
              href: `/program/${program.id}/versions/${version.id}`,
            });
            if(path.includes("sos")) {
              programBreadCrumbs.push({
                title: "SOs",
                href: `/program/${program.id}/versions/${version.id}/sos`,
              });
              if(so) {
                programBreadCrumbs.push({
                  title: so.name,
                  href: `/program/${program.id}/versions/${version.id}/sos/${so.id}/pis`,
                });
              }
              break;
            }
          }
          break;
      }
    }
    return programBreadCrumbs;
  };

  const buildAssessmentBreadCrumbs = (ids: string[], program?: Program, version?: Version, scheme?: PassedScheme) => {
    const path = window.location.pathname;
    const assessmentBreadCrumbs: BreadCrumb[] = [];
    assessmentBreadCrumbs.push({ title: "Programs", href: "/assessment/programs" });
    if (program) {
      switch (ids.length) {
        case 1:
          // Skipped anyway
          assessmentBreadCrumbs.push({
            title: program.name + " - " + program.major,
            href: `/program/${program.id}/versions`,
          });
          break
        case 2:
          // assessmentBreadCrumbs.push({
          //   title: program.name + " - " + program.major,
          //   href: `/program/${program.id}/versions`,
          // }); // skipped anyway
          if(version) {
            assessmentBreadCrumbs.push({
              title: `${program.name} (${version.name})`,
              href: `/assessment/programs/${program.id}/versions/${version.id}/schemes`,
            });
            // if(path.includes("schemes")) {
            //   assessmentBreadCrumbs.push({
            //     title: "Schemes",
            //     href: `/assessment/programs/${program.id}/versions/${version.id}/schemes`,
            //   });
            // }
          }
        break
        case 3:
          if(version){
            assessmentBreadCrumbs.push({
              title: `${program.name} (${version.name})`,
              href: `/assessment/programs/${program.id}/versions/${version.id}/schemes`,
            });
            // if(path.includes("schemes")) {
            //   assessmentBreadCrumbs.push({
            //     title: "Schemes",
            //     href: `/assessment/programs/${program.id}/versions/${version.id}/schemes`,
            //   });
            if(scheme) {
              assessmentBreadCrumbs.push({
                title: scheme.name,
                href: `/assessment/programs/${program.id}/versions/${version.id}/schemes/${scheme.id}`,
              });
            }
            // }
          }
          break;
      }
    }
    return assessmentBreadCrumbs;
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
