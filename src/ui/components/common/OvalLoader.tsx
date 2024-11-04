import { cn } from "@/lib/utils";
import React from "react";

const OvalLoader = ({
  colorHex = "#ffffff",
  thickness = 2,
  className,
}: {
  colorHex?: string;
  thickness?: number;
  className?: string;
}) => {
  const isValidHexColor = (hex: string) => /^#([0-9A-F]{3}){1,2}$/i.test(hex);

  const validColor = isValidHexColor(colorHex) ? colorHex : "#ffffff";
  return (
    <span
      className={cn("loader w-4 h-4 aspect-square border-solid", className)}
      style={{
        borderColor: validColor,
        borderBottomColor: "transparent",
        borderWidth: thickness,
      }}
    />
  );
};

export default OvalLoader;
