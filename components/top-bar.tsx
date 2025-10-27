import * as React from "react";
import { cn } from "@/lib/utils";

type TopbarProps = {
  children: React.ReactNode;
  className?: string;
};

type TopbarSectionProps = {
  children: React.ReactNode;
  className?: string;
};

const Topbar = React.forwardRef<HTMLDivElement, TopbarProps>(
  ({ children, className }, ref) => (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-border border-b bg-background px-6 py-3",
        className
      )}
      ref={ref}
    >
      {children}
    </div>
  )
);
Topbar.displayName = "Topbar";

const TopbarLeft = React.forwardRef<HTMLDivElement, TopbarSectionProps>(
  ({ children, className }, ref) => (
    <div className={cn("flex items-center gap-3", className)} ref={ref}>
      {children}
    </div>
  )
);
TopbarLeft.displayName = "TopbarLeft";

const TopbarCenter = React.forwardRef<HTMLDivElement, TopbarSectionProps>(
  ({ children, className }, ref) => (
    <div className={cn("flex items-center gap-3", className)} ref={ref}>
      {children}
    </div>
  )
);
TopbarCenter.displayName = "TopbarCenter";

const TopbarRight = React.forwardRef<HTMLDivElement, TopbarSectionProps>(
  ({ children, className }, ref) => (
    <div className={cn("flex items-center gap-3", className)} ref={ref}>
      {children}
    </div>
  )
);
TopbarRight.displayName = "TopbarRight";

export { Topbar, TopbarLeft, TopbarCenter, TopbarRight };
