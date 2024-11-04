/* eslint-disable react/display-name */

import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils";
import OvalLoader from "./OvalLoader";

/**
 * TypeScript React component for a customizable button with various styles, sizes, loading states,
 * and disabled states.
 * Pass the product name as variant to render the button in the respective color.
 * Pass the size prop to render the button in the respective size.
 * @param {ButtonProps} props - Properties for the Button component.
 * @param {string} className - CSS classes for custom styling.
 * @param {string} variant - Specifies variant: 'affilinks', 'igcash', 'topsecrets', 'cwf', or 'vibe'.
 * default variant is can be use for 'dashboard' and 'ytcash'.
 * @param {string} size - Specifies size: 'sm', 'lg', or 'icon'.
 * @param {boolean} loading - Shows loading spinner.
 * @param {boolean} disabled - Disables the button.
 * @param {boolean} asChild - Renders as a child component.
 * @param {React.ReactNode} children - Content inside the Button.
 * @returns {JSX.Element} - Rendered Button component.
 **/

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  loaderColorHex?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      loading,
      disabled,
      loaderColorHex = "#fff",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(
          "bg-black px-6 py-3 rounded-full text-white w-fit",
          className,
          {
            "opacity-50": loading || disabled,
          }
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <OvalLoader colorHex={loaderColorHex} /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

/**
 * TypeScript React component for a button with customizable title text.
 * Either pass the text as children or the react element as children.
 * @property {React.ReactNode} children - Button title text.
 * @property {string} className - CSS classes for custom styling.
 */
type ButtonTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const ButtonTitle = React.forwardRef<HTMLDivElement, ButtonTitleProps>(
  ({ children, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex justify-center items-center leading-6 tracking-wide",
        className
      )}
    >
      {children}
    </div>
  )
);

/**
 * TypeScript React component for a button icon, either an image or a div with optional children.
 * Pass in the src prop to render an image, or children to render a div with children.
 * With src prop, pass the image height, width, and optional className.
 * With children prop, pass the optional className.
 * @param {ButtonIconProps} props - Properties for the ButtonIcon component.
 * @param {string} src - Image source.
 * @param {string} className - CSS classes for custom styling.
 * @param {string | number} height - Height of the icon.
 * @param {string | number} width - Width of the icon.
 */
type ButtonIconProps = {
  src?: string;
  className?: string;
  height?: number | `${number}`;
  width?: number | `${number}`;
  children?: React.ReactNode;
};

const ButtonIcon = React.forwardRef<
  HTMLImageElement | HTMLDivElement,
  ButtonIconProps
>(({ src, className, height, width, children }, ref) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="icon"
        height={height}
        width={width}
        className={className}
      />
    );
  } else {
    return (
      <div
        ref={ref as React.MutableRefObject<HTMLDivElement>}
        className={cn("flex justify-center items-center", className)}
      >
        {children}
      </div>
    );
  }
});

export { Button, ButtonIcon, ButtonTitle };
