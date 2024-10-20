import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  textColor?: string;
  bgColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  className?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({
  children,
  textColor = "text-black",
  bgColor = "bg-none",
  hoverBgColor = "hover:bg-lightBlueColor",
  borderColor = "border-blueColor",
  className = "",
  onClick,
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-md border-[1px] color ${bgColor} ${hoverBgColor} ${borderColor} ${textColor} ${className} transition-all duration-300`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CustomButton;
