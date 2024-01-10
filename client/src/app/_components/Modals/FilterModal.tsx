'use client'

import React, { useState } from "react";
import { Button, InputBox, SearchBox, Typography } from "..";
import CheckBox from "../UserAction/CheckBox";
import ProfileSelector from "../ProfileSelector";
import Image from "next/image";

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
  const [numberOfParticipants, setNumberOfParticipants] = useState("1");
  const [instructor, setInstructor] = useState<{label:string, value:string}[]>([]);
  const programOptions = [
    "Computer Science",
    "Computer Engineering",
    "Multidisciplinary Project",
  ];

  const handleChangeNumberOfParticipants = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e.target.value = +e.target.value <= 4 ? e.target.value : "4";
    setNumberOfParticipants(e.target.value);
  };

  return (
    <div className="h-[80vh] w-[80vw]">
      <form className="flex h-full w-full flex-col">
        <div className="flex h-full w-full">
          <div className="w-1/2">
            <Typography
              variant="p"
              text="Program"
              className="mb-4 text-2xl font-bold"
            />
            <div className="flex gap-4">
              {programOptions.map((option) => {
                return <CheckBox option={option} key={option} />;
              })}
            </div>
            <div className="mt-4 flex w-1/2 items-center">
              <Typography
                variant="p"
                text="Number of participants"
                className="w-10/12 text-2xl font-bold"
              />
              <div className="w-1/12">
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
              text="Instructor"
              className="mb-2 text-2xl font-bold"
            />
            <ProfileSelector type="instructors" valueSetter={setInstructor} isMulti={false}/>
            <div className="h-full">{!instructor && <NoInstructor />}</div>
          </div>
        </div>
        <div className="ms-auto flex gap-4">
          <Button
            isPrimary
            variant="normal"
            className="px-8 py-1 font-bold text-white"
            onClick={(e)=>{e.preventDefault(); console.log(instructor)}}
          >
            Apply
          </Button>
          <Button
            isPrimary
            variant="cancel"
            className="px-8 py-1 font-bold text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FilterModal;
