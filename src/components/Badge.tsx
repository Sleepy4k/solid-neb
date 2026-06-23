import { Component } from "solid-js";

interface BadgeProps {
  text: string;
  variant?: "accent" | "outline" | "subtle" | "dark";
  size?: "sm" | "md";
  class?: string;
}

const Badge: Component<BadgeProps> = (props) => {
  const sizeClasses =
    props.size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  const variantClasses = {
    accent: "bg-primary-500 text-white",
    outline: "border border-gray-200 text-gray-600 bg-white",
    subtle: "bg-gray-100 text-gray-600",
    dark: "bg-gray-900 text-white",
  };

  return (
    <span
      class={`inline-flex items-center font-medium rounded-full ${sizeClasses} ${variantClasses[props.variant || "outline"]} ${props.class || ""}`}
    >
      {props.text}
    </span>
  );
};

export default Badge;
