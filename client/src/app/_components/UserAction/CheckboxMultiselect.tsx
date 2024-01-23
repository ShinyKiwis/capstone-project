"use client";

import React, { RefCallback, useEffect, useState } from "react";
import Select, { components, OptionProps } from 'react-select';

interface CheckboxMultiselectProps {
  name: string;
  variant?: string;
  options: OptionType[];
  isClearable?: boolean;
  className?: string;
  placeholder?: string;
  valueSetter: any;
  value?: OptionType[];
  renderSelected?: boolean;
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
        borderRadius: "4px",
        padding: "0.1em 0.3em",
      }),
      multiValueRemove: (baseStyles: any, state: any) => ({
        display: 'none',
      }),
    },
  },
};

const testOptions = [
  { value: "option 1", label: "option 1", dataObject: {} },
  { value: "option 2", label: "option 2", dataObject: {} },
  { value: "option 3", label: "option 3", dataObject: {} },
  { value: "option 4", label: "option 4", dataObject: {} },
];

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest}: OptionProps<OptionType>) => {

  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);  
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style
  };

  return (
    <components.Option 
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} onChange={()=>{}}/>
      <span className="ml-2">{children}</span>
    </components.Option>
  );
};

const CheckboxMultiselect = ({
  name,
  variant,
  options,
  isClearable,
  className,
  placeholder,
  value,
  valueSetter,
  renderSelected = true,
}: CheckboxMultiselectProps) => {
  let innerClassnames: object;
  let customStyles: object;

  if (variant && variant in variantMappings) {
    innerClassnames = variantMappings[variant]["innerClassnames"];
    customStyles = variantMappings[variant]["customStyle"];
  } else {
    innerClassnames = variantMappings["normal"]["innerClassnames"];
    customStyles = variantMappings["normal"]["customStyle"];
  }

  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  function handleChange(e: any){
    if (Array.isArray(e)) {
      console.log(e)
      setSelectedOptions(e);
      // valueSetter(e)
    }
  }

  return (
    <div className="App">
      <Select
        isMulti={true}
        name={name}
        className={className}
        classNames={innerClassnames}
        styles={customStyles}
        classNamePrefix="select"
        placeholder={placeholder}
        isClearable={isClearable || false}
        maxMenuHeight={250}
        controlShouldRenderValue={renderSelected}
        onChange={valueSetter}
        value={value}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        hideSelectedOptions={false}
        options={options}
        // value={selectedOptions}
        // onChange={handleChange}
        components={{
          Option: InputOption
        }}
      />
    </div>
  );
};

export default CheckboxMultiselect;
