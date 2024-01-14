import React, { useEffect, useState } from "react";
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import { OptionType } from "../ProfileSelector";

export interface StudentDataType{
  id: string;
  email: string;
  username: string;
  name: string;
}

interface AsyncMultiselectDropdownProps {
  name: string;
  variant?: string;
  // options: {
  //   label: string;
  //   value: string;
  // }[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  apiLink: string;
  value: OptionType[];
  onChange: any;
}

interface VariantMappings {
  [key: string]: { [key: string]: any };
}
const variantMappings: VariantMappings = {
  normal: {
    innerClassnames: {
      control: ()=>"flex px-2 py-1 focus-within:border-blue",
      valueContainer: () => "bg-white ",
    },
    customStyle: {
      control: (baseStyles: any, state: any) => ({
        // surrounding input box and clear, dropdown buttons
        alignItems: 'center',
        borderWidth: '2px',
        borderColor: 'gray',
        justifyContent: 'space-between',
        minHeight: '38px',
        transition: 'all 100ms',
        borderRadius: '6px',
      }),

      indicatorsContainer: (baseStyles: any, state: any) => ({
        // contains the clear and dropdown button
        ...baseStyles,
      }),
      clearIndicator: (baseStyles: any, state: any) => ({
        ...baseStyles,
      }),
      dropdownIndicator: (baseStyles: any, state: any) => ({
        ...baseStyles,
      }),

      multiValueLabel: (baseStyles: any, state: any) => ({
        ...baseStyles,
      }),
      multiValueRemove: (baseStyles: any, state: any) => ({
        ...baseStyles,
      }),
      indicatorSeparator: (baseStyles: any, state: any) => ({
        display: 'none',
      }),
    },
  },

  grayscale: {
    innerClassnames: {
      valueContainer: () => "bg-lightgray ",
    },
    customStyle: {
      control: (baseStyles: any, state: any) => ({
        // surrounding input box and clear, dropdown buttons
        ...baseStyles,
        backgroundColor: "#CACACA",
        display: "flex",
        width: "100%",
        alignItems: "center",
      }),

      indicatorsContainer: (baseStyles: any, state: any) => ({
        // contains the clear and dropdown button
        display: "flex",
        alignItems: "center",
        backgroundColor: "#CACACA",
        height: "100%",
      }),
      clearIndicator: (baseStyles: any, state: any) => ({
        display: "flex",
        transition: "color 150ms",
        color: "black",
        padding: "8px",
      }),
      dropdownIndicator: (baseStyles: any, state: any) => ({
        backgroundColor: "#CACACA",
        color: "black",
        transition: "color 150ms",
        height: "100%",
        alignItems: "center",
        padding: "8px",
      }),

      multiValueLabel: (baseStyles: any, state: any) => ({
        backgroundColor: "#f8f8f2",
        color: "black",
        borderRadius: "2px 0 0 2px",
        padding: "0.1em 0.3em",
      }),
      multiValueRemove: (baseStyles: any, state: any) => ({
        backgroundColor: "#777",
        color: "white",
        borderRadius: "0 2px 2px 0",
        padding: "0.1em 0.2em",
        display: "flex",
        alignItems: "center",
      }),
    },
  },
};

const AsyncMultiselectDropdown = ({
  name,
  variant,
  isMulti,
  className,
  placeholder,
  apiLink,
  value,
  onChange,
}: AsyncMultiselectDropdownProps) => {
  useEffect(() => {
    console.log("Current val:", value)
  }, [value]);

  let innerClassnames: object;
  let customStyles: object;

  if (variant && variant in variantMappings) {
    innerClassnames = variantMappings[variant]["innerClassnames"];
    customStyles = variantMappings[variant]["customStyle"];
  } else {
    innerClassnames = variantMappings["normal"]["innerClassnames"];
    customStyles = variantMappings["normal"]["customStyle"];
  }

  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>();
  const defaultOptions = [    // retreived first 20 students ?
    {value:'1', label:'Default1', dataObject:{}},
    {value:'2', label:'Default2', dataObject:{}},
    {value:'3', label:'Default3', dataObject:{}},
  ]

  const promiseOptions = (query: string) =>{
    if (currentTimeout){
      clearTimeout(currentTimeout);
      // console.log('cleared timeout');
    }
    console.log("Query string:", query);

    return new Promise<OptionType[]>((resolve) => {
      let newTimeout = setTimeout(async() => {
        console.log(`Calling api: ${apiLink}${query}`)
        const res = await axios.get(`${apiLink}${query}`);
        // const data = await res.json();
        let newOptions = res.data.map((resData: StudentDataType) => {
          return {
            label:`${resData.id} - ${resData.name}`,
            value: resData.id,
            dataObject: resData
          }
        })
        console.log("Retreived options:", newOptions);        
        resolve(newOptions);
      }, 350);

      setCurrentTimeout(newTimeout);
    });
  }

  return (
    <AsyncSelect
      // defaultOptions={defaultOptions}
      isMulti={isMulti || false}
      name={name}
      className={className}
      classNames={innerClassnames}
      styles={customStyles}
      classNamePrefix="select"
      placeholder={placeholder}
      isClearable={false}
      maxMenuHeight={250}
      controlShouldRenderValue={false}
      value={value}
      onChange={onChange}
      loadOptions={promiseOptions}
      cacheOptions={true}
    />
  );
};

export default AsyncMultiselectDropdown;
