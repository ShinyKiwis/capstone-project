"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useInstructor from "../hooks/useInstructor";
import Profile from "./Profile";
import MultiselectDropdown from "./UserAction/MultiselectDropdown";
import { AsyncMultiselectDropdown } from ".";
import { CgClose } from "react-icons/cg";

import { Instructor } from "../hooks/useInstructor";
import { SearchStudentDataType } from "./UserAction/AsyncMultiselectDropdown";
import { useUser } from "../hooks";
export interface OptionType {
  label: string;
  value: string;
  dataObject: {id:string, email:string, name:string} | Instructor;
}

interface ProfileSelectorProps {
  type: "instructors" | "students";
  onChange: Dispatch<SetStateAction<OptionType[]>>;
  value: OptionType[];
  isMulti: boolean;
}

const ProfileSelector = ({
  type,
  onChange,
  value,
  isMulti,
}: ProfileSelectorProps) => {
  const user = useUser();

  const ProfileItemsMultiMode = ({
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
              let targetIndex = -1;
              if (value.length > 0) {
                targetIndex = value.findIndex((selectedOpt) => selectedOpt.dataObject.id.toString() === id);
              }
              // console.log("Found index:", targetIndex)
              if (targetIndex > -1) {
                value.splice(targetIndex, 1);
                onChange([...value]);
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
    className,
  }: {
    id: string;
    email: string;
    department: string;
    className?: string;
  }) => {
    const EachRow = ({
      fieldName,
      value,
    }: {
      fieldName: string;
      value: string;
    }) => {
      return (
        <tr className="border-[1px]">
          <th className="w-52 border-[1px] py-2 text-center">{fieldName}</th>
          <td className="border-[1px] px-8 py-2 text-center">{value}</td>
        </tr>
      );
    };

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

  const ProfileItemsSingleMode = ({
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
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Profile type="vertical" username={name} />
        <InfoTable
          id={id}
          email={email}
          department={department}
          className="mt-4"
        />
      </div>
    );
  };

  if (type === "instructors") {
    const { instructors } = useInstructor();
    let optionsList: OptionType[] = [];

    // Map instructors data to options list process-able by react-select
    if (instructors.length > 0) {
      optionsList = instructors.map((instructor) => {
        return {
          label: `${instructor.id} - ${instructor.name}`,
          value: instructor.id.toString(),
          dataObject: instructor,
        };
      });
    }

    return (
      <div className="flex h-full flex-col">
        <MultiselectDropdown
          name="supervisors"
          isMulti={true}
          options={optionsList || []}
          placeholder={`Search co-instructor name, id...`}
          onChange={onChange}
          value={value}
        />

        <div
          className={`flex flex-col items-center justify-center px-3 ${
            isMulti ? "" : "flex-1"
          }`}
        >
          {value.length > 0 &&
            value.map(function (selectedOption: OptionType) {
              if (user.id !== selectedOption.dataObject.id)   // not render instructor if they are the project's ownder
              return isMulti ? (
                <ProfileItemsMultiMode
                  key={selectedOption.dataObject!.id}
                  name={selectedOption.dataObject!.name}
                  id={selectedOption.dataObject!.id.toString()}
                  email={selectedOption.dataObject!.email}
                />
              ) : (
                <ProfileItemsSingleMode
                  key={selectedOption.dataObject!.id}
                  name={selectedOption.dataObject!.name}
                  id={selectedOption.dataObject!.id.toString()}
                  email={selectedOption.dataObject!.email}
                  department="not available yet"
                />
              );
            })}
        </div>
      </div>
    );
  } else if (type === "students") {
    return (
      <div className="flex h-full flex-col">
        <AsyncMultiselectDropdown
          name="members"
          value={value}
          onChange={onChange}
          isMulti={true}
          placeholder="Search for student's name, id..."
          apiLink="http://localhost:3500/users/students?search="       // change to student's api call
        />

        <div className="flex flex-col items-center justify-center px-3">
        {value.length > 0 &&
          value.map(function (selectedOption: OptionType) {
            // console.log('curr:', selectedOption)
            return (
              <ProfileItemsMultiMode
                key={selectedOption.dataObject!.id}
                name={selectedOption.dataObject!.name}
                id={selectedOption.dataObject!.id.toString()}
                email={selectedOption.dataObject!.email}
              />
            )
          })
        }
        </div>
      </div>
    );
  }
};

export default ProfileSelector;
