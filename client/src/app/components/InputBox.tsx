import React, { use } from "react";

interface InputBoxProps {
  inputName: string;
  placeholderText: string;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  inputName,
  placeholderText,
  type,
  onChange,
}: InputBoxProps) => {
  const inputType = type || "";
  return (
    <input
      name={inputName}
      placeholder={placeholderText}
      type={inputType}
      className="flex w-full items-center rounded border-2 border-solid px-[10px] py-[7px]"
      onChange={e => onChange(e)}
    />
  );
};

export default InputBox;
