"use client";

import { cva } from "class-variance-authority";
import {
  type ComponentProps,
  createContext,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

/* Constants */
const PERCENTAGE_MULTIPLIER = 100;
const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;
const STOP_INDICATOR_THRESHOLD = 0;
const STOP_INDICATOR_MAX = 100;
const STOP_SIZE_THICK = 8;
const STOP_SIZE_DEFAULT = 4;

/* Progress Context */
type ProgressContextValue = {
  value: number;
  max: number;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function useProgressContext() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error(
      "Progress components must be used within a Progress provider"
    );
  }
  return context;
}

/* Progress Root Component */
interface ProgressProps extends ComponentProps<"div"> {
  value?: number;
  max?: number;
  children: React.ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      className,
      children,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const contextValue: ProgressContextValue = {
      value,
      max,
    };

    return (
      <div
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={value}
        className={cn("relative", className)}
        data-slot="progress"
        ref={ref}
        role="progressbar"
        {...props}
      >
        <ProgressContext.Provider value={contextValue}>
          {children}
        </ProgressContext.Provider>
      </div>
    );
  }
);

Progress.displayName = "Progress";

/* Progress Linear Component */
interface ProgressLinearProps extends ComponentProps<"div"> {
  thickness?: "default" | "thick";
  fourColor?: boolean;
  indicatorClassName?: string;
}

const progressLinearVariants = cva("relative overflow-hidden", {
  variants: {
    thickness: {
      default: "h-1",
      thick: "h-2",
    },
  },
  defaultVariants: {
    thickness: "default",
  },
});

const ProgressLinear = forwardRef<HTMLDivElement, ProgressLinearProps>(
  (
    { className, fourColor = false, indicatorClassName, thickness, ...props },
    ref
  ) => {
    const { value, max } = useProgressContext();

    const percentage = Math.min(
      Math.max((value / max) * PERCENTAGE_MULTIPLIER, MIN_PERCENTAGE),
      MAX_PERCENTAGE
    );

    const gapSize = STOP_SIZE_DEFAULT; // Always 4dp gap
    const stopIndicatorSize =
      thickness === "thick" ? STOP_SIZE_THICK : STOP_SIZE_DEFAULT;

    return (
      <div
        className={cn(
          progressLinearVariants({ thickness }),
          "w-full",
          className
        )}
        data-slot="progress-linear-track"
        data-thickness={thickness}
        ref={ref}
        {...props}
      >
        {/* Main progress indicator */}
        {
          <>
            {/* Active indicator */}
            <div
              className={cn(
                "absolute top-0 left-0 h-full rounded-full bg-primary",
                indicatorClassName,
                fourColor && "progress-linear-four-color"
              )}
              data-four-color={fourColor}
              data-slot="progress-linear-indicator"
              style={{
                width:
                  percentage > MIN_PERCENTAGE && percentage < MAX_PERCENTAGE
                    ? `calc(${percentage}% - ${gapSize}px)`
                    : `${percentage}%`,
              }}
            />

            {/* Track (remaining progress) - positioned after the gap */}
            <div
              className="absolute top-0 h-full rounded-full bg-surface-container-highest"
              data-slot="progress-linear-remaining-track"
              style={{
                left:
                  percentage > MIN_PERCENTAGE && percentage < MAX_PERCENTAGE
                    ? `calc(${percentage}% - ${gapSize}px + ${gapSize}px)`
                    : `${percentage}%`,
                right: 0,
                width:
                  percentage > MIN_PERCENTAGE && percentage < MAX_PERCENTAGE
                    ? `calc(100% - ${percentage}% + ${gapSize}px - ${gapSize}px)`
                    : `calc(100% - ${percentage}%)`,
              }}
            />

            {/* Stop indicator for M3 accessibility - positioned at end of track (remaining progress) */}
            {percentage > STOP_INDICATOR_THRESHOLD &&
              percentage < STOP_INDICATOR_MAX && (
                <div
                  className={cn(
                    "absolute rounded-full bg-primary",
                    fourColor && "progress-linear-four-color"
                  )}
                  data-four-color={fourColor}
                  data-slot="progress-linear-stop-indicator"
                  style={{
                    width: `${stopIndicatorSize}px`,
                    height: `${stopIndicatorSize}px`,
                    left: `calc(100% - ${stopIndicatorSize / 2}px)`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 10,
                  }}
                />
              )}
          </>
        }
      </div>
    );
  }
);

