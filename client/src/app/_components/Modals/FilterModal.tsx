"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button, InputBox, SearchBox, Typography } from "..";
import CheckBox from "../UserAction/CheckBox";
import ProfileSelector from "../ProfileSelector";
import { OptionType } from "../ProfileSelector";
import Image from "next/image";
import { useUser } from "@/app/hooks";
import hasRole from "@/app/lib/hasRole";
import { ModalContext } from "@/app/providers/ModalProvider";

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
  const user = useUser();
  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error(
      "Filter modal's cancel button will not close modal - model context not initiated !",
    );
    return "Modal err...";
  }
  const {toggleModal} = modalContextValue;

  const [numberOfParticipants, setNumberOfParticipants] = useState("1");
  const [instructor, setInstructor] = useState<OptionType[]>([]);

  const [selectedProjType, setprojType] = useState<string[]>(['personal projects']);
  const [selectedBranches, setSelectedBranches] = useState<string[]>(['high quality']);
  const [selectedMajors, setSelectedMajors] = useState<string[]>(['computer science']);

  const majorOptions = [
    "Computer Science",
    "Computer Engineering",
    "Multidisciplinary Project",
  ];

  const branchOptions = ["High quality", "PFIEV", "VJEP", "Regular program"];

  const handleChangeNumberOfParticipants = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.target.value = +e.target.value <= 999 ? e.target.value : "999";
    setNumberOfParticipants(e.target.value);
  };

  return (
    <div className="h-[80vh] w-[80vw]">
      <form className="flex h-full w-full flex-col">
        <div className="flex h-full w-full">
          <div className="w-1/2">
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
                    valueArray={selectedProjType}
                  />
                  <CheckBox
                    option="All projects"
                    key="All projects"
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
                    option={branchOptions[0]}
                    key={branchOptions[0]}
                    defaultChecked={true}
                    valueArray={selectedBranches}
                  />
                  {branchOptions.slice(1).map((option) => {
                    return (
                      <CheckBox
                        option={option}
                        key={option}
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
                option={majorOptions[0]}
                key={majorOptions[0]}
                defaultChecked={true}
                valueArray={selectedMajors}
              />
              {majorOptions.slice(1).map((option) => {
                return (
                  <CheckBox
                    option={option}
                    key={option}
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
                  inputName="numberOfParticipants"
                  placeholderText="1"
                  type="text"
                  className="px-2 py-1 text-center"
                  onChange={handleChangeNumberOfParticipants}
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
              alert(
                `${selectedProjType}\n\n${selectedBranches}\n\n${selectedMajors}\n\n${numberOfParticipants}\n\n${JSON.stringify(
                  instructor,
                )}`,
              );
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
