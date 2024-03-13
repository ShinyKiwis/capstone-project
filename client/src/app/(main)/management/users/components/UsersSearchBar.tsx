"use client";

import React from "react";
import { BiSearch } from "react-icons/bi";

interface UsersSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  searchHandler: (query: string) => void;
}

function UsersSearchBar({
  value,
  onChange,
  searchHandler,
}: UsersSearchBarProps) {
  return (
    <div className="ml-auto w-96 ">
      <div className="border-gray focus-within:border-blue group flex w-full items-center gap-2 rounded-md border-2 px-4 py-1">
        <input
          type="text"
          placeholder="Search user by name or ID"
          className="w-full outline-none"
          value={value}
          onInput={(e) => onChange(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchHandler(value);
            }
          }}
        />
        <button
          onClick={() => {
            searchHandler(value);
          }}
        >
          <BiSearch
            size={30}
            className="text-gray group-focus-within:text-blue"
          />
        </button>
      </div>
    </div>
  );
}

export default UsersSearchBar;
