import React, { useState } from "react";

const CheckBox = ({
  option,
  defaultChecked,
  value,
  valueArray
}: {
  option: string;
  defaultChecked?: boolean;
  value: number
  valueArray: any[]
}) => {
  const [checked, setChecked] = useState(defaultChecked)
  // if (defaultChecked && valueArray.length===0) {
  //   valueArray.push(option);
  //   defaultChecked = false;
  // }

  return (
    <div className="text-lg">
      <input
        type="checkbox"
        value={value}
        id={option}
        className="me-2"
        checked={checked}
        onChange={() => {
          setChecked(!checked);

          if (!checked) {
            valueArray.push(value);
          } else {
            // Uncheck option -> remove value from array
            const targetIdx = valueArray.findIndex((x) => x === value);
            valueArray.splice(targetIdx, 1);
          }
        }}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  );
};

export default CheckBox;
