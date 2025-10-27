import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLMotionProps, motion, type Transition } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";

const getCornerRadius = (
  size: string,
  shape: string,
  isPressed?: boolean,
  isSelected?: boolean
) => {
  let effectiveShape = shape;
  if (isSelected && shape === "round") {
    effectiveShape = "square";
  } else if (isSelected && shape === "square") {
    effectiveShape = "round";
  }
  if (effectiveShape === "round") {
    return "rounded-full";
  }
  const radii = {
    xs: isPressed ? "rounded-[8px]" : "rounded-[12px]",
    s: isPressed ? "rounded-[8px]" : "rounded-[12px]",
    m: isPressed ? "rounded-[12px]" : "rounded-[16px]",
    l: isPressed ? "rounded-[16px]" : "rounded-[20px]",
    xl: isPressed ? "rounded-[16px]" : "rounded-[20px]",
  };
  return radii[size as keyof typeof radii] || "rounded-lg";
};

const buttonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap font-medium text-sm outline-none transition-[border-radius] transition-all duration-100 duration-100 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-8 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-96 active:before:opacity-10 disabled:pointer-events-none disabled:opacity-10 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        filled:
          "bg-primary text-primary-foreground shadow hover:shadow-lg hover:before:bg-primary/8 focus-visible:ring-primary/20 active:shadow-none active:before:bg-primary/10",
        outlined:
          "border border-primary bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary/20 active:bg-primary/10",
        text: "bg-transparent text-primary hover:bg-primary/10 focus-visible:ring-primary/20 active:bg-primary/10",
        tonal:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/8 hover:shadow-md focus-visible:ring-secondary/20 active:bg-secondary/10 active:shadow-none",
        elevated:
          "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:before:bg-primary/8 focus-visible:ring-primary/20 active:shadow-none active:before:bg-primary/10",
        toggle:
          "bg-surface text-on-surface shadow hover:shadow-lg hover:before:bg-primary/8 focus-visible:ring-primary/20 active:shadow-none active:before:bg-primary/10 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-md data-[state=checked]:active:shadow-none data-[state=checked]:hover:shadow-lg data-[state=checked]:active:before:bg-primary/10 data-[state=checked]:hover:before:bg-primary/8",
      },
      size: {
        xs: "h-8 px-3 has-[>svg]:px-2",
        s: "h-9 px-4 has-[>svg]:px-3",
        m: "h-10 px-4 has-[>svg]:px-3",
        l: "h-12 px-6 has-[>svg]:px-4",
        xl: "h-14 px-8 has-[>svg]:px-6",
        icon: "size-10",
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

const rippleVariants = cva("pointer-events-none absolute size-5 rounded-full", {
  variants: {
    variant: {
      filled: "bg-primary-foreground/30",
      outlined: "bg-primary/30",
      text: "bg-primary/30",
      tonal: "bg-secondary-foreground/30",
      elevated: "bg-primary-foreground/30",
      toggle: "bg-on-surface/30 data-[state=checked]:bg-primary-foreground/30",
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

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    "data-state"?: string;
    enableRipple?: boolean;
    rippleScale?: number;
    rippleTransition?: Transition;
  };

function Button({
  className,
  variant,
  size,
  shape,
  asChild = false,
  enableRipple = true,
  rippleScale = 10,
  rippleTransition = { duration: 0.6, ease: "easeOut" },
  ...props
}: ButtonProps) {
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

  const isSelected = variant === "toggle" && props["data-state"] === "checked";
  const radiusClass = getCornerRadius(
    size || "s",
    shape || "round",
    false,
    isSelected
  );

  const buttonClass = cn(
    buttonVariants({ variant, size, shape, className }),
    radiusClass
  );

  if (asChild) {
    return <Slot className={buttonClass} data-slot="button" {...props} />;
  }

  if (enableRipple) {
    return (
      <motion.button
        className={buttonClass}
        data-slot="button"
        onClick={handleClick}
        ref={buttonRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...(props as HTMLMotionProps<"button">)}
      >
        {props.children}
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
    <button
      className={buttonClass}
      data-slot="button"
      onClick={handleClick}
      ref={buttonRef}
      {...props}
    >
      {props.children}
    </button>
  );
}

export { Button, buttonVariants, type ButtonProps };
