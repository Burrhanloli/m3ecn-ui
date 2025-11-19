import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

const cardVariants = cva(
  "relative flex flex-col overflow-hidden rounded-[12px] text-on-surface transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        elevated: "m3-elevation-1 bg-surface-container-low",
        filled: "border-transparent bg-surface-container-highest",
        outlined: "border border-outline-variant bg-surface",
      },
    },
    defaultVariants: {
      variant: "elevated",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, asChild = false, ...props }, ref) => (
    <div
      className={cn(cardVariants({ variant }), className)}
      ref={ref}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    ref={ref}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    className={cn("font-semibold text-xl tracking-tight", className)}
    ref={ref}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn("text-on-surface-variant text-sm", className)}
    ref={ref}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div className={cn("p-6 pt-0", className)} ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { withDivider?: boolean }
>(({ className, withDivider, ...props }, ref) => (
  <div
    className={cn(
      "flex items-center p-6 pt-0",
      withDivider && "border-outline-variant border-t pt-6",
      className
    )}
    ref={ref}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

const CardSubTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    className={cn("font-medium text-base text-on-surface-variant", className)}
    ref={ref}
    {...props}
  />
));
CardSubTitle.displayName = "CardSubTitle";

interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: number;
  rounded?: boolean;
}

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  (
    { className, style, aspectRatio = 16 / 9, rounded = false, ...props },
    ref
  ) => (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        rounded && "rounded-[12px]",
        className
      )}
      ref={ref}
      style={{
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        ...style,
      }}
      {...props}
    >
      <div className="absolute inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover">
        {props.children}
      </div>
    </div>
  )
);
CardMedia.displayName = "CardMedia";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardSubTitle,
  CardMedia,
};
