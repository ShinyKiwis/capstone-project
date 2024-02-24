import React, { useState } from "react";

const CheckBox = ({
  option,
  defaultChecked,
  value,
  valueArray,
  onChange:ArraySetter
}: {
  option: string;
  defaultChecked?: boolean;
  value: number
  valueArray: any[],
  onChange: any
}) => {
  const [checked, setChecked] = useState(defaultChecked);

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
            ArraySetter([...valueArray])
          } else {
            // Uncheck option -> remove value from array
            const targetIdx = valueArray.findIndex((x) => x === value);
            valueArray.splice(targetIdx, 1);
            ArraySetter([...valueArray])
          }
        }}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  );
};

export default CheckBox;
