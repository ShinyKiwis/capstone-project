import { Dispatch, SetStateAction, useState } from "react";
import {
  CheckIcon,
  Combobox,
  ComboboxOptionProps,
  Group,
  Input,
  InputBase,
  Loader,
  OptionsDropdownProps,
  Pill,
  PillsInput,
  useCombobox,
} from "@mantine/core";
import axios from "axios";
import Profile from "./Profile";
import { CgClose } from "react-icons/cg";

interface ProfileSelectorAsyncProps {
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string[];
  placeholder?: string;
  searchApi: string;
}

const MOCKDATA:UserOptType[] = [
  { name: "Van Ba", id: "1234567", email: "testmai1@gmail.com" },
  { name: "Nguyen An", id: "20112337", email: "testmai2@gmail.com" },
  {
    name: "Vo Thi Ngoc Truong Chau",
    id: "22314567",
    email: "testmai3@hcmut.edu.vn",
  },
];

function getAsyncData() {
  return new Promise<UserOptType[]>((resolve) => {
    setTimeout(() => resolve(MOCKDATA), 1000);
  });
}

function ProfileSelectorAsync({
  value,
  onChange,
  placeholder,
  searchApi,
}: ProfileSelectorAsyncProps) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserOptType[]>([]);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (data.length === 0 && !loading) {
        setLoading(true);
        getAsyncData().then((response) => {
          setData(response);
          setLoading(false);
          combobox.resetSelectedOption();
        });
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
      // // console.log(`Calling api: ${apiLink}${query}`)
      // const res = await axios.get(`${searchApi}${search}`);
      // // const data = await res.json();
      // let newOptions = res.data.map((resData: any) => {
      //   return {
      //     label: `${resData.userId} - ${resData.user.name}`,
      //     value: resData.userId.toString(),
      //   };
      // });
      // // console.log("Retreived options:", newOptions);
      // setData(newOptions);
      // setLoading(false)
      setData(
        query === "" ? MOCKDATA : [{name:"seachedUser", id:"1", email:"mail@mail.com"}],
      );
      setLoading(false);
    }, 350);

    setCurrentTimeout(newTimeout);
  };

  const handleValueSelect = (val: string) =>{    
    onChange((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val],
    );
  }

  const handleValueRemove = (val: string) =>{
    onChange((current) => current.filter((v) => v !== val));
  }

  const options = data.map((item) => (
    <Combobox.Option value={JSON.stringify(item)} key={item.id}>
      <Group gap="sm">
        {value.includes(JSON.stringify(item)) ? <CheckIcon size={12} /> : null}
        <span>{`${item.id} - ${item.name}`}</span>
      </Group>
    </Combobox.Option>
  ));

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
                  (selectedOpt) => JSON.parse(selectedOpt).id === id,
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

  return (
    <div>
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
              rightSection={
                loading ? <Loader size={18} /> : <Combobox.Chevron />
              }
              onChange={(event) => {
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
                handleSearch(event.currentTarget.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && search.length === 0) {
                  event.preventDefault();
                  handleValueRemove(value[value.length - 1]);
                }
              }}
            />
          </Combobox.EventsTarget>
        </Combobox.DropdownTarget>
        <Combobox.Dropdown>
          <Combobox.Options>
            {loading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <div className="flex flex-1 flex-col items-center justify-center px-3">
        {value.length > 0 &&
          value.map((selectedVal) => {
            let selectedUsr = JSON.parse(selectedVal)
            return (
              <ProfileItemsMultiMode
                name={selectedUsr!.name}
                id={selectedUsr!.id}
                email={selectedUsr!.email}
                key={selectedUsr!.id}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ProfileSelectorAsync;
