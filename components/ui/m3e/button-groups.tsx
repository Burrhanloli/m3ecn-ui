import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/m3e/button";
import { IconButton } from "@/components/ui/m3e/icon-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const buttonGroupVariants = cva("flex flex-row items-stretch", {
  variants: {
    type: {
      standard: "",
      connected: "",
    },
    size: {
      xs: "",
      s: "",
      m: "",
      l: "",
      xl: "",
    },
    shape: {
      round: "",
      square: "",
    },
    selection: {
      single: "",
      multi: "",
    },
  },
  defaultVariants: {
    type: "standard",
    size: "s",
    shape: "square",
  },
});

type ButtonGroupProps = Omit<React.ComponentProps<"div">, "onChange"> &
  VariantProps<typeof buttonGroupVariants> & {
    children: React.ReactNode;
    value?: string | string[] | null;
    onChange?: (value: string | string[] | null) => void;
  };

function ButtonGroup({
  className,
  type = "standard",
  size = "s",
  shape = "square",
  selection,
  children,
  value,
  onChange,
  ...props
}: ButtonGroupProps) {
  const getConnectedRadii = (
    position: "first" | "middle" | "last"
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
    const radius = radii[size as keyof typeof radii] ?? "12px";
    const roundRadius = roundRadii[size as keyof typeof roundRadii] ?? "24px";

    let style: React.CSSProperties = {};

    if (position === "first") {
      style = {
        borderTopLeftRadius: roundRadius,
        borderBottomLeftRadius: roundRadius,
        borderTopRightRadius: radius,
        borderBottomRightRadius: radius,
      };
    } else if (position === "last") {
      style = {
        borderTopLeftRadius: radius,
        borderBottomLeftRadius: radius,
        borderTopRightRadius: roundRadius,
        borderBottomRightRadius: roundRadius,
      };
    }

    return style;
  };

  const gapClass = (() => {
    if (type === "connected") {
      return "gap-[2px]";
    }
    if (size === "xs") {
      return "gap-[18px]";
    }
    if (size === "s") {
      return "gap-[12px]";
    }
    return "gap-[8px]";
  })();

  const childrenArray = React.Children.toArray(children);

  const clonedChildren = childrenArray.map((child, index) => {
    if (
      React.isValidElement(child) &&
      (child.type === Button || child.type === IconButton)
    ) {
      const childProps = child.props as
        | React.ComponentProps<typeof Button>
        | React.ComponentProps<typeof IconButton>;
      const childValue = childProps.value as string;

      // Determine position for connected type
      let connectedStyle: React.CSSProperties = {};
      if (type === "connected") {
        const position =
          childrenArray.length === 1
            ? "first"
            : index === 0
              ? "first"
              : index === childrenArray.length - 1
                ? "last"
                : "middle";
        connectedStyle = getConnectedRadii(position);
      }

      // Determine selection state
      const isSelected =
        selection === "single"
          ? value === childValue
          : Array.isArray(value) && value.includes(childValue);

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onChange) {
          if (selection === "single") {
            onChange(isSelected ? null : childValue);
          } else {
            const current = Array.isArray(value) ? value : [];
            const newValue = isSelected
              ? current.filter((v: string) => v !== childValue)
              : [...current, childValue];
            onChange(newValue);
          }
        }
        if (childProps.onClick) {
          childProps.onClick(event);
        }
      };

      const finalStyle =
        type === "connected" && !isSelected && shape !== "round"
          ? { ...(childProps.style || {}), ...connectedStyle }
          : childProps.style || {};

      return React.cloneElement(child, {
        size: size ?? "s",
        shape: shape ?? "square",
        style: finalStyle,
        className: cn(childProps.className, "self-center"),
        "data-state": isSelected ? "checked" : undefined,
        onClick: handleClick,
        buttonType: "toggle",
        variant: childProps.variant ?? "tonal",
        ...childProps,
      });
    }
    return child;
  });

  return (
    <div
      className={cn(
        buttonGroupVariants({ type, size, shape, selection }),
        gapClass,
        className
      )}
      data-slot="button-group"
      data-type={type}
      role={selection === "single" ? "radiogroup" : "group"}
      {...props}
    >
      {clonedChildren}
    </div>
  );
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(
        "flex items-center gap-2 rounded-md border bg-muted px-4 font-medium text-sm shadow-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn(
        "!m-0 relative self-stretch bg-input data-[orientation=vertical]:h-auto",
        className
      )}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
  type ButtonGroupProps,
};
