import { Component, JSX } from "solid-js";
import { A } from "@solidjs/router";

interface ButtonProps {
  children: JSX.Element;
  variant?: "primary" | "outline" | "ghost" | "accent";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  class?: string;
  disabled?: boolean;
}

const Button: Component<ButtonProps> = (props) => {
  const baseClasses =
    "inline-flex items-center justify-center px-6 py-3 font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900",
    outline:
      "border border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-gray-300",
    ghost:
      "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-300",
    accent:
      "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500",
  };

  const classes = `${baseClasses} ${variantClasses[props.variant || "primary"]} ${props.class || ""} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (props.href) {
    if (props.href.startsWith("http") || props.href === "#") {
      return (
        <a
          href={props.href}
          class={classes}
          target={props.href.startsWith("http") ? "_blank" : undefined}
        >
          {props.children}
        </a>
      );
    }

    return (
      <A href={props.href} class={classes}>
        {props.children}
      </A>
    );
  }

  return (
    <button
      type={props.type || "button"}
      class={classes}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
