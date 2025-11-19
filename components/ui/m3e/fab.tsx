import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const fabVariants = cva(
  "relative mr-[16px] mb-[16px] inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-[16px] font-medium outline-none transition-all duration-100 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-8 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-96 active:before:opacity-12 disabled:pointer-events-none disabled:bg-on-surface/12 disabled:text-on-surface/38 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "m3-elevation-3 hover:m3-elevation-4 active:m3-elevation-3 bg-primary-container text-on-primary-container hover:before:bg-on-primary-container/8 active:before:bg-on-primary-container/12",
        secondary:
          "m3-elevation-3 hover:m3-elevation-4 active:m3-elevation-3 bg-secondary-container text-on-secondary-container hover:before:bg-on-secondary-container/8 active:before:bg-on-secondary-container/12",
        tertiary:
          "m3-elevation-3 hover:m3-elevation-4 active:m3-elevation-3 bg-tertiary-container text-on-tertiary-container hover:before:bg-on-tertiary-container/8 active:before:bg-on-tertiary-container/12",
      },
      size: {
        standard:
          "size-[56px] min-h-[56px] min-w-[56px] [&_svg:not([class*='size-'])]:size-[24px]",
        medium:
          "size-[80px] min-h-[80px] min-w-[80px] [&_svg:not([class*='size-'])]:size-[32px]",
        large:
          "size-[96px] min-h-[96px] min-w-[96px] [&_svg:not([class*='size-'])]:size-[36px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "standard",
    },
  }
);

type FabProps = React.ComponentProps<"button"> &
  VariantProps<typeof fabVariants> & {
    asChild?: boolean;
    icon: React.ReactNode;
  };

function Fab({
  className,
  variant,
  size,
  asChild = false,
  icon,
  ...props
}: FabProps) {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(event);
      }
    },
    [props.onClick]
  );

  const fabClass = cn(fabVariants({ variant, size }), className);

  if (asChild) {
    return <Slot className={fabClass} data-slot="fab" {...props} />;
  }

  return (
    <motion.button
      className={fabClass}
      data-slot="fab"
      onClick={handleClick}
      transition={{
        duration: 0.35,
        ease: [0.2, 0.0, 0, 1.0],
      }}
      {...(props as HTMLMotionProps<"button">)}
    >
      {icon}
    </motion.button>
  );
}

export { Fab, fabVariants, type FabProps };
