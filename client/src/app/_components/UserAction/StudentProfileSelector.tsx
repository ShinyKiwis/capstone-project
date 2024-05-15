"use client"
import { Dispatch, SetStateAction, useState } from "react";
import {
  CheckIcon,
  Combobox,
  Group,
  Input,
  InputBase,
  Loader,
  useCombobox,
} from "@mantine/core";
import axios from "axios";
import Profile from "../Profile";
import { CgClose } from "react-icons/cg";
import { Student } from "@/app/interfaces/User.interface";

interface StudentProfileSelectorProps {
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string[]; // stringyfied Student[]
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  searchApi: string;
  limit?:number;
  mode?: 'single' | 'multi'
}

function StudentProfileSelector({
  value,
  onChange,
  placeholder,
  label,
  description,
  error,
  searchApi,
  limit,
  mode = 'multi'
}: StudentProfileSelectorProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Student[]>([]); // Retreived Student objects from search API
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  const parsedValues:Student[] = value.map((valueString) => JSON.parse(valueString));
  function valueIsSelected(newVal:string): number {
    // Return index of value if it is already selected, else -1
    let parsedNewValue:Student = JSON.parse(newVal)
    return parsedValues.findIndex((selectedValue:Student) => selectedValue.userId === parsedNewValue.userId)
  }

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (data.length === 0 && !loading) {
        setLoading(true);
        axios
          .get("http://localhost:3500/users/students?search=")
          .then((res) => {
            setData(res.data);
            setLoading(false);
            combobox.resetSelectedOption();
          })
          .catch((err) =>
            console.error("Error getting initial students:", err),
          );
      }
    },
  });

  const handleSearch = (query: string) => {
    setLoading(true);
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      // console.log('cleared timeout');
    }

    let newTimeout = setTimeout(async () => {
      // console.log(`Calling api: ${searchApi}?search=${query}`);
      const res = await axios.get(`${searchApi}?search=${query}`);
      // console.log("Response:", res.data);
      setData(res.data);
      setLoading(false);
    }, 350);

    setCurrentTimeout(newTimeout);
  };

  const handleValueSelect = (newVal: string) => {
    setSearch('');
    let availableIndex = valueIsSelected(newVal);
    if (mode === 'single'){
      onChange((current) =>{return [newVal]});
      combobox.closeDropdown();
    }
    else
      onChange((current) =>{  // current: currently selected values
        return availableIndex !== -1
          ? [...current.splice(availableIndex, 1)]   // click on already selected val remove that value from selected list
          : [...current, newVal]
      });
  };

  const handleRemove = (newVal: string) => {
    let availableIndex = valueIsSelected(newVal);
    if (availableIndex != -1)
      onChange((current) => [...current.splice(availableIndex, 1)]);
  };

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
                // value is string[] of stringyfied selected Student objects
                targetIndex = value.findIndex(
                  (selectedOpt) => JSON.parse(selectedOpt).userId.toString() === id,
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

  const SelectOptions = () => {
    let renderedOptions = data;
    if (limit && data.length > limit) renderedOptions = data.toSpliced(limit);

    return renderedOptions.map((item:Student) => (
      <Combobox.Option value={JSON.stringify(item)} key={item.userId}>
      <Group gap="sm">
        {valueIsSelected(JSON.stringify(item)) !== -1 ? <CheckIcon size={12} /> : null}
        <span>{`${item.userId} - ${item.user.name}`}</span>
      </Group>
    </Combobox.Option>
    ));
  }

  return (
    <>
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
              onClick={() => combobox.openDropdown()}
              value={search}
              placeholder={placeholder}
              rightSection={
                loading ? <Loader size={18} /> : <Combobox.Chevron />
              }
              onChange={(event) => {
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
                handleSearch(event.currentTarget.value);
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
            {loading ? (
              <Combobox.Empty>Loading....</Combobox.Empty>
            ) : data.length === 0 ? (
              <Combobox.Empty>No options</Combobox.Empty>
            ) : (
              <SelectOptions/>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Input.Wrapper>

      <div className="flex flex-1 flex-col items-center justify-center px-3">
        {value.length > 0 &&
          value.map((selectedVal) => {
            let selectedUsr: Student = JSON.parse(selectedVal);
            return (
              <ProfileItemsMultiMode
                name={selectedUsr.user.name}
                id={selectedUsr.userId.toString()}
                email={selectedUsr.user.email}
                key={selectedUsr.userId}
              />
            );
          })}
      </div>
    </>
  );
}

export default StudentProfileSelector;
