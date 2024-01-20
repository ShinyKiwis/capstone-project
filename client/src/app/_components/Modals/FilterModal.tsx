"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, InputBox, SearchBox, Typography } from "..";
import CheckBox from "../UserAction/CheckBox";
import ProfileSelector from "../ProfileSelector";
import { OptionType } from "../ProfileSelector";
import Image from "next/image";
import { useBranch, useMajor, useUser } from "@/app/hooks";
import hasRole from "@/app/lib/hasRole";
import { ModalContext } from "@/app/providers/ModalProvider";
import axios from "axios";
import { Project, ProjectContext } from "@/app/providers/ProjectProvider";

const NoInstructor = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <Image
        src="/search_icon.png"
        width={200}
        height={200}
        alt="no instructor icon"
      />
      <Typography
        variant="p"
        text="Try to search your instructor"
        className="text-xl text-gray"
      />
    </div>
  );
};

const FilterModal = () => {
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error(
      "Filter modal's cancel button will not close modal - model context not initiated !",
    );
    return "Modal err...";
  }
  const {toggleModal} = modalContextValue;

  const projectContext = useContext(ProjectContext);
  if (!projectContext) {
    console.error(
      "Filtering will not work, project context not initiated",
    );
    return "Modal err...";
  }
  const { setViewing, setProjects } = projectContext;

  const [membersNumber, setMembersNumber] = useState("");
  const [instructor, setInstructor] = useState<OptionType[]>([]);

  const [selectedProjType, setprojType] = useState<number[]>([1]);
  const [selectedBranches, setSelectedBranches] = useState<number[]>([1]);
  const [selectedMajors, setSelectedMajors] = useState<number[]>([1]);

  // const branchOptions = ["High quality", "PFIEV", "VJEP", "Regular program"];
  const { branches } = useBranch();
  const { majors } = useMajor();
  // const majors = [
  //   "Computer Science",
  //   "Computer Engineering",
  //   "Multidisciplinary Project",
  // ];

  useEffect(() => {
    if (branches.length > 0 || majors.length > 0) {
      // Set default values
      setSelectedBranches([branches[0].id]);
      setSelectedMajors([majors[0].id]);
    }
    console.log("Retreived branches", branches)
    console.log("Retreived majors", majors)
  }, [branches, majors]);
  

  const handleChangeMembersNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.target.value = +e.target.value <= 999 ? e.target.value : "999";
    setMembersNumber(e.target.value);
  };

  return (
    branches.length>0 &&
    <div className="h-[80vh] w-[80vw]">
      <form className="flex h-full w-full flex-col">
        <div className="flex h-full w-full">
          <div className="w-1/2">
            {/* options not available for student's view */}
            {hasRole("student") ? ( 
              ""
            ) : (
              <>
                <Typography
                  variant="p"
                  text="Project type"
                  className="mb-4 text-2xl font-bold mt-2"
                />
                <div className="flex gap-4">
                  <CheckBox
                    option="Personal projects"
                    key="Personal projects"
                    defaultChecked={true}
                    value={1}
                    valueArray={selectedProjType}
                  />
                  <CheckBox
                    option="All projects"
                    key="All projects"
                    value={2}
                    valueArray={selectedProjType}
                  />
                </div>

                <Typography
                  variant="p"
                  text="Branch"
                  className="mb-4 text-2xl font-bold mt-4"
                />
                <div className="flex gap-4">
                  <CheckBox
                    option={branches[0].name}
                    key={branches[0].id}
                    defaultChecked={true}
                    value={branches[0].id}
                    valueArray={selectedBranches}
                  />
                  {branches.slice(1).map((option) => {
                    return (
                      <CheckBox
                        option={option.name}
                        key={option.id}
                        value={option.id}
                        valueArray={selectedBranches}
                      />
                    );
                  })}
                </div>
              </>
            )}

            <Typography
              variant="p"
              text="Major"
              className="mb-4 text-2xl font-bold mt-4"
            />
            <div className="flex gap-4">
              <CheckBox
                option={majors[0].name}
                key={majors[0].id}
                defaultChecked={true}
                value={majors[0].id}
                valueArray={selectedMajors}
              />
              {majors.slice(1).map((option) => {
                return (
                  <CheckBox
                    option={option.name}
                    key={option.id}
                    value={option.id}
                    valueArray={selectedMajors}
                  />
                );
              })}
            </div>

            <div className="mt-4 flex w-1/2 items-center">
              <Typography
                variant="p"
                text="Number of participants"
                className="w-10/12 text-2xl font-bold"
              />
              <div className="w-2/12">
                <InputBox
                  inputName="MembersNumber"
                  placeholderText="No."
                  type="text"
                  className="px-2 py-1 text-center"
                  onChange={handleChangeMembersNumber}
                />
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col">
            <Typography
              variant="p"
              text="Co-Instructor"
              className="mb-2 text-2xl font-bold"
            />
            <div className={`${instructor.length > 0 ? "h-full" : ""}`}>
              <ProfileSelector
                type="instructors"
                onChange={setInstructor}
                value={instructor}
                isMulti={false}
              />
            </div>
            <div className={`${instructor.length > 0 ? "" : "h-full"}`}>
              {instructor.length < 1 && <NoInstructor />}
            </div>
          </div>
        </div>
        <div className="ms-auto flex gap-4">
          <Button
            isPrimary
            variant="normal"
            className="px-8 py-1 font-bold text-white"
            onClick={(e) => {
              e.preventDefault();
              // alert(
              //   `${selectedProjType}\n\n${selectedBranches}\n\n${selectedMajors}\n\n${membersNumber}\n\n${JSON.stringify(
              //     instructor,
              //   )}`,
              // );
              
              let branchParams = selectedBranches.map(selectedBranch=>`&branches=${selectedBranch}`).join('');
              let majorParams = selectedMajors.map(selectedMajor=>`&majors=${selectedMajor}`).join('');
              let filterQuery = `http://localhost:3500/projects?${
                membersNumber ? `members=${membersNumber}` : ''}${branchParams}${majorParams}`;
              console.log("Filter query:", filterQuery)

              axios.get(filterQuery)
              .then((response) => {
                const data = response.data as { projects: Project[] };
                setProjects(data.projects);
                setViewing(data.projects[0]);
              }, (error) => {
                console.log(error);
              });

              toggleModal(false)
            }}
          >
            Apply
          </Button>
          <Button
            isPrimary
            variant="cancel"
            className="px-8 py-1 font-bold text-white"
            onClick={()=>toggleModal(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
