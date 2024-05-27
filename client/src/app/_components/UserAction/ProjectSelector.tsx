"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { CgClose } from "react-icons/cg";
import { ProjectCardMinimal } from "..";

interface ProjectSelectorProps {
  onChange: Dispatch<SetStateAction<string>>;
  value: string; // project id []
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  limit?: number;
  showCard?: boolean;
}

function ProjectSelector({
  value,
  onChange,
  placeholder,
  label,
  description,
  error,
  limit,
  showCard = false,
}: ProjectSelectorProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Project[]>([]); // Retreived Project objects from search API
  const [displayingProject, setDisplayingProject] = useState<Project>();
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  const searchApi = "http://localhost:3500/projects?page=1&limit=5";

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {},
  });

  const handleSearch = (query: string) => {
    setLoading(true);
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      // console.log('cleared timeout');
    }

    let newTimeout = setTimeout(async () => {
      // console.log(`Calling api: ${searchApi}&search=${query}`);
      const res = await axios.get(`${searchApi}&search=${query}`);
      // console.log("Response:", res.data);
      setData(res.data.projects);
      setLoading(false);
    }, 350);

    setCurrentTimeout(newTimeout);
  };

  useEffect(() => {
    if (data.length === 0 && !loading) {
      setLoading(true);
      axios
        .get("http://localhost:3500/projects?page=1&limit=5")
        .then((res) => {
          setData(res.data.projects);
          setLoading(false);
          combobox.resetSelectedOption();
          if (value != "") {
            let selectedProject = res.data.projects.find(
              (item: Project) => item.code.toString() === value,
            );
            setDisplayingProject(selectedProject);
          }
        })
        .catch((err) =>
          console.error("Error getting initial projects list:", err),
        );
    }
  }, []);

  const handleValueSelect = (newVal: string) => {
    onChange(newVal);
    let selectedProject = data.find((item) => item.code.toString() === newVal);
    setDisplayingProject(selectedProject);
    if (showCard) setSearch("");
    else setSearch(`${selectedProject?.code} - ${selectedProject?.name}`);
    combobox.closeDropdown();
  };

  // const handleRemove = (newVal: string) => {
  //   let availableIndex = valueIsSelected(newVal);
  //   if (availableIndex != -1)
  //     onChange((current) => [...current.splice(availableIndex, 1)]);
  // };

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
  //               // value is string[] of stringyfied selected Student objects
  //               targetIndex = value.findIndex(
  //                 (selectedOpt) => JSON.parse(selectedOpt).userId.toString() === id,
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

  const SelectOptions = () => {
    let renderedOptions = data;
    if (limit && data.length > limit) renderedOptions = data.toSpliced(limit);

    return renderedOptions.map((item: Project) => (
      <Combobox.Option value={item.code.toString()} key={item.code}>
        <Group gap="sm">
          {item.code.toString() === value ? <CheckIcon size={12} /> : null}
          <span>{`${item.code} - ${item.name}`}</span>
        </Group>
      </Combobox.Option>
    ));
  };

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
                <SelectOptions />
              )}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Input.Wrapper>
      {displayingProject && showCard ? (
        <ProjectCardMinimal projectObject={displayingProject} />
      ) : null}
    </>
  );
}

export default ProjectSelector;
