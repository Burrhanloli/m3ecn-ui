import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/m3e/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const buttonGroupVariants = cva("flex items-stretch", {
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
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    type: "standard",
    size: "m",
    shape: "round",
    selection: "single",
    orientation: "horizontal",
  },
});

type ButtonGroupContextValue = {
  selection: "single" | "multi";
  size: string;
  shape: string;
  value: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
};

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null
);

type ButtonGroupProps = Omit<React.ComponentProps<"div">, "onChange"> &
  VariantProps<typeof buttonGroupVariants> & {
    children: React.ReactNode;
    value?: string | string[] | null;
    onChange?: (value: string | string[] | null) => void;
  };

function ButtonGroup({
  className,
  type,
  size,
  shape,
  selection,
  orientation,
  children,
  value,
  onChange,
  ...props
}: ButtonGroupProps) {
  const gapClass =
    type === "connected"
      ? "gap-[2px]"
      : // 2dp
        size === "xs"
        ? "gap-[16px]"
        : // 18dp
          size === "s"
          ? "gap-[12px]"
          : // 12dp
            "gap-[8px]"; // 8dp for m/l/xl

  const contextValue: ButtonGroupContextValue = {
    selection: selection || "single",
    size: size || "m",
    shape: shape || "round",
    value: value || null,
    onChange: onChange || (() => {}),
  };

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === Button) {
      return React.cloneElement(child, {
        size: size || "m",
        shape: shape || "round",
        ...(child.props as any),
      });
    }
    return child;
  });

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        className={cn(
          buttonGroupVariants({ type, size, shape, selection, orientation }),
          gapClass,
          className
        )}
        data-slot="button-group"
        role={selection === "single" ? "radiogroup" : "group"}
        {...(orientation && { "aria-orientation": orientation })}
        {...props}
      >
        {clonedChildren}
      </div>
    </ButtonGroupContext.Provider>
  );
}

function ButtonGroupButton({
  value,
  children,
  ...props
}: {
  value: string;
  children: React.ReactElement<typeof Button>;
} & React.ComponentProps<typeof Button>) {
  const context = React.useContext(ButtonGroupContext);
  if (!context) {
    return children;
  }

  const isSelected =
    context.selection === "single"
      ? context.value === value
      : Array.isArray(context.value) && context.value.includes(value);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (context.selection === "single") {
      context.onChange(isSelected ? null : value);
    } else {
      const current = Array.isArray(context.value) ? context.value : [];
      const newValue = isSelected
        ? current.filter((v) => v !== value)
        : [...current, value];
      context.onChange(newValue);
    }
    if ((children.props as any).onClick) {
      (children.props as any).onClick(event);
    }
  };

  return React.cloneElement(children, {
    "data-state": isSelected ? "checked" : undefined,
    onClick: handleClick,
    ...props,
    buttonType: "toggle",
    variant: "tonal",
  } as any);
}

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
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
  ButtonGroupButton,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
  type ButtonGroupProps,
};
