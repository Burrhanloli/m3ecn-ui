import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion, type Transition } from "framer-motion";
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
    xs: isPressed ? "rounded-[8px]" : "rounded-[12px]",
    s: isPressed ? "rounded-[8px]" : "rounded-[12px]",
    m: isPressed ? "rounded-[12px]" : "rounded-[16px]",
    l: isPressed ? "rounded-[16px]" : "rounded-[28px]",
    xl: isPressed ? "rounded-[16px]" : "rounded-[28px]",
  };
  return radii[size as keyof typeof radii] ?? "rounded-lg";
};

const getWidth = (size: string, width: string): string => {
  const widths: Record<string, Record<string, string>> = {
    xs: { default: "w-8", narrow: "w-7", wide: "w-10" },
    s: { default: "w-10", narrow: "w-8", wide: "w-13" },
    m: { default: "w-14", narrow: "w-12", wide: "w-18" },
    l: { default: "w-24", narrow: "w-16", wide: "w-32" },
    xl: { default: "w-34", narrow: "w-26", wide: "w-46" },
  };
  return widths[size]?.[width] ?? "w-10";
};

const iconButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap outline-none transition-[border-radius] transition-all duration-100 duration-100 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-8 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-96 active:before:opacity-10 disabled:pointer-events-none disabled:bg-on-surface disabled:text-on-surface disabled:opacity-100 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled:
          "shadow hover:shadow-lg hover:before:bg-on-primary/8 focus-visible:ring-secondary/20 active:shadow-none active:before:bg-on-primary/10 data-[button-type=toggle]:data-[state=checked]:bg-primary data-[button-type=toggle]:data-[state=checked]:text-on-primary data-[button-type=toggle]:data-[state=checked]:shadow-md data-[button-type=default]:bg-primary data-[button-type=toggle]:not([data-state=checked]):bg-surface-container data-[button-type=default]:text-on-primary data-[button-type=toggle]:not([data-state=checked]):text-on-surface-variant data-[button-type=toggle]:data-[state=checked]:active:shadow-none data-[button-type=toggle]:not([data-state=checked]):active:bg-surface-container/10 data-[button-type=toggle]:data-[state=checked]:hover:shadow-lg data-[button-type=toggle]:not([data-state=checked]):hover:bg-surface-container/8 data-[button-type=toggle]:data-[state=checked]:active:before:bg-on-primary/10 data-[button-type=toggle]:not([data-state=checked]):active:before:bg-on-surface-variant/10 data-[button-type=toggle]:data-[state=checked]:hover:before:bg-on-primary/8 data-[button-type=toggle]:not([data-state=checked]):hover:before:bg-on-surface-variant/8",
        outlined:
          "border border-outline-variant bg-transparent text-on-surface-variant hover:bg-outline-variant/10 hover:before:bg-on-surface-variant/8 focus-visible:ring-secondary/20 active:bg-outline-variant/10 active:before:bg-on-surface-variant/10 disabled:border-on-surface data-[button-type=toggle]:data-[state=checked]:border-0 data-[button-type=toggle]:data-[state=checked]:bg-inverse-surface data-[button-type=toggle]:data-[state=checked]:text-inverse-on-surface data-[button-type=toggle]:data-[state=checked]:active:bg-inverse-surface/10 data-[button-type=toggle]:data-[state=checked]:hover:bg-inverse-surface/8 data-[button-type=toggle]:data-[state=checked]:active:before:bg-inverse-on-surface/10 data-[button-type=toggle]:data-[state=checked]:hover:before:bg-inverse-on-surface/8",
        standard:
          "bg-transparent text-on-surface-variant hover:bg-on-surface-variant/10 hover:before:bg-on-surface-variant/8 focus-visible:ring-secondary/20 active:bg-on-surface-variant/10 active:before:bg-on-surface-variant/10 data-[button-type=toggle]:data-[state=checked]:text-primary",
        tonal:
          "bg-secondary-container text-on-secondary-container shadow-sm hover:bg-secondary-container/8 hover:shadow-md hover:before:bg-on-secondary-container/8 focus-visible:ring-secondary/20 active:bg-secondary-container/10 active:shadow-none active:before:bg-on-secondary-container/10 data-[button-type=toggle]:data-[state=checked]:bg-secondary data-[button-type=toggle]:data-[state=checked]:text-on-secondary data-[button-type=toggle]:data-[state=checked]:shadow-md data-[button-type=toggle]:data-[state=checked]:active:shadow-none data-[button-type=toggle]:data-[state=checked]:hover:shadow-lg data-[button-type=toggle]:data-[state=checked]:active:before:bg-on-secondary/10 data-[button-type=toggle]:data-[state=checked]:hover:before:bg-on-secondary/8",
      },
      size: {
        xs: "h-8 min-h-12 min-w-12 [&_svg:not([class*='size-'])]:size-5",
        s: "h-10 min-h-12 min-w-12 [&_svg:not([class*='size-'])]:size-6",
        m: "h-14 [&_svg:not([class*='size-'])]:size-6",
        l: "h-24 [&_svg:not([class*='size-'])]:size-8",
        xl: "h-34 [&_svg:not([class*='size-'])]:size-10",
      },
      shape: {
        round: "",
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

const rippleVariants = cva("pointer-events-none absolute size-5 rounded-full", {
  variants: {
    variant: {
      filled:
        "data-[button-type=toggle]:data-[state=checked]:bg-on-primary/30 data-[button-type=default]:bg-on-primary/30 data-[button-type=toggle]:not([data-state=checked]):bg-on-surface-variant/30",
      outlined:
        "bg-on-surface-variant/30 data-[button-type=toggle]:data-[state=checked]:bg-inverse-on-surface/30",
      standard:
        "bg-on-surface-variant/30 data-[button-type=toggle]:data-[state=checked]:bg-primary/30",
      tonal:
        "bg-on-secondary-container/30 data-[button-type=toggle]:data-[state=checked]:bg-on-secondary/30",
    },
  },
  defaultVariants: {
    variant: "filled",
  },
});

type Ripple = {
  id: number;
  x: number;
  y: number;
};

const RIPPLE_DURATION = 600;

type IconButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof iconButtonVariants> & {
    asChild?: boolean;
    "data-state"?: string;
    buttonType?: "default" | "toggle";
    enableRipple?: boolean;
    rippleScale?: number;
    rippleTransition?: Transition;
    width?: "narrow" | "default" | "wide";
    icon: React.ReactNode;
  };

function IconButton({
  className,
  variant,
  size,
  shape,
  width,
  buttonType = "default",
  asChild = false,
  enableRipple = true,
  rippleScale = 10,
  rippleTransition = { duration: 0.6, ease: "easeOut" },
  icon,
  ...props
}: IconButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) {
        return;
      }

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, RIPPLE_DURATION);
    },
    []
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (enableRipple && !asChild) {
        createRipple(event);
      }
      if (props.onClick) {
        props.onClick(event);
      }
    },
    [createRipple, enableRipple, asChild, props.onClick]
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
  const widthClass = getWidth(size ?? "s", width ?? "default");
  const buttonClass = cn(
    iconButtonVariants({ variant, size, shape }),
    widthClass,
    radiusClass,
    className
  );

  if (asChild) {
    return <Slot className={buttonClass} data-slot="icon-button" {...props} />;
  }

  if (enableRipple) {
    return (
      <motion.button
        className={buttonClass}
        data-button-type={buttonType}
        data-slot="icon-button"
        onClick={handleClick}
        ref={buttonRef}
        transition={{
          duration: 0.35,
          ease: [0.2, 0.0, 0, 1.0],
        }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {icon}
        {ripples.map((ripple) => (
          <motion.span
            animate={{ scale: rippleScale, opacity: 0 }}
            className={cn(rippleVariants({ variant }))}
            initial={{ scale: 0, opacity: 0.5 }}
            key={ripple.id}
            style={{
              top: ripple.y - 10,
              left: ripple.x - 10,
            }}
            transition={rippleTransition}
          />
        ))}
      </motion.button>
    );
  }

  return (
    <motion.button
      className={buttonClass}
      data-button-type={buttonType}
      data-slot="icon-button"
      onClick={handleClick}
      ref={buttonRef}
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

export { IconButton, iconButtonVariants, type IconButtonProps };
