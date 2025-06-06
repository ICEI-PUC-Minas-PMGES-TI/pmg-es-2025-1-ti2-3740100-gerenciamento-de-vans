import * as React from "react";
import { cn } from "@/lib/utils";
import inputMasks, { MaskTypes } from "@/lib/masks";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  maskType?: MaskTypes;
  className?: string;
};

function Input({ maskType, className, onChange, ...props }: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (maskType) {
      const maskFunction = inputMasks[maskType];
      event.currentTarget.value = maskFunction(event);
    }

    if (typeof onChange === "function") {
      onChange(event);
    }
  };

  return (
    <input
      type="text"
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      onChange={handleChange}
      {...props}
    />
  );
}

export { Input };