import axios from "axios";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBoxProps {
  placeholder: string;
  resultSetter: any;
}

const SearchBox = ({placeholder, resultSetter}: SearchBoxProps) => {
  const [searhValue, setSearhValue] = useState('');

  function handleSearchSubmit(){
    resultSetter(null);

    axios.get(`http://localhost:3500/projects?search=${searhValue}`)
    .then((response) => {
      const data = response.data;
      resultSetter(data.projects);    // return search result to parent's state setter
    }, (error) => {
      console.error("Err searching proj:", error);
    });
  }

  return (
    <div className="group flex w-full items-center gap-2 rounded-md border-2 border-gray px-4 py-2 focus-within:border-blue">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full outline-none"
        value={searhValue}
        onInput={e => setSearhValue(e.currentTarget.value)}
        onKeyDown={(e) =>{
          if (e.key === 'Enter') handleSearchSubmit();
        }}
      />
      <button onClick={handleSearchSubmit}>
        <BiSearch size={30} className="group-focus-within:text-blue text-gray"/>
      </button>
    </div>
  );
};

export default SearchBox;
