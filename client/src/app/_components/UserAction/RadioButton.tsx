import React from "react";

interface RadioButtonProps {
  label: string;
  name: string;
  value: string | number;
  valueSetter: any;
  defaultChecked?: boolean
}

const RadioButton = ({label, name, value, valueSetter, defaultChecked}: RadioButtonProps) => {

  return (
    <div className="text-lg">
      <input
        type="radio"
        name={name}
        value={value}
        id={`${value}-${label}`}
        className="me-2"
        defaultChecked={defaultChecked}
        onChange={(e) => {
          valueSetter(value)
        }}
      />
      <label htmlFor={`${value}-${label}`}>{label}</label>
    </div>
  );
};

export default RadioButton;
