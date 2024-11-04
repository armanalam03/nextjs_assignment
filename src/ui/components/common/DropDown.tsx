import type { DropdownOptionType } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import React from "react";

const DropDown = ({
  open,
  onOpenChange,
  selectedOption,
  setSelectedOption,
  dropdownOptions,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOption: DropdownOptionType;
  setSelectedOption: (option: DropdownOptionType) => void;
  dropdownOptions: DropdownOptionType[];
}) => {
  return (
    <Popover onOpenChange={onOpenChange} open={open}>
      <PopoverTrigger>
        <div className="rounded-xl bg-transparent border border-gray-300 py-2 px-3 flex items-center gap-2">
          <span className="text-black/50 font-bold text-sm">
            {selectedOption.title}
          </span>
          <ChevronDown
            size={16}
            className={cn({
              "transform rotate-180": open,
            })}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit rounded-xl p-2 bg-white mt-2 border border-gray-200 max-h-96 overflow-y-auto">
        <ul>
          {dropdownOptions.map((option) => (
            <li
              key={option.title}
              className="py-2 px-4 hover:bg-gray-200 cursor-pointer rounded-xl text-sm"
              onClick={() => {
                setSelectedOption(option);
                onOpenChange(false);
              }}
            >
              {option.title}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default DropDown;
