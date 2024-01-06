import React from "react";

interface DropdownMenuProps {
  name: string,
  variant?: string,
  selectClassname?: string,
  optionClassname?: string,
  options: {
    title: string,
    value: string
  }[],
  onChange?: any
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
    


const DropdownMenu = ({name, variant, selectClassname, optionClassname, options, onChange}: DropdownMenuProps) => {
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
      onChange={(e)=>onChange(e.target.value)}
    >
      {options.map(function(opt, index){
        return(
          <option 
            value={opt.value} 
            key={index}
            className={`${optionClassname} ${optionVariantClass}`}
          >
            {opt.title}
          </option>
        )
      })}
    </select>
  );
};

export default DropdownMenu;
