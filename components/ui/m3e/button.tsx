import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const getCornerRadius = (
  size: string,
  shape: string,
  isPressed?: boolean,
  isSelected?: boolean,
  type?: string
) => {
  let effectiveShape = shape;
  if (isSelected && type === "toggle" && shape === "round") {
    effectiveShape = "square";
  } else if (isSelected && type === "toggle" && shape === "square") {
    effectiveShape = "round";
  }
  if (effectiveShape === "round") {
    return "rounded-full";
  }
  const radii = {
    xs: isPressed ? "rounded-[4px]" : "rounded-[8px]",
    s: isPressed ? "rounded-[4px]" : "rounded-[8px]",
    m: isPressed ? "rounded-[8px]" : "rounded-[12px]",
    l: isPressed ? "rounded-[8px]" : "rounded-[12px]",
    xl: isPressed ? "rounded-[8px]" : "rounded-[12px]",
  };
  return radii[size as keyof typeof radii] ?? "rounded-lg";
};

const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-[8px] overflow-hidden whitespace-nowrap font-medium outline-none before:absolute before:inset-0 before:opacity-0 hover:before:opacity-8 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-96 active:before:opacity-10 disabled:pointer-events-none disabled:shadow-none disabled:active:scale-100 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled:
          "m3-elevation-0 hover:m3-elevation-1 active:m3-elevation-0 data-[button-type=toggle]:data-[state=checked]:m3-elevation-1 data-[button-type=toggle]:data-[state=checked]:active:m3-elevation-0 data-[button-type=toggle]:data-[state=checked]:hover:m3-elevation-2 hover:before:bg-on-primary/8 focus-visible:ring-secondary/20 active:before:bg-on-primary/10 disabled:bg-on-surface/10 disabled:text-on-surface/38 data-[button-type=toggle]:data-[state=checked]:bg-primary data-[button-type=toggle]:data-[state=checked]:text-on-primary data-[button-type=default]:bg-primary data-[button-type=toggle]:not([data-state=checked]):bg-surface-container data-[button-type=default]:text-on-primary data-[button-type=toggle]:not([data-state=checked]):text-on-surface-variant data-[button-type=toggle]:not([data-state=checked]):active:bg-surface-container/10 data-[button-type=toggle]:not([data-state=checked]):hover:bg-surface-container/8 data-[button-type=toggle]:data-[state=checked]:active:before:bg-on-primary/10 data-[button-type=toggle]:not([data-state=checked]):active:before:bg-on-surface-variant/10 data-[button-type=toggle]:data-[state=checked]:hover:before:bg-on-primary/8 data-[button-type=toggle]:not([data-state=checked]):hover:before:bg-on-surface-variant/8",
        outlined:
          "border border-outline-variant bg-transparent text-on-surface-variant hover:bg-outline-variant/10 hover:before:bg-on-surface-variant/8 focus-visible:ring-secondary/20 active:bg-outline-variant/10 active:before:bg-on-surface-variant/10 disabled:border-on-surface/10 disabled:text-on-surface/38 data-[button-type=toggle]:data-[state=checked]:border-0 data-[button-type=toggle]:data-[state=checked]:bg-inverse-surface data-[button-type=toggle]:data-[state=checked]:text-inverse-on-surface data-[button-type=toggle]:data-[state=checked]:active:bg-inverse-surface/10 data-[button-type=toggle]:data-[state=checked]:hover:bg-inverse-surface/8 data-[button-type=toggle]:data-[state=checked]:active:before:bg-inverse-on-surface/10 data-[button-type=toggle]:data-[state=checked]:hover:before:bg-inverse-on-surface/8",
        text: "bg-transparent text-primary hover:bg-primary/10 hover:before:bg-on-primary/8 focus-visible:ring-secondary/20 active:bg-primary/10 active:before:bg-on-primary/10 disabled:text-on-surface/38",
        tonal:
          "m3-elevation-0 hover:m3-elevation-1 active:m3-elevation-0 data-[button-type=toggle]:data-[state=checked]:m3-elevation-1 data-[button-type=toggle]:data-[state=checked]:active:m3-elevation-0 data-[button-type=toggle]:data-[state=checked]:hover:m3-elevation-2 bg-secondary-container text-on-secondary-container hover:bg-secondary-container/8 hover:before:bg-on-secondary-container/8 focus-visible:ring-secondary/20 active:bg-secondary-container/10 active:before:bg-on-secondary-container/10 disabled:bg-on-surface/10 disabled:text-on-surface/38 data-[button-type=toggle]:data-[state=checked]:bg-secondary data-[button-type=toggle]:data-[state=checked]:text-on-secondary data-[button-type=toggle]:data-[state=checked]:active:before:bg-on-secondary/10 data-[button-type=toggle]:data-[state=checked]:hover:before:bg-on-secondary/8",
        elevated:
          "m3-elevation-1 hover:m3-elevation-2 active:m3-elevation-1 data-[button-type=toggle]:data-[state=checked]:m3-elevation-1 data-[button-type=toggle]:data-[state=checked]:active:m3-elevation-0 data-[button-type=toggle]:data-[state=checked]:hover:m3-elevation-2 bg-surface-container-low text-primary hover:before:bg-primary/8 focus-visible:ring-secondary/20 active:before:bg-primary/10 disabled:bg-on-surface/10 disabled:text-on-surface/38 data-[button-type=toggle]:data-[state=checked]:bg-primary data-[button-type=toggle]:data-[state=checked]:text-on-primary data-[button-type=toggle]:data-[state=checked]:active:before:bg-on-primary/10 data-[button-type=toggle]:data-[state=checked]:hover:before:bg-on-primary/8",
      },
      size: {
        xs: "h-[32px] px-[12px] text-[16px] leading-[24px] [&_svg:not([class*='size-'])]:size-[16px]",
        s: "h-[40px] px-[16px] text-[18px] leading-[26px] [&_svg:not([class*='size-'])]:size-[18px]",
        m: "h-[56px] px-[24px] text-[21px] leading-[32px] [&_svg:not([class*='size-'])]:size-[24px]",
        l: "h-[96px] px-[48px] text-[32px] leading-[42px] [&_svg:not([class*='size-'])]:size-[32px]",
        xl: "h-[136px] px-[64px] text-[42px] leading-[53px] [&_svg:not([class*='size-'])]:size-[40px]",
      },
      shape: {
        round: "rounded-full",
        square: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "s",
      shape: "round",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    "data-state"?: string;
    buttonType?: "default" | "toggle";
  };

function Button({
  className,
  variant,
  size,
  shape,
  buttonType = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(event);
      }
    },
    [props.onClick]
  );

  const isSelected =
    (buttonType ?? "default") === "toggle" && props["data-state"] === "checked";
  const radiusClass = getCornerRadius(
    size ?? "s",
    shape ?? "round",
    false,
    isSelected,
    buttonType ?? "default"
  );
  const buttonClass = cn(
    buttonVariants({ variant, size, shape }),
    radiusClass,
    className
  );

  if (asChild) {
    return <Slot className={buttonClass} data-slot="button" {...props} />;
  }

  return (
    <motion.button
      className={buttonClass}
      data-button-type={buttonType}
      data-slot="button"
      onClick={handleClick}
      transition={{
        duration: 0.35,
        ease: [0.2, 0.0, 0, 1.0],
      }}
      {...(props as HTMLMotionProps<"button">)}
    >
      {props.children}
    </motion.button>
  );
}

export { Button, buttonVariants, type ButtonProps };
