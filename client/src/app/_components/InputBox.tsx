import React, { use } from "react";

interface InputBoxProps {
  inputName: string;
  placeholderText: string;
  autoFocus?: boolean;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  inputName,
  placeholderText,
  autoFocus = false,
  type,
  onChange,
}: InputBoxProps) => {
  const inputType = type || "";
  return (
    <input
      autoFocus={autoFocus}
      name={inputName}
      placeholder={placeholderText}
      type={inputType}
      className="focus:outline-blue flex w-full items-center rounded border-2 px-4 py-2 focus:border-transparent focus:outline"
      onChange={(e) => onChange(e)}
    />
  );
};

export default InputBox;
