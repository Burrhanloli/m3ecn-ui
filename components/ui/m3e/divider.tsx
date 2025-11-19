import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const dividerVariants = cva("shrink-0 border border-outline-variant", {
  variants: {
    orientation: {
      horizontal: "h-[2px] w-full",
      vertical: "h-full w-[2px]",
    },
    variant: {
      full: "",
      inset: "",
      middle: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      variant: "inset",
      className: "ml-4",
    },
    {
      orientation: "horizontal",
      variant: "middle",
      className: "mx-4",
    },
    {
      orientation: "vertical",
      variant: "inset",
      className: "mt-4",
    },
    {
      orientation: "vertical",
      variant: "middle",
      className: "my-4",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "full",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation, variant, ...props }, ref) => (
    <div
      className={cn(dividerVariants({ orientation, variant }), className)}
      ref={ref}
      {...props}
    />
  )
);
Divider.displayName = "Divider";

export { Divider };
