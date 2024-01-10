"use client";

import { useState } from "react";
import useInstructor from "../hooks/useInstructor";
import Profile from "./Profile";
import MultiselectDropdown from "./UserAction/MultiselectDropdown";
import { CgClose } from "react-icons/cg";

interface OptionType {
  label: string,
  value: string
}

interface ProfileSelectorProps {
  type: "instructors" | "students"
}

function initSelectorData(type: string){
  var optionsData: any = [];
  var optionsList: OptionType[] = [];

  switch (type){
    case "instructors":
      const { instructors } = useInstructor();
      optionsData = instructors;
      if (instructors.length > 0) {
        optionsList = instructors.map((instructor) => {
          return({
            label: `${instructor.id} - ${instructor.name}`,
            value: instructor.id.toString(),
          })
        });
      }
    break;
    case "students":
      // get students data ?
      break;
    default:
      return{}
  }

  return {optionsData, optionsList};
}

const ProfileSelector = ({type}: ProfileSelectorProps) => {
  const {optionsData, optionsList} = initSelectorData(type);
  const [selected, setSelected] = useState<OptionType[]>([]);
  
  const ProfileItems = ({
    name,
    id,
    email,
  }: {
    name: string;
    id?: string;
    email?: string;
  }) => {
    return (
      <div className="flex w-full items-center pt-4">
        <div>
          <Profile
            type="horizontal"
            username={name}
            email={email}
            userId={id}
          />
        </div>
        <div className="right-0 ml-auto">
          <CgClose
            size={25}
            className="text-lack cursor-pointer hover:text-lightgray"
            // Hande remove selected profile item:
            onClick={() => {
              const targetInstructor = optionsList!.find(obj => {
                return obj.value === id;
              })
              // console.log("Remove target:", targetInstructor)
              let targetIndex = -1;
              if (targetInstructor && selected.length > 0) {
                targetIndex = selected.findIndex((obj) => obj.value === id);
              }
              // console.log("Found index:", targetIndex)
              if (targetIndex > -1) {
                selected.splice(targetIndex, 1);
                setSelected([...selected])
              }
            }}
          />
        </div>
      </div>
    );
  };

  function handleSelectAdd(newOpt: OptionType[], targetArr: any, targetArrSetter: any) {
    let found = targetArr.findIndex((obj: OptionType) => obj.value === newOpt[0].value);
    if (found === -1) {
      let newArr = targetArr.concat(newOpt);
      targetArrSetter(newArr);
    }
  }
  
  return (
    <div className="grow">
      <MultiselectDropdown
        name="supervisors"
        isMulti={true}
        options={optionsList || []}
        placeholder={`Search ${type} name, id`}
        onChange={(newOpt: OptionType[]) => handleSelectAdd(newOpt, selected, setSelected)}
      />

      <div className="px-3">
        {selected.length > 0 && selected.map(function (selectedOption: OptionType) {
          // Map list of selected options with list from DB
          // console.log(selectedOption);
          const data = optionsData.find((obj:any) => {
            return obj.id.toString() === selectedOption.value
          })

          return (
            <ProfileItems
              name={data!.name}
              id={data!.id.toString()}
              email={data!.email}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSelector;
