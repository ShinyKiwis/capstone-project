import React from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBoxProps{
  placeholder?: string
}

const SearchBox = ({placeholder}: SearchBoxProps) => {
  return (
    <div className="group flex w-full items-center gap-2 rounded-md border-2 border-gray px-4 py-2 focus-within:border-blue">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full outline-none"
      />
      <BiSearch size={30} className="group-focus-within:text-blue text-gray" />
    </div>
  );
};

export default SearchBox;