ProgressLinear.displayName = "Progress.Linear";

/* Progress Circular Component */
interface ProgressCircularProps extends ComponentProps<"svg"> {
  size?: "sm" | "md" | "lg";
  strokeWidth?: number;
  fourColor?: boolean;
}

const progressCircularVariants = cva("", {
  variants: {
    size: {
      sm: "h-6 w-6",
      md: "h-12 w-12",
      lg: "h-18 w-18",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const ProgressCircular = forwardRef<SVGSVGElement, ProgressCircularProps>(
  (
    { className, size = "md", strokeWidth, fourColor = false, ...props },
    ref
  ) => {
    const { value, max } = useProgressContext();

    const percentage = Math.min(
      Math.max((value / max) * PERCENTAGE_MULTIPLIER, MIN_PERCENTAGE),
      MAX_PERCENTAGE
    );

    // Size and stroke calculations based on M3 specifications
    const sizeMap = { sm: 24, md: 48, lg: 72 };
    const defaultStrokeWidthMap = { sm: 3, md: 4, lg: 6 };
    const diameter = sizeMap[size];
    const radius =
      (diameter - (strokeWidth || defaultStrokeWidthMap[size])) / 2;
    const circumference = radius * 2 * Math.PI;

    // Calculate stroke dash offset
    const strokeDashoffset =
      circumference - (percentage / PERCENTAGE_MULTIPLIER) * circumference;

    return (
      <svg
        aria-label="Progress indicator"
        className={cn(progressCircularVariants({ size }), className)}
        data-slot="progress-circular-svg"
        ref={ref}
        role="img"
        viewBox={`0 0 ${diameter} ${diameter}`}
        {...props}
      >
        {/* Track circle */}
        <circle
          cx={diameter / 2}
          cy={diameter / 2}
          data-slot="progress-circular-track"
          r={radius}
          strokeWidth={strokeWidth || defaultStrokeWidthMap[size]}
        />

        {/* Progress indicator circle */}
        <circle
          className={cn(fourColor && "progress-circular-four-color")}
          cx={diameter / 2}
          cy={diameter / 2}
          data-four-color={fourColor}
          data-slot="progress-circular-indicator"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeWidth={strokeWidth || defaultStrokeWidthMap[size]}
        />
      </svg>
    );
  }
);

ProgressCircular.displayName = "Progress.Circular";

/* Progress Label Component */
interface ProgressLabelProps extends ComponentProps<"span"> {}

const ProgressLabel = forwardRef<HTMLSpanElement, ProgressLabelProps>(
  ({ className, ...props }, ref) => (
    <span
      className={cn("text-on-surface-variant text-sm", className)}
      data-slot="progress-label"
      ref={ref}
      {...props}
    />
  )
);

ProgressLabel.displayName = "Progress.Label";

/* Create compound component interface */
interface ProgressCompound
  extends ForwardRefExoticComponent<
    ProgressProps & RefAttributes<HTMLDivElement>
  > {
  Linear: typeof ProgressLinear;
  Circular: typeof ProgressCircular;
  Label: typeof ProgressLabel;
}

/* Attach sub-components to Progress */
const ProgressWithSubComponents = Progress as ProgressCompound;
ProgressWithSubComponents.Linear = ProgressLinear;
ProgressWithSubComponents.Circular = ProgressCircular;
ProgressWithSubComponents.Label = ProgressLabel;

export {
  ProgressWithSubComponents as Progress,
  ProgressLinear,
  ProgressCircular,
  ProgressLabel,
  progressLinearVariants,
  progressCircularVariants,
  type ProgressProps,
  type ProgressLinearProps,
  type ProgressCircularProps,
  type ProgressLabelProps,
};
