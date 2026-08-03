import React from "react";

interface TitleProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3";
  size?: "2xl" | "xl" | "lg" | "md" | "sm";
  align?: "left" | "center" | "right";
  className?: string;
  subtitle?: string;
  subtitleClassName?: string;
}

const Title = ({
  children,
  variant = "h2",
  size = "xl",
  align = "left",
  className = "",
  subtitle,
  subtitleClassName = "",
}: TitleProps) => {
  const sizeClasses = {
    "2xl": "text-3xl sm:text-4xl",
    xl: "text-2xl sm:text-3xl",
    lg: "text-xl sm:text-2xl",
    md: "text-base md:text-lg",
    sm: "text-sm md:text-base",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const baseClasses = "font-bold mb-4";
  const classes = `${baseClasses} ${sizeClasses[size]} ${alignClasses[align]} ${className}`;

  const Tag = variant;

  return (
    <div>
      <Tag className={classes}>{children}</Tag>
      {subtitle && (
        <p
          className={`text-base sm:text-lg ${alignClasses[align]} ${subtitleClassName}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Title;
