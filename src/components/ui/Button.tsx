import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

const variantClasses: Record<string, string> = {
  primary:
    "bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary disabled:bg-gray-400 text-white",
  danger:
    "bg-red-600 hover:bg-red-700 text-white",
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-2 py-1 rounded flex items-center gap-2 cursor-pointer duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
