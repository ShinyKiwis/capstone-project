"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Profile from "../Profile";
import { CgClose } from "react-icons/cg";
import {
  Input,
  CheckIcon,
  Combobox,
  Group,
  InputBase,
  useCombobox,
} from "@mantine/core";

interface ProfileSelectorProps {
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string[];
  label?: string;
  description?: string;
  error?: string;
  placeholder?: string;
  optionsData: UserOptType[];
  limit?:number
}
//   onChange,
//   value,
//   optionsData,
//   label,
//   description,
//   error,
//   placeholder
// }: ProfileSelectorProps) => {
//   // const user = useUser();

// const ProfileItemsMultiMode = ({
//   name,
//   id,
//   email,
// }: {
//   name: string;
//   id?: string;
//   email?: string;
// }) => {
//   return (
//     <div className="flex w-full items-center pt-4">
//       <div>
//         <Profile
//           type="horizontal"
//           username={name}
//           email={email}
//           userId={id}
//         />
//       </div>
//       <div className="right-0 ml-auto">
//         <CgClose
//           size={25}
//           className="text-lack hover:text-lightgray cursor-pointer"
//           // Hande remove selected profile item:
//           onClick={() => {
//             let targetIndex = -1;
//             if (value.length > 0) {
//               targetIndex = value.findIndex(
//                 (selectedOpt) => selectedOpt === id,
//               );
//             }
//             // console.log("Found index:", targetIndex)
//             if (targetIndex > -1) {
//               value.splice(targetIndex, 1);
//               onChange([...value]);
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

//   var options = optionsData.map((opt) => {
//     return {
//       value: opt.id,
//       label: `${opt.id} - ${opt.name}`,
//     };
//   });

//   return (
//     <div className="flex h-full flex-col">
//       <MultiSelect
//         label = {label}
//         description={description}
//         error={error}
//         placeholder={placeholder}
//         data={options}
//         limit={15}
//         comboboxProps={{ shadow: "md" }}
//         styles={{ pill: { display: "none" } }}
//         value={value}
//         onChange={onChange}
//         searchable
//         nothingFoundMessage="No results"
//       />

//       <div className="flex flex-1 flex-col items-center justify-center px-3">
//         {value.length > 0 &&
//           value.map((selectedVal) => {
//             let selectedInstructor = optionsData.find(
//               (opt) => opt.id === selectedVal,
//             );
//             if (!selectedInstructor) return;
//             return (
//               <ProfileItemsMultiMode
//                 name={selectedInstructor.name}
//                 id={selectedInstructor.id}
//                 email={selectedInstructor.email}
//                 key={selectedInstructor.id}
//               />
//             );
//           })}
//       </div>
//     </div>
//   );
// };

function ProfileSelector({
  label,
  description,
  error,
  placeholder,
  value,
  onChange,
  optionsData,
  limit
}: ProfileSelectorProps) {
  const [search, setSearch] = useState("");

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  function handleValueSelect(val: string){
    setSearch('');
    onChange((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val],
    );
  }

  const handleValueRemove = (val: string) =>  // For backspace remove
    onChange((current) => current.filter((v) => v !== val));

  var searchedOpts = optionsData
    .filter(
      (item: UserOptType) =>
        item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
        item.id.includes(search.trim().toLowerCase()),
    );
    
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

  // Search (filter) and render options
  const SelectOptions = () => {
    if (limit && searchedOpts.length > limit) searchedOpts.splice(limit);

    return searchedOpts.map((item:UserOptType) => (
      <Combobox.Option value={item.id} key={item.id}>
        <Group gap="sm">
          {value.includes(item.id) ? <CheckIcon size={12} /> : null}
          <span>{`${item.id} - ${item.name}`}</span>
        </Group>
      </Combobox.Option>
    ));
  }
  

  return (
    <Input.Wrapper label={label} description={description} error={error}>
      <Combobox
        store={combobox}
        // withinPortal={false}
        onOptionSubmit={handleValueSelect}
      >
        <Combobox.DropdownTarget>
          <Combobox.EventsTarget>
            <InputBase
              onFocus={() => combobox.openDropdown()}
              onBlur={() => combobox.closeDropdown()}
              value={search}
              placeholder={placeholder}
              onChange={(event) => {
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              }}
              // onKeyDown={(event) => {
              //   if (event.key === "Backspace" && search.length === 0 && value.length>0) {
              //     event.preventDefault();
              //     handleValueRemove(value[value.length - 1]);
              //   }
              // }}
            />
          </Combobox.EventsTarget>
        </Combobox.DropdownTarget>
        <Combobox.Dropdown>
          <Combobox.Options>
            {searchedOpts.length === 0 ? (
              <Combobox.Empty>No options</Combobox.Empty>
            ) : (
              <SelectOptions/>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

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
    </Input.Wrapper>
  );
}

export default ProfileSelector;
