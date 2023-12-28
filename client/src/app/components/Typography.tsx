import React from "react";

interface TypographyProps {
  variant: string;
  text: string;
  color?: string;
  className?: string;
}

interface VariantMappings {
  [key: string]: React.ElementType;
}

interface VariantClassesMappings {
  [key: string]: string;
}

const variantMappings: VariantMappings = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

const variantClassesMappings: VariantClassesMappings = {
  h1: "text-2xl",
  h2: "text-xl",
};

const Typography = ({
  variant,
  text,
  color='',
  className = "",
}: TypographyProps) => {
  const Component: React.ElementType = variantMappings[variant] || "p";
  const variantClass = variantClassesMappings[variant] || "";
  const variantColor = color;
  return (
    <Component
      className={`font-bold tracking-wide ${variantClass} ${className} ${variantColor}`}
    >
      {text}
    </Component>
  );
};

export default Typography;
