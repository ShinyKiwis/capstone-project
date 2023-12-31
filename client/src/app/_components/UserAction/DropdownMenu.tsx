import { Branch } from "@/app/hooks/useBranch";
import { Major } from "@/app/hooks/useMajor";
import React from "react";

interface DropdownMenuProps {
  name: string,
  variant?: string,
  selectClassname?: string,
  optionClassname?: string,
  options: (Branch|Major)[]
}

interface VariantMappings {
  [key: string]: {[key:string]:string};
}

const variantMappings: VariantMappings = {
  normal:{
    select: "w-full bg-lightgray rounded-md px-2 py-2",
    option: "bg-white"
  }
}
    


const DropdownMenu = ({name, variant, selectClassname, optionClassname, options}: DropdownMenuProps) => {
  let selectVariantClass: string;
  let optionVariantClass: string;
  if (variant && variant in variantMappings){
    selectVariantClass = variantMappings[variant]['select']
    optionVariantClass = variantMappings[variant]['option']
  }
  else{
    selectVariantClass = variantMappings['normal']['select']
    optionVariantClass = variantMappings['normal']['option']
  }


  return (
    <select 
      name={name} 
      className={`${selectClassname} ${selectVariantClass}`}
    >
      {options.map(function(option){
        return(
          <option 
            value={option.name} 
            key={option.id}
            className={`${optionClassname} ${optionVariantClass}` }
          >
            {option.name}
          </option>
        )
      })}
    </select>
  );
};

export default DropdownMenu;
