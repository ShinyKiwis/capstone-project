import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBox = () => {
  return (
    <div className="group flex w-full items-center gap-2 rounded-md border-2 border-gray px-4 py-2 focus-within:border-blue">
      <input
        type="text"
        placeholder="Search projects..."
        className="w-full outline-none"
      />
      <BiSearch size={30} className="group-focus-within:text-blue text-gray" />
    </div>
  );
};

export default SearchBox;
