import React, { useState } from "react";

const CheckBox = ({
  option,
}: {
  option: string;
}) => {
  const [checked, setChecked] = useState(option == "Computer Science")

  return (
    <div className="text-lg">
      <input
        type="checkbox"
        value={option}
        id={option}
        className="me-2"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  );
};

export default CheckBox;
