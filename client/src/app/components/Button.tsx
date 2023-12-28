import React from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPrimary: boolean;
  variant: string;
  children: React.ReactNode;
  bgColor?: string;
  className: string;
  color?: string;
}

interface VariantMappings {
  [key: string]: string;
}

const variantMappings: VariantMappings = {
  normal: "blue",
  danger: "red",
};

const Button = ({
  onClick,
  isPrimary,
  variant,
  className,
  children,
}: ButtonProps) => {
  const variantColor = variantMappings[variant];
  const buttonClassName = isPrimary
    ? `bg-${variantColor} text-white`
    : `text-${variantColor} bg-white border-2 border-${variantColor}`;
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg py-2 ${buttonClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
