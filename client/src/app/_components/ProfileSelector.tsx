"use client";

import { Dispatch, SetStateAction } from "react";
import Profile from "./Profile";
import { CgClose } from "react-icons/cg";
import { MultiSelect } from "@mantine/core";
import { convertLegacyOperators } from "@mui/x-data-grid/internals";

interface ProfileSelectorProps {
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string[];
  placeholder?: string;
  optionsData: UserOptType[];
}

const ProfileSelector = ({
  onChange,
  value,
  optionsData,
  placeholder
}: ProfileSelectorProps) => {
  // const user = useUser();

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
            className="text-lack hover:text-lightgray cursor-pointer"
            // Hande remove selected profile item:
            onClick={() => {
              let targetIndex = -1;
              if (value.length > 0) {
                targetIndex = value.findIndex(
                  (selectedOpt) => selectedOpt === id,
                );
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

  var options = optionsData.map((opt) => {
    return {
      value: opt.id,
      label: `${opt.id} - ${opt.name}`,
    };
  });

  return (
    <div className="flex h-full flex-col">
      <MultiSelect
        placeholder={placeholder}
        data={options}
        limit={15}
        comboboxProps={{ shadow: "md" }}
        styles={{ pill: { display: "none" } }}
        value={value}
        onChange={onChange}
        searchable
        nothingFoundMessage="No results"
      />
      <div className="flex flex-1 flex-col items-center justify-center px-3">
        {value.length > 0 &&
          value.map((selectedVal) => {
            let selectedInstructor = optionsData.find(
              (opt) => opt.id === selectedVal,
            );
            if (!selectedInstructor) return;
            return (
              <ProfileItemsMultiMode
                name={selectedInstructor.name}
                id={selectedInstructor.id}
                email={selectedInstructor.email}
                key={selectedInstructor.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProfileSelector;
