import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
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
    xs: "20px",
    s: "20px",
    m: "28px",
    l: "52px",
    xl: "68px",
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
      xs: "pr-[10px] pl-[12px] [&_svg:not([class*='size-'])]:size-[20px]",
      s: "pr-[12px] pl-[16px] [&_svg:not([class*='size-'])]:size-[20px]",
      m: "pr-[24px] pl-[24px] [&_svg:not([class*='size-'])]:size-[24px]",
      l: "pr-[48px] pl-[48px] [&_svg:not([class*='size-'])]:size-[32px]",
      xl: "pr-[64px] pl-[64px] [&_svg:not([class*='size-'])]:size-[40px]",
    },
  },
  defaultVariants: {
    size: "s",
  },
});

const splitButtonLeadingVariants = cva("", {
  variants: {
    size: {
      xs: "gap-[4px]",
      s: "gap-[8px]",
      m: "gap-[8px]",
      l: "gap-[12px]",
      xl: "gap-[16px]",
    },
  },
  defaultVariants: {
    size: "s",
  },
});

const splitButtonTrailingVariants = cva("", {
  variants: {
    size: {
      xs: "pr-[14px] pl-[10px] data-[state=checked]:px-[13px] [&_svg:not([class*='size-'])]:size-[22px]",
      s: "pr-[14px] pl-[10px] data-[state=checked]:px-[13px] [&_svg:not([class*='size-'])]:size-[22px]",
      m: "pr-[17px] pl-[13px] data-[state=checked]:px-[15px] [&_svg:not([class*='size-'])]:size-[26px]",
      l: "pr-[32px] pl-[26px] data-[state=checked]:px-[29px] [&_svg:not([class*='size-'])]:size-[38px]",
      xl: "pr-[49px] pl-[37px] data-[state=checked]:px-[43px] [&_svg:not([class*='size-'])]:size-[50px]",
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
      children,
      ...props
    },
    ref
  ) => {
    const effectiveSize = size || "s";
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
      <Menu onOpenChange={setMenuOpen} open={menuOpen}>
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
                  style: finalStyle,
                  className: cn(childProps.className),
                } as Partial<ButtonProps>);
              }
              if (child.type === SplitButtonTrailing) {
                const childProps = child.props as ButtonProps;
                const finalStyle = menuOpen
                  ? {
                      ...(childProps.style || {}),
                      borderRadius: "9999px",
                    }
                  : {
                      ...(childProps.style || {}),
                      ...getSplitCornerRadius(effectiveSize, "trailing"),
                    };
                return React.cloneElement(child, {
                  variant,
                  size: effectiveSize,
                  shape: "round",
                  disabled,
                  onClick: (e) => {
                    if (menuOpen) {
                      setMenuOpen(!menuOpen);
                    }
                    onTrailingClick?.(e);
                  },
                  style: finalStyle,
                  className: cn(childProps.className),
                  open: menuOpen,
                } as Partial<ButtonProps & { open?: boolean }>);
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
  <Button
    ref={ref}
    {...props}
    className={cn(
      splitButtonLeadingVariants({ size: props.size }),
      props.className
    )}
  >
    {children}
  </Button>
));
SplitButtonLeading.displayName = "SplitButtonLeading";

const SplitButtonTrailing = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { children?: React.ReactNode; open?: boolean }
>(({ children, open = false, ...props }, ref) => (
  <MenuTrigger asChild>
    <Button
      ref={ref}
      {...props}
      className={cn(
        splitButtonTrailingVariants({ size: props.size }),
        props.className
      )}
      data-state={open ? "checked" : "unchecked"}
    >
      {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
