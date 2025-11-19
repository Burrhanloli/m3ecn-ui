"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { AnimatePresence, type HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

// Context for managing FAB Menu state
type FabMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  variant: "primary" | "secondary" | "tertiary";
  size: "standard" | "medium" | "large";
};

const FabMenuContext = React.createContext<FabMenuContextValue | undefined>(
  undefined
);

const useFabMenuContext = () => {
  const context = React.useContext(FabMenuContext);
  if (!context) {
    throw new Error("FabMenu components must be used within FabMenu");
  }
  return context;
};

// FAB Menu Root Component
type FabMenuProps = {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "standard" | "medium" | "large";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

function FabMenu({
  variant = "primary",
  size = "standard",
  open: controlledOpen,
  onOpenChange,
  children,
  className,
}: FabMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const setOpen = onOpenChange || setUncontrolledOpen;

  return (
    <FabMenuContext.Provider value={{ open, setOpen, variant, size }}>
      <div className={cn("relative inline-block", className)}>{children}</div>
    </FabMenuContext.Provider>
  );
}

// FAB Menu Trigger (the main FAB button)
const fabMenuTriggerVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap font-medium outline-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-8 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-96 active:before:opacity-12 disabled:pointer-events-none disabled:bg-on-surface/12 disabled:text-on-surface/38 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
  }
);

interface FabMenuTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  icon: React.ReactNode;
  iconWhenOpen?: React.ReactNode;
}

function FabMenuTrigger({
  className,
  asChild = false,
  icon,
  iconWhenOpen,
  ...props
}: FabMenuTriggerProps) {
  const { open, setOpen, variant, size } = useFabMenuContext();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpen(!open);
      if (props.onClick) {
        props.onClick(event);
      }
    },
    [open, setOpen, props.onClick]
  );

  const displayIcon = open && iconWhenOpen ? iconWhenOpen : icon;
  const triggerClass = cn(fabMenuTriggerVariants({ variant, size }), className);

  if (asChild) {
    return (
      <Slot className={triggerClass} data-slot="fab-menu-trigger" {...props} />
    );
  }

  return (
    <motion.button
      animate={{
        borderRadius: open ? "50%" : "16px",
      }}
      aria-expanded={open}
      aria-haspopup="menu"
      className={triggerClass}
      data-slot="fab-menu-trigger"
      onClick={handleClick}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      {...(props as HTMLMotionProps<"button">)}
    >
      <motion.div
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
        initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
        key={open ? "open" : "closed"}
        transition={{ duration: 0.2 }}
      >
        {displayIcon}
      </motion.div>
    </motion.button>
  );
}

// FAB Menu Content (container for menu items)
type FabMenuContentProps = {
  children: React.ReactNode;
  className?: string;
};

function FabMenuContent({ children, className }: FabMenuContentProps) {
  const { open, setOpen } = useFabMenuContext();

  const handleScrimClick = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // Close menu on Escape key
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  return (
    <>
      {/* Scrim overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 cursor-pointer bg-scrim/32"
            data-slot="fab-menu-scrim"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={handleScrimClick}
            transition={{ duration: 0.15 }}
          />
        )}
      </AnimatePresence>

      {/* Menu items - positioned absolutely above FAB */}
      <AnimatePresence>
        {open && (
          <motion.div
            animate={{ opacity: 1 }}
            className={cn(
              "absolute right-0 bottom-full z-50 mb-4 flex flex-col items-end gap-2",
              className
            )}
            data-slot="fab-menu-content"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            role="menu"
            transition={{ duration: 0.15 }}
          >
            {React.Children.map(children, (child, index) => {
              const totalChildren = React.Children.count(children);
              const reverseIndex = totalChildren - 1 - index;
              return (
                <motion.div
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  key={index}
                  transition={{
                    duration: 0.2,
                    delay: reverseIndex * 0.05, // Staggered animation
                    ease: [0.2, 0.0, 0, 1.0],
                  }}
                >
                  {child}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// FAB Menu Item - Uses variant colors to match FAB trigger
const fabMenuItemVariants = cva(
  "relative inline-flex h-[56px] shrink-0 items-center gap-3 overflow-hidden whitespace-nowrap rounded-[16px] pr-5 pl-4 font-medium text-[14px] leading-[20px] tracking-[0.1px] outline-none transition-all duration-100 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-8 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary focus-visible:ring-offset-2 active:scale-96 active:before:opacity-12 disabled:pointer-events-none disabled:bg-on-surface/12 disabled:text-on-surface/38 disabled:shadow-none [&_svg:not([class*='size-'])]:size-[24px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
    },
  }
);

interface FabMenuItemProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
  icon: React.ReactNode;
  label: string;
}

function FabMenuItem({
  className,
  asChild = false,
  icon,
  label,
  ...props
}: FabMenuItemProps) {
  const { setOpen, variant } = useFabMenuContext();

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (props.onClick) {
        props.onClick(event);
      }
      // Close menu after item is clicked
      setOpen(false);
    },
    [props.onClick, setOpen]
  );

  const itemClass = cn(fabMenuItemVariants({ variant }), className);

  if (asChild) {
    return <Slot className={itemClass} data-slot="fab-menu-item" {...props} />;
  }

  return (
    <motion.button
      className={itemClass}
      data-slot="fab-menu-item"
      onClick={handleClick}
      role="menuitem"
      transition={{
        duration: 0.35,
        ease: [0.2, 0.0, 0, 1.0],
      }}
      {...(props as HTMLMotionProps<"button">)}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

export {
  FabMenu,
  FabMenuTrigger,
  FabMenuContent,
  FabMenuItem,
  type FabMenuProps,
  type FabMenuTriggerProps,
  type FabMenuContentProps,
  type FabMenuItemProps,
};
