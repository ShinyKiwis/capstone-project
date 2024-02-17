import React, { useEffect } from "react";

interface DropdownMenuProps {
  name: string,
  variant?: string,
  options: OptionType[],
  selectClassname?: string,
  optionClassname?: string,
  value: string | number,
  onChange: any;
}

interface VariantMappings {
  [key: string]: { [key: string]: string };
}

const variantMappings: VariantMappings = {
  normal: {
    select: "w-full bg-lightgray rounded-md px-2 py-2",
    option: "bg-white"
  }
}



const DropdownMenu = ({ name, variant, selectClassname, optionClassname, options, value, onChange}: DropdownMenuProps) => {
  let selectVariantClass: string;
  let optionVariantClass: string;
  if (variant && variant in variantMappings) {
    selectVariantClass = variantMappings[variant]['select']
    optionVariantClass = variantMappings[variant]['option']
  }
  else {
    selectVariantClass = variantMappings['normal']['select']
    optionVariantClass = variantMappings['normal']['option']
  }

  return (
    <select
      name={name}
      className={`${selectClassname} ${selectVariantClass}`}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {options.map(function (option) {
        return (
          <option
            value={option.value}
            key={option.value}
            className={`${optionClassname} ${optionVariantClass}`}
          >
            {option.label}
          </option>
        )
      })}
    </select>
  );
};

export default DropdownMenu;
