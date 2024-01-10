"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useInstructor from "../hooks/useInstructor";
import Profile from "./Profile";
import MultiselectDropdown from "./UserAction/MultiselectDropdown";
import { CgClose } from "react-icons/cg";

interface OptionType {
  label: string;
  value: string;
}

interface ProfileSelectorProps {
  type: "instructors" | "students";
  valueSetter: Dispatch<SetStateAction<OptionType[]>>;
  isMulti: boolean;
}

function initSelectorData(type: string) {
  var optionsData: any = [];
  var optionsList: OptionType[] = [];

  switch (type) {
    case "instructors":
      const { instructors } = useInstructor();
      optionsData = instructors;
      if (instructors.length > 0) {
        optionsList = instructors.map((instructor) => {
          return {
            label: `${instructor.id} - ${instructor.name}`,
            value: instructor.id.toString(),
          };
        });
      }
      break;
    case "students":
      // get students data ?
      break;
    default:
      return {};
  }

  return { optionsData, optionsList };
}

const ProfileSelector = ({
  type,
  valueSetter,
  isMulti,
}: ProfileSelectorProps) => {
  const { optionsData, optionsList } = initSelectorData(type);
  const [selected, setSelected] = useState<OptionType[]>([]);

  useEffect(() => {
    valueSetter([...selected]);
  }, [selected]);

  const ProfileItems_multi = ({
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
              const targetInstructor = optionsList!.find((obj) => {
                return obj.value === id;
              });
              // console.log("Remove target:", targetInstructor)
              let targetIndex = -1;
              if (targetInstructor && selected.length > 0) {
                targetIndex = selected.findIndex((obj) => obj.value === id);
              }
              // console.log("Found index:", targetIndex)
              if (targetIndex > -1) {
                selected.splice(targetIndex, 1);
                setSelected([...selected]);
              }
            }}
          />
        </div>
      </div>
    );
  };

  const InfoTable = ({
    id,
    email,
    department,
    className
  }: {
    id: string;
    email: string;
    department: string;
    className?: string;
  }) => {
    const EachRow = ({fieldName, value}:{fieldName:string, value:string}) => {
      return(
        <tr className="border-[1px]">
          <th className="border-[1px] w-52 py-2 text-center">{fieldName}</th>
          <td className="border-[1px] px-8 py-2 text-center">{value}</td>
        </tr>
      )
    }

    return (
      <table className={`${className} border-collapse border-[1px]`}>
        <tbody>
          <EachRow fieldName="ID" value={id} />
          <EachRow fieldName="Email" value={email} />
          <EachRow fieldName="Department" value={department} />
        </tbody>
      </table>
    );
  };

  const ProfileItems_single = ({
    name,
    id,
    email,
    department,
  }: {
    name: string;
    id: string;
    email: string;
    department: string;
  }) => {
    return (
      <div className="flex flex-col w-full items-center pt-8">
        <Profile type="vertical" username={name} />
        <InfoTable id={id} email={email} department={department} className="mt-4 ml-12"/>
      </div>
    );
  };

  function handleSelectAdd(
    newOpt: OptionType[],
    targetArr: any,
    targetArrSetter: any,
  ) {
    if (!isMulti){
      targetArrSetter(newOpt);
      return;
    }

    let found = targetArr.findIndex(
      (obj: OptionType) => obj.value === newOpt[0].value,
    );
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
        onChange={(newOpt: OptionType[]) =>
          handleSelectAdd(newOpt, selected, setSelected)
        }
      />

      <div className="px-3">
        {selected.length > 0 &&
          selected.map(function (selectedOption: OptionType) {
            // Map list of selected options with data list from DB
            // console.log(selectedOption);
            const data = optionsData.find((obj: any) => {
              return obj.id.toString() === selectedOption.value;
            });

            return (
              isMulti ?
              <ProfileItems_multi
                key={data!.id}
                name={data!.name}
                id={data!.id.toString()}
                email={data!.email}
              />
              :
              <ProfileItems_single
                key={data!.id}
                name={data!.name}
                id={data!.id.toString()}
                email={data!.email}
                department="not available yet"
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProfileSelector;
