import React, { useState } from "react";

const CheckBox = ({
  option,
  defaultChecked,
  valueArray
}: {
  option: string;
  defaultChecked?: boolean;
  valueArray: string[]
}) => {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="text-lg">
      <input
        type="checkbox"
        value={option}
        id={option}
        className="me-2"
        checked={checked}
        onChange={() => {
          setChecked(!checked);

          if (!checked) {
            valueArray.push(option.toLowerCase());
          } else {
            // Uncheck option -> remove value from array
            const targetIdx = valueArray.findIndex((x) => x === option.toLowerCase());
            valueArray.splice(targetIdx, 1);
          }
        }}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  );
};

export default CheckBox;
