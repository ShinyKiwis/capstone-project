import React, { useState } from "react";
import { InputBox, Typography } from "..";
import CheckBox from "../UserAction/CheckBox";

const FilterModal = () => {
  const [numberOfParticipants, setNumberOfParticipants] = useState("1");
  const options = [
    "Computer Science",
    "Computer Engineering",
    "Multidisciplinary Project",
  ];

  const handleChangeNumberOfParticipants = (e: React.SyntheticEvent) => {
    setNumberOfParticipants("1");
  };

  return (
    <div className="h-[80vh] w-[85vw]">
      <form className="flex">
        <div className="h-full w-1/2">
          <Typography
            variant="p"
            text="Program"
            className="text-2xl font-bold"
          />
          <div className="flex gap-4">
            {options.map((option) => {
              return <CheckBox option={option} key={option} />;
            })}
          </div>
          <div className="mt-4 flex w-1/2 items-center">
            <Typography
              variant="p"
              text="Number of participants"
              className="w-10/12 text-2xl font-bold"
            />
            <input
              type="text"
              placeholder="1"
              className="mx-2 h-12 w-12 rounded-md border-2 border-gray text-center text-gray outline-none focus:border-blue focus:text-blue"
            />
          </div>
        </div>
        <div className="h-full w-1/2"></div>
      </form>
    </div>
  );
};

export default FilterModal;
