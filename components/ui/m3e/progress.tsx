"use client";

import { cva } from "class-variance-authority";
import {
  type ComponentProps,
  createContext,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
  useContext,
  useId,
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
  variant?: "linear" | "wavy";
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
    {
      className,
      fourColor = false,
      indicatorClassName,
      thickness,
      variant = "linear",
      ...props
    },
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

    // Wavy variant logic
    const isWavy = variant === "wavy";
    const amplitude = 3; // Hardcoded according to specs
    const wavelength = 40; // Hardcoded according to specs

    // Generate mask if wavy
    // We use a thick stroke for the mask to define the visible area
    // The stroke width in the SVG should match the component's thickness.
    // Default thickness is h-1 (4px), thick is h-2 (8px).
    const strokeWidth = thickness === "thick" ? 8 : 4;

    const waveHeight = amplitude * 2 + strokeWidth + 2; // Add padding to avoid clipping

    // For wavy, we need to adjust the container height
    const containerHeight = isWavy ? waveHeight : undefined;

    // We draw the wave from -wavelength to 2*wavelength to ensure seamless tiling
    // and avoid any artifacts at the boundaries (0 and wavelength).
    // The viewBox clips it to show exactly one cycle (0 to wavelength).
    const waveSvg = isWavy
      ? `
      <svg width="${wavelength}" height="${waveHeight}" viewBox="0 0 ${wavelength} ${waveHeight}" xmlns="http://www.w3.org/2000/svg">
        <path d="M -${wavelength},${waveHeight / 2} Q -${wavelength * 0.75},${waveHeight / 2 - amplitude} -${wavelength / 2},${waveHeight / 2} T 0,${waveHeight / 2} T ${wavelength / 2},${waveHeight / 2} T ${wavelength},${waveHeight / 2} T ${wavelength * 1.5},${waveHeight / 2} T ${wavelength * 2},${waveHeight / 2}" fill="none" stroke="black" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `
      : "";

    const maskImage = isWavy
      ? `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
          waveSvg.trim()
        )}")`
      : undefined;

    return (
      <div
        className={cn(
          progressLinearVariants({ thickness }),
          "w-full",
          isWavy && "overflow-visible", // Allow wave to extend if needed
          className
        )}
        data-slot="progress-linear-track"
        data-thickness={thickness}
        data-variant={variant}
        ref={ref}
        style={{
          height: containerHeight,
        }}
        {...props}
      >
        <style jsx>{`
          @keyframes wave-slide {
            from { mask-position: 0 0; -webkit-mask-position: 0 0; }
            to { mask-position: -${wavelength}px 0; -webkit-mask-position: -${wavelength}px 0; }
          }
        `}</style>

        {/* Main progress indicator */}
        {
          <>
            {/* Active indicator - WAVY if variant is wavy */}
            <div
              className={cn(
                "absolute top-0 left-0 rounded-full bg-primary",
                indicatorClassName,
                fourColor && "progress-linear-four-color",
                isWavy ? "h-full" : "h-full"
              )}
              data-four-color={fourColor}
              data-slot="progress-linear-indicator"
              style={{
                width:
                  percentage > MIN_PERCENTAGE && percentage < MAX_PERCENTAGE
                    ? `calc(${percentage}% - ${gapSize}px)`
                    : `${percentage}%`,
                // Apply mask ONLY to the active indicator if wavy
                maskImage,
                maskRepeat: "repeat-x",
                maskSize: `${wavelength}px ${waveHeight}px`,
                WebkitMaskImage: maskImage,
                WebkitMaskRepeat: "repeat-x",
                WebkitMaskSize: `${wavelength}px ${waveHeight}px`,
                animation: isWavy ? "wave-slide 1s linear infinite" : undefined,
              }}
            />

            {/* Track (remaining progress) - positioned after the gap */}
            {/* If wavy, this should be a straight line centered vertically */}
            <div
              className={cn(
                "absolute rounded-full bg-surface-container-highest",
                isWavy ? "-translate-y-1/2 top-1/2" : "top-0 h-full"
              )}
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
                height: isWavy
                  ? thickness === "thick"
                    ? "8px"
                    : "4px"
                  : undefined,
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
interface ProgressCircularProps extends ComponentProps<"div"> {
  size?: number;
  thickness?: "default" | "thick";
  fourColor?: boolean;
  indicatorClassName?: string;
  variant?: "linear" | "wavy";
}

const ProgressCircular = forwardRef<HTMLDivElement, ProgressCircularProps>(
  (
    {
      className,
      size = 48,
      thickness = "default",
      fourColor = false,
      indicatorClassName,
      variant = "linear",
      ...props
    },
    ref
  ) => {
    const { value, max } = useProgressContext();

    const percentage = Math.min(
      Math.max((value / max) * PERCENTAGE_MULTIPLIER, MIN_PERCENTAGE),
      MAX_PERCENTAGE
    );

    const strokeWidth = thickness === "thick" ? 8 : 4;
    const isWavy = variant === "wavy";

    // Wavy parameters
    const amplitude = 1.6; // Slight amplitude for circular
    // We need an integer number of waves for the path to close perfectly
    // Circumference = 2 * PI * R
    // Target wavelength ~ 20px (similar to linear)
    // N = Circumference / 20
    const radius = (size - strokeWidth) / 2 - (isWavy ? amplitude : 0);
    const circumference = 2 * Math.PI * radius;
    const targetWavelength = 18;
    const waveCount = Math.round(circumference / targetWavelength);

    // Generate path data
    let pathData = "";
    if (isWavy) {
      // Generate wavy circle path
      // x = (R + A * sin(N * theta)) * cos(theta)
      // y = (R + A * sin(N * theta)) * sin(theta)
      // We need to center it at (size/2, size/2)
      const center = size / 2;
      const points = [];
      const steps = 360; // Resolution

      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * 2 * Math.PI;
        // Subtract PI/2 to start from top
        const angle = theta - Math.PI / 2;

        const r = radius + amplitude * Math.sin(waveCount * theta);
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);

        points.push(`${i === 0 ? "M" : "L"} ${x},${y}`);
      }
      pathData = `${points.join(" ")} Z`;
    } else {
      // Standard circular path (circle)
      // We use a path instead of <circle> to be consistent if we want to animate it similarly later,
      // but <circle> is easier for stroke-dasharray calculations usually.
      // However, to support the same "fill" logic, let's use <circle> for default.
    }

    // Calculate wavy path length for dasharray
    let _wavyPathLength = 0;
    if (isWavy) {
      const center = size / 2;
      const steps = 360;
      let prevX = 0,
        prevY = 0;

      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * 2 * Math.PI;
        const angle = theta - Math.PI / 2;
        const r = radius + amplitude * Math.sin(waveCount * theta);
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);

        if (i > 0) {
          const dx = x - prevX;
          const dy = y - prevY;
          _wavyPathLength += Math.sqrt(dx * dx + dy * dy);
        }
        prevX = x;
        prevY = y;
      }
    }
    // Gap calculation
    const visualGap = 4; // Desired visual gap in pixels
    // With rounded caps, the stroke extends by strokeWidth/2 on each end.
    // So two meeting segments extend by strokeWidth into the gap.
    // We need to increase the calculated gap by strokeWidth to maintain the visual gap.
    const gapSize = visualGap + strokeWidth;
    const halfGap = gapSize / 2;

    // Length calculations
    // Active Length: The visual length of the active indicator
    // It should be: (Percentage * Circumference) - GapSize (half at start, half at end)
    const activeAngleLength = (percentage / 100) * circumference;
    const activeLength = Math.max(0, activeAngleLength - gapSize);

    // Track Length: The visual length of the remaining track
    // It should be: (RemainingCircumference) - GapSize (half at start, half at end)
    const trackLength = Math.max(
      0,
      circumference - activeAngleLength - gapSize
    );

    // Rotations
    // Active starts at: -90deg + halfGap angle
    const halfGapAngle = (halfGap / circumference) * 360;
    const activeRotation = -90 + halfGapAngle;

    // Track starts at: -90deg + ActiveAngle + halfGap angle
    const activeAngleDeg = (percentage / 100) * 360;
    const trackRotation = -90 + activeAngleDeg + halfGapAngle;

    // Mask ID for wavy variant
    const maskId = useId();

    return (
      <div
        className={cn("relative inline-flex", className)}
        data-slot="progress-circular"
        data-thickness={thickness}
        data-variant={variant}
        ref={ref}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          className="rotate-0"
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <style jsx>{`
                @keyframes circular-wave-slide {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
          {isWavy && (
            <defs>
              <mask id={maskId}>
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  fill="none"
                  r={radius}
                  stroke="white"
                  strokeDasharray={`${activeLength} ${circumference}`} // Thick enough to reveal waves
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  strokeWidth={strokeWidth + 2 * amplitude + 2}
                  transform={`rotate(${activeRotation} ${size / 2} ${size / 2})`}
                />
              </mask>
            </defs>
          )}

          {/* Track (Remaining) - Always Circular */}
          <circle
            cx={size / 2}
            cy={size / 2}
            fill="none"
            r={radius}
            stroke="var(--color-surface-container-highest)"
            strokeDasharray={`${trackLength} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
            transform={`rotate(${trackRotation} ${size / 2} ${size / 2})`}
          />

          {/* Indicator (Active) */}
          {isWavy ? (
            <g mask={`url(#${maskId})`}>
              <path
                className={cn(
                  "origin-center",
                  fourColor && "progress-circular-four-color"
                )}
                d={pathData}
                fill="none"
                stroke="var(--color-primary)"
                strokeLinecap="round"
                strokeWidth={strokeWidth}
                style={{ animation: "circular-wave-slide 4s linear infinite" }} // Smooth wave slide
              />
            </g>
          ) : (
            <circle
              className={cn(
                "transition-all duration-500 ease-in-out",
                fourColor && "progress-circular-four-color"
              )}
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke="var(--color-primary)"
              strokeDasharray={`${activeLength} ${circumference}`}
              strokeDashoffset={0}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              transform={`rotate(${activeRotation} ${size / 2} ${size / 2})`}
            />
          )}
        </svg>
      </div>
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
  type ProgressProps,
  type ProgressLinearProps,
  type ProgressCircularProps,
  type ProgressLabelProps,
};
