import { cva, type VariantProps } from "class-variance-authority";
import type { Transition } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";
import { Button, type ButtonProps } from "./button";
import { Menu, MenuContent, MenuTrigger } from "./menu";

const getSplitCornerRadius = (
  size: string,
  position: "leading" | "trailing" = "leading"
): React.CSSProperties => {
  const radii = {
    xs: "8px",
    s: "8px",
    m: "12px",
    l: "12px",
    xl: "12px",
  };

  const roundRadii = {
    xs: "16px",
    s: "16px",
    m: "24px",
    l: "24px",
    xl: "24px",
  };

  const radius = radii[size as keyof typeof radii] ?? "4px";
  const roundRadius = roundRadii[size as keyof typeof roundRadii] ?? "24px";

  if (position === "leading") {
    return {
      borderTopLeftRadius: roundRadius,
      borderBottomLeftRadius: roundRadius,
      borderTopRightRadius: radius,
      borderBottomRightRadius: radius,
    };
  }
  return {
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
    borderTopRightRadius: roundRadius,
    borderBottomRightRadius: roundRadius,
  };
};

const splitButtonVariants = cva("inline-flex shrink-0 items-center gap-[2px]", {
  variants: {
    size: {
      xs: "h-8",
      s: "h-9",
      m: "h-10",
      l: "h-12",
      xl: "h-14",
    },
  },
  defaultVariants: {
    size: "s",
  },
});

type SplitButtonProps = React.ComponentProps<"div"> &
  VariantProps<typeof splitButtonVariants> & {
    variant?: "elevated" | "filled" | "tonal" | "outlined";
    disabled?: boolean;
    onLeadingClick?: React.MouseEventHandler<HTMLButtonElement>;
    onTrailingClick?: React.MouseEventHandler<HTMLButtonElement>;
    enableRipple?: boolean;
    rippleScale?: number;
    rippleTransition?: Transition;
  };

const SplitButton = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      className,
      variant = "filled",
      size = "s",
      disabled = false,
      onLeadingClick,
      onTrailingClick,
      enableRipple = true,
      rippleScale = 10,
      rippleTransition = { duration: 0.6, ease: "easeOut" },
      children,
      ...props
    },
    ref
  ) => {
    const effectiveSize = size || "s";

    return (
      <Menu>
        <div
          className={cn(
            splitButtonVariants({ size: effectiveSize }),
            className
          )}
          ref={ref}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              if (child.type === SplitButtonLeading) {
                const childProps = child.props as ButtonProps;
                const finalStyle = {
                  ...(childProps.style || {}),
                  ...getSplitCornerRadius(effectiveSize, "leading"),
                };
                return React.cloneElement(child, {
                  variant,
                  size: effectiveSize,
                  shape: "round",
                  disabled,
                  onClick: onLeadingClick,
                  enableRipple,
                  rippleScale,
                  rippleTransition,
                  style: finalStyle,
                  className: cn(childProps.className),
                } as Partial<ButtonProps>);
              }
              if (child.type === SplitButtonTrailing) {
                const childProps = child.props as ButtonProps;
                const finalStyle = {
                  ...(childProps.style || {}),
                  ...getSplitCornerRadius(effectiveSize, "trailing"),
                };
                return React.cloneElement(child, {
                  variant,
                  size: effectiveSize,
                  shape: "round",
                  disabled,
                  onClick: onTrailingClick,
                  enableRipple,
                  rippleScale,
                  rippleTransition,
                  style: finalStyle,
                  className: cn(childProps.className),
                } as Partial<ButtonProps>);
              }
              if (child.type === SplitButtonMenu) {
                return child;
              }
            }
            return child;
          })}
        </div>
      </Menu>
    );
  }
);
SplitButton.displayName = "SplitButton";

const SplitButtonLeading = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children?: React.ReactNode }
>(({ children, ...props }, ref) => (
  <Button ref={ref} {...props}>
    {children}
  </Button>
));
SplitButtonLeading.displayName = "SplitButtonLeading";

const SplitButtonTrailing = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children?: React.ReactNode }
>(({ children, ...props }, ref) => (
  <MenuTrigger asChild>
    <Button ref={ref} {...props}>
      <ChevronDownIcon />
      {children}
    </Button>
  </MenuTrigger>
));
SplitButtonTrailing.displayName = "SplitButtonTrailing";

const SplitButtonMenu = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof MenuContent> & { children?: React.ReactNode }
>(({ children, ...props }, ref) => (
  <MenuContent ref={ref} {...props}>
    {children}
  </MenuContent>
));
SplitButtonMenu.displayName = "SplitButtonMenu";

export {
  SplitButton,
  SplitButtonLeading,
  SplitButtonTrailing,
  SplitButtonMenu,
  type SplitButtonProps,
};
