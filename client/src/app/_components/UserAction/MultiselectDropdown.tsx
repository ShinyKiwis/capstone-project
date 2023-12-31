import React from "react";
import Select from "react-select";

interface MultiselectDropdownProps {
  name: string;
  variant?: string;
  options: {
    label: string;
    value: string;
  }[];
  isMulti?: boolean;
  className?: string;
  placeholder?: string;
  onChange?: any;
}

interface VariantMappings {
  [key: string]: { [key: string]: any };
}
const variantMappings: VariantMappings = {
  normal: {
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

const MultiselectDropdown = ({
  name,
  variant,
  options,
  isMulti,
  className,
  placeholder,
  onChange,
}: MultiselectDropdownProps) => {
  let innerClassnames: object;
  let customStyles: object;

  if (variant && variant in variantMappings) {
    innerClassnames = variantMappings[variant]["innerClassnames"];
    customStyles = variantMappings[variant]["customStyle"];
  } else {
    innerClassnames = variantMappings["normal"]["innerClassnames"];
    customStyles = variantMappings["normal"]["customStyle"];
  }

  return (
    <Select
      options={options}
      isMulti={isMulti || false}
      name={name}
      className={className}
      classNames={innerClassnames}
      styles={customStyles}
      classNamePrefix="select"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default MultiselectDropdown;
