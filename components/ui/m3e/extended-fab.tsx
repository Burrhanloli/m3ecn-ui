import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const extendedFabVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap font-medium outline-none transition-all duration-100 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-8 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-96 active:before:opacity-12 disabled:pointer-events-none disabled:bg-on-surface/12 disabled:text-on-surface/38 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        small:
          "h-[56px] rounded-[16px] [&_svg:not([class*='size-'])]:size-[24px]",
        medium:
          "h-[80px] rounded-[16px] [&_svg:not([class*='size-'])]:size-[32px]",
        large:
          "h-[96px] rounded-[28px] [&_svg:not([class*='size-'])]:size-[36px]",
      },
      iconPosition: {
        leading: "",
        trailing: "flex-row-reverse",
      },
    },
    compoundVariants: [
      // Small size spacing - icon leading
      {
        size: "small",
        iconPosition: "leading",
        className: "pl-[16px] pr-[20px] gap-[12px]",
      },
      // Small size spacing - icon trailing
      {
        size: "small",
        iconPosition: "trailing",
        className: "pl-[20px] pr-[16px] gap-[12px]",
      },
      // Medium size spacing - icon leading
      {
        size: "medium",
        iconPosition: "leading",
        className: "pl-[16px] pr-[20px] gap-[12px]",
      },
      // Medium size spacing - icon trailing
      {
        size: "medium",
        iconPosition: "trailing",
        className: "pl-[20px] pr-[16px] gap-[12px]",
      },
      // Large size spacing - icon leading
      {
        size: "large",
        iconPosition: "leading",
        className: "pl-[28px] pr-[32px] gap-[12px]",
      },
      // Large size spacing - icon trailing
      {
        size: "large",
        iconPosition: "trailing",
        className: "pl-[32px] pr-[28px] gap-[12px]",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "small",
      iconPosition: "leading",
    },
  }
);

const getLabelClass = (size: string): string => {
  const labelClasses: Record<string, string> = {
    // Small: Label Large - 14px / 20px line-height, weight 500, letter-spacing 0.1px
    small: "text-[14px] leading-[20px] font-medium tracking-[0.1px]",
    // Medium: Headline Small - 24px / 32px line-height, weight 400
    medium: "text-[24px] leading-[32px] font-normal",
    // Large: Headline Medium - 28px / 36px line-height, weight 400
    large: "text-[28px] leading-[36px] font-normal",
  };
  return labelClasses[size] ?? labelClasses.small;
};

type ExtendedFabProps = React.ComponentProps<"button"> &
  VariantProps<typeof extendedFabVariants> & {
    asChild?: boolean;
    icon: React.ReactNode;
  };

function ExtendedFab({
  className,
  variant,
  size,
  iconPosition,
  asChild = false,
  icon,
  children,
  ...props
}: ExtendedFabProps) {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(event);
      }
    },
    [props.onClick]
  );

  const labelClass = getLabelClass(size ?? "small");
  const fabClass = cn(
    extendedFabVariants({ variant, size, iconPosition }),
    className
  );

  if (asChild) {
    return <Slot className={fabClass} data-slot="extended-fab" {...props} />;
  }

  return (
    <motion.button
      className={fabClass}
      data-slot="extended-fab"
      onClick={handleClick}
      transition={{
        duration: 0.35,
        ease: [0.2, 0.0, 0, 1.0],
      }}
      {...(props as HTMLMotionProps<"button">)}
    >
      {icon}
      {children && <span className={labelClass}>{children}</span>}
    </motion.button>
  );
}

export { ExtendedFab, extendedFabVariants, type ExtendedFabProps };
