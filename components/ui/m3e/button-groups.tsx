import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/m3e/button";
import { IconButton } from "@/components/ui/m3e/icon-button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const getCornerRadius = (
  size: string,
  position: "first" | "last"
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

  const radius = radii[size as keyof typeof radii] ?? "12px";
  const roundRadius = roundRadii[size as keyof typeof roundRadii] ?? "24px";

  if (position === "first") {
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
  const [animating, setAnimating] = React.useState<
    Record<number, "grow" | "shrink">
  >({});

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
      const position =
        childrenArray.length === 1
          ? "first"
          : index === 0
            ? "first"
            : index === childrenArray.length - 1
              ? "last"
              : "middle";
      if (type === "connected" && shape === "round" && position !== "middle") {
        connectedStyle = getCornerRadius(size ?? "s", position);
      }

      // Determine selection state
      const isSelected =
        selection === "single"
          ? value === childValue
          : Array.isArray(value) && value.includes(childValue);

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        let newValue: string | string[] | null = value ?? null;
        if (selection === "single") {
          newValue = isSelected ? null : childValue;
        } else {
          const current = Array.isArray(value) ? value : [];
          newValue = isSelected
            ? current.filter((v: string) => v !== childValue)
            : [...current, childValue];
        }
        if (onChange) {
          onChange(newValue);
        }
        if (childProps.onClick) {
          childProps.onClick(event);
        }
      };

      const handleMouseDown = (_: React.MouseEvent<HTMLButtonElement>) => {
        if (type === "standard") {
          const anim: Record<number, "grow" | "shrink"> = {};
          anim[index] = "grow";
          if (index > 0) {
            anim[index - 1] = "shrink";
          }
          if (index < childrenArray.length - 1) {
            anim[index + 1] = "shrink";
          }
          setAnimating(anim);
        }
      };

      const handleMouseUp = () => {
        if (type === "standard") {
          setAnimating({});
        }
      };

      let finalStyle: React.CSSProperties = childProps.style || {};
      if (type === "connected" && !isSelected) {
        finalStyle = { ...finalStyle, ...connectedStyle };
      }
      if (type === "standard" || type === "connected") {
        finalStyle = {
          ...finalStyle,
          flexGrow: isSelected
            ? 1.15
            : type === "standard" && animating[index] === "grow"
              ? 1.15
              : type === "standard" && animating[index] === "shrink"
                ? 0.9
                : 1,
          flexShrink: 1,
          flexBasis: "auto",
        };
        if (type === "standard") {
          finalStyle = {
            ...finalStyle,
            transition: "flex-grow 0.1s ease-in-out",
          };
        }
      }

      return React.cloneElement(child, {
        size: size ?? "s",
        shape: type === "connected" ? "square" : (shape ?? "square"),
        style: finalStyle,
        className: cn(childProps.className, "self-center"),
        "data-state": isSelected ? "checked" : undefined,
        onClick: handleClick,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
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
        "relative m-0! self-stretch bg-input data-[orientation=vertical]:h-auto",
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
