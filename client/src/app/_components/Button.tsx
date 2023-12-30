import React from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isPrimary: boolean;
  variant: string;
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  color?: string;
}

interface VariantMappings {
  [key: string]: string;
}

const variantPrimaryMappings: VariantMappings = {
  normal:
    "text-white bg-blue border-2 border-blue hover:bg-lightblue hover:border-lightblue hover:scale-105 duration-300",
  danger: "red",
};

const variantSecondaryMappings: VariantMappings = {
  normal:
    "text-blue bg-white border-2 border-blue hover:bg-lightblue hover:border-lightblue hover:text-white hover:scale-105 duration-300",
  danger: "red",
};

const Button = ({
  onClick,
  isPrimary,
  variant,
  className,
  children,
}: ButtonProps) => {
  const variantStyle = isPrimary
    ? variantPrimaryMappings[variant]
    : variantSecondaryMappings[variant];
  return (
    <button
      onClick={onClick}
      className={`rounded-md text-center  ${className} ${variantStyle}`}
    >
      {children}
    </button>
  );
};

export default Button;
