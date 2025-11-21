"use client";

import { useRanger } from "@tanstack/react-ranger";
import * as React from "react";
import { cn } from "@/lib/utils";
import "@/components/ui/m3e/styles/m3e-colors.css";

interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  min: number;
  max: number;
  step?: number;
  value: number[];
  onValueChange?: (value: number[]) => void;
  variant?: "standard" | "centered" | "range";
  size?: "xs" | "s" | "m" | "l" | "xl";
  withStops?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
  tickLabel?: (value: number) => React.ReactNode;
}

const sliderVariants = {
  // Measurements derived from M3 Specs (User Provided Image)
  // XS: Track 16dp (h-4), Handle 44dp (h-11), Radius 8dp (rounded-lg)
  xs: {
    container: "h-11", // Match handle height for touch target
    track: "h-4 rounded-lg",
    thumb: "h-11 w-1 rounded-full shadow-sm", // 44dp
    tick: "size-[4px]",
    iconSize: null,
  },

  // S: Track 24dp (h-6), Handle 44dp (h-11), Radius 8dp (rounded-lg)
  s: {
    container: "h-11",
    track: "h-6 rounded-lg",
    thumb: "h-11 w-1 rounded-full shadow-sm", // 44dp
    tick: "size-[4px]",
    iconSize: null,
  },

  // M: Track 40dp (h-10), Handle 52dp (h-[52px]), Radius 12dp (rounded-[12px]), Icon 24dp
  m: {
    container: "h-[52px]",
    track: "h-10 rounded-[12px]",
    thumb: "h-[52px] w-1 rounded-full",
    tick: "size-[4px]",
    iconSize: "h-6 w-6",
  },

  // L: Track 56dp (h-14), Handle 68dp (h-[68px]), Radius 16dp (rounded-2xl), Icon 24dp
  l: {
    container: "h-[68px]",
    track: "h-14 rounded-2xl",
    thumb: "h-[68px] w-1 rounded-full",
    tick: "size-[4px]",
    iconSize: "h-6 w-6",
  },

  // XL: Track 96dp (h-24), Handle 108dp (h-[108px]), Radius 28dp (rounded-[28px]), Icon 32dp
  xl: {
    container: "h-[108px]",
    track: "h-24 rounded-[28px]",
    thumb: "h-[108px] w-1 rounded-full",
    tick: "size-[4px]",
    iconSize: "h-8 w-8",
  },
};

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      min,
      max,
      step = 1,
      value,
      onValueChange,
      variant = "standard",
      size = "xs",
      withStops = false,
      icon,
      disabled,
      tickLabel,
      ...props
    },
    ref
  ) => {
    const rangerRef = React.useRef<HTMLDivElement>(null);

    const ranger = useRanger({
      getRangerElement: () => rangerRef.current,
      values: value,
      min,
      max,
      stepSize: step,
      onChange: (instance) =>
        onValueChange?.(instance.sortedValues as number[]),
      interpolator: {
        getPercentageForValue: (val: number, minVal: number, maxVal: number) =>
          ((val - minVal) / (maxVal - minVal)) * 100,
        getValueForClientX: (
          clientX: number,
          trackDims: { width: number; left: number },
          minVal: number,
          maxVal: number
        ) => {
          const percentage = (clientX - trackDims.left) / trackDims.width;
          return minVal + (maxVal - minVal) * percentage;
        },
      } as any, // Cast to any to support vertical interpolation if types are missing
    });

    const isRangeMode = variant === "range" || value.length > 1;
    const isCentered = variant === "centered";

    // Calculate track fill
    const _getTrackStyle = () => {
      if (isRangeMode && value.length === 2) {
        const start = ranger.getPercentageForValue(value[0]);
        const end = ranger.getPercentageForValue(value[1]);
        return {
          left: `${start}%`,
          width: `${end - start}%`,
        };
      }
      if (isCentered) {
        const center = (min + max) / 2;
        const val = value[0];
        const start = ranger.getPercentageForValue(Math.min(center, val));
        const end = ranger.getPercentageForValue(Math.max(center, val));
        return {
          left: `${start}%`,
          width: `${end - start}%`,
        };
      }
      // Standard single value
      return {
        width: `${ranger.getPercentageForValue(value[0])}%`,
      };
    };

    // Determine if we are in "Expressive" mode (tall track)
    // Actually, all sizes now have specific measurements.
    // We just need to check if icon is allowed (M, L, XL)
    const hasIcon = size === "m" || size === "l" || size === "xl";

    return (
      <div
        className={cn(
          "relative flex touch-none select-none items-center justify-center",
          cn("w-full flex-row", sliderVariants[size].container),
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Inset Icon (Standard Horizontal only for now as per request "Optional inset icon (standard slider only)") */}
        {/* If it's an inset icon, it usually sits inside the track at the start. */}

        <div
          className={cn(
            "relative flex items-center justify-center transition-all duration-200",
            // Removed bg-secondary-container from here as we render it manually now
            cn("w-full", sliderVariants[size].track)
          )}
          ref={rangerRef}
        >
          {/* Inset Icon - Only for sizes where it fits inside (M, L, XL) */}
          {icon && variant === "standard" && hasIcon && (
            <div
              className={cn(
                "pointer-events-none absolute left-4 z-10 flex items-center justify-center text-primary opacity-100",
                sliderVariants[size].iconSize
              )}
            >
              {icon}
            </div>
          )}

          {/* Track Rendering with Gaps */}
          {(() => {
            // Apply gap for all sizes as per specs
            const hasGap = true;
            // Gap calculation:
            // Handle width is 4px (w-1). Half width is 2px.
            // We want a visual gap of ~4px.
            // gapSize/2 should be HandleHalfWidth + VisualGap = 2 + 4 = 6px.
            // So gapSize should be 12px.
            const gapSize = hasGap ? 12 : 0;

            // We need to handle single and range sliders
            // ranger.handles() gives us the current values in order
            const handles = ranger.handles();
            const isRange = handles.length > 1;

            // Helper to get percent
            const getPercent = (valPercent: number) =>
              ranger.getPercentageForValue(valPercent);

            // Border radius mapping
            const fullRadiusLeft = {
              xs: "rounded-l-lg",
              s: "rounded-l-lg",
              m: "rounded-l-[12px]",
              l: "rounded-l-2xl",
              xl: "rounded-l-[28px]",
            }[size];

            const fullRadiusRight = {
              xs: "rounded-r-lg",
              s: "rounded-r-lg",
              m: "rounded-r-[12px]",
              l: "rounded-r-2xl",
              xl: "rounded-r-[28px]",
            }[size];

            const smallRadius = "rounded-[4px]";
            const smallRadiusLeft = "rounded-l-[4px]";
            const smallRadiusRight = "rounded-r-[4px]";

            // Active Track Style (Color only, radius applied per segment)
            const activeTrackBaseClass =
              "absolute bg-primary transition-all duration-200";

            // Inactive Track Style (Color only, radius applied per segment)
            const inactiveTrackBaseClass =
              "absolute bg-secondary-container transition-all duration-200";

            if (isRange) {
              // Range Slider: Inactive - Active - Inactive
              const val1 = handles[0].value;
              const val2 = handles[1].value;
              const p1 = getPercent(val1);
              const p2 = getPercent(val2);

              // End indicator size (4px dot)
              const endIndicatorSize = 4;

              return (
                <>
                  {/* First Inactive Segment (0 to Val1) */}
                  <div
                    className={cn(
                      inactiveTrackBaseClass,
                      fullRadiusLeft,
                      smallRadiusRight
                    )}
                    style={{
                      left: 0,
                      width: `calc(${p1}% - ${gapSize / 2}px)`,
                      height: "100%",
                      top: 0,
                    }}
                  />

                  {/* Active Segment (Val1 to Val2) */}
                  <div
                    className={cn(activeTrackBaseClass, smallRadius)}
                    style={{
                      left: `calc(${p1}% + ${gapSize / 2}px)`,
                      width: `calc(${p2 - p1}% - ${gapSize}px)`,
                      height: "100%",
                      top: 0,
                    }}
                  />

                  {/* Second Inactive Segment (Val2 to 100) */}
                  <div
                    className={cn(
                      inactiveTrackBaseClass,
                      smallRadiusLeft,
                      fullRadiusRight
                    )}
                    style={{
                      left: `calc(${p2}% + ${gapSize / 2}px)`,
                      width: `calc(${100 - p2}% - ${gapSize / 2}px)`,
                      height: "100%",
                      top: 0,
                    }}
                  />

                  {/* End indicator for second inactive segment */}
                  {p2 < 100 && (
                    <div
                      className="absolute rounded-full bg-primary"
                      style={{
                        width: `${endIndicatorSize}px`,
                        height: `${endIndicatorSize}px`,
                        left: `calc(100% - ${endIndicatorSize / 2}px)`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                      }}
                    />
                  )}
                </>
              );
            }

            if (isCentered) {
              const center = (min + max) / 2;
              const val = handles[0]?.value ?? center;
              const pVal = getPercent(val);
              const pCenter = getPercent(center);

              const isPositive = val >= center;
              const halfGap = gapSize / 2; // 6px
              const halfCenterGap = 2; // 4px center gap / 2

              // End indicator size (4px dot)
              const endIndicatorSize = 4;

              return (
                <>
                  {/* Inactive Segment (Left) */}
                  <div
                    className={cn(
                      inactiveTrackBaseClass,
                      fullRadiusLeft,
                      smallRadiusRight
                    )}
                    style={{
                      left: 0,
                      width: isPositive
                        ? `min(${pCenter}% - ${halfCenterGap}px, ${pVal}% - ${halfGap}px)`
                        : `calc(${pVal}% - ${halfGap}px)`,
                      height: "100%",
                      top: 0,
                    }}
                  />

                  {/* Active Segment (Middle) */}
                  <div
                    className={cn(activeTrackBaseClass, smallRadius)}
                    style={{
                      left: isPositive
                        ? `calc(${pCenter}% + ${halfCenterGap}px)`
                        : `calc(${pVal}% + ${halfGap}px)`,
                      width: isPositive
                        ? `max(0px, calc(${pVal}% - ${halfGap}px - (${pCenter}% + ${halfCenterGap}px)))`
                        : `max(0px, calc(${pCenter}% - ${halfCenterGap}px - (${pVal}% + ${halfGap}px)))`,
                      height: "100%",
                      top: 0,
                    }}
                  />

                  {/* Inactive Segment (Right) */}
                  <div
                    className={cn(
                      inactiveTrackBaseClass,
                      smallRadiusLeft,
                      fullRadiusRight
                    )}
                    style={{
                      left: isPositive
                        ? `calc(${pVal}% + ${halfGap}px)`
                        : `max(${pCenter}% + ${halfCenterGap}px, ${pVal}% + ${halfGap}px)`,
                      width: isPositive
                        ? `calc(100% - (${pVal}% + ${halfGap}px))`
                        : `calc(100% - max(${pCenter}% + ${halfCenterGap}px, ${pVal}% + ${halfGap}px))`,
                      height: "100%",
                      top: 0,
                    }}
                  />

                  {/* End indicator for right inactive segment */}
                  <div
                    className="absolute rounded-full bg-primary"
                    style={{
                      width: `${endIndicatorSize}px`,
                      height: `${endIndicatorSize}px`,
                      right: "calc(100% - 8px)",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                  />
                </>
              );
            }

            // Standard Slider: Active - Inactive
            const val = handles[0]?.value ?? 0;
            const p = getPercent(val);

            // End indicator size (4px dot)
            const endIndicatorSize = 4;

            return (
              <>
                {/* Active Segment (0 to Val) */}
                <div
                  className={cn(
                    activeTrackBaseClass,
                    fullRadiusLeft,
                    smallRadiusRight
                  )}
                  style={{
                    left: 0,
                    width: `calc(${p}% - ${gapSize / 2}px)`,
                    height: "100%",
                    top: 0,
                  }}
                />

                {/* Inactive Segment (Val to 100) */}
                <div
                  className={cn(
                    inactiveTrackBaseClass,
                    smallRadiusLeft,
                    fullRadiusRight
                  )}
                  style={{
                    left: `calc(${p}% + ${gapSize / 2}px)`,
                    width: `calc(${100 - p}% - ${gapSize / 2}px)`,
                    height: "100%",
                    top: 0,
                  }}
                />

                {/* End indicator for inactive segment */}
                {p < 100 && (
                  <div
                    className="absolute rounded-full bg-primary"
                    style={{
                      width: `${endIndicatorSize}px`,
                      height: `${endIndicatorSize}px`,
                      left: "calc(100% - 8px)",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                  />
                )}
              </>
            );
          })()}

          {/* Stops (Ticks) */}
          {withStops && (
            <div
              className={cn(
                "pointer-events-none absolute inset-0 flex flex-row items-center justify-between"
              )}
            >
              {Array.from({ length: Math.floor((max - min) / step) + 1 }).map(
                (_, i) => {
                  const val = min + i * step;
                  const percent = ranger.getPercentageForValue(val);

                  // Skip the first stop (at min value)
                  if (val === min) {
                    return null;
                  }

                  // Determine if stop is within active range
                  const handles = ranger.handles();
                  let isActive = false;

                  if (handles.length === 1) {
                    // Single slider: Active from min to current value
                    isActive = val <= handles[0].value;
                  } else if (handles.length > 1) {
                    // Range slider: Active between two values
                    // Assuming sorted values for range
                    const sortedValues = handles
                      .map((h) => h.value)
                      .sort((a, b) => a - b);
                    isActive = val >= sortedValues[0] && val <= sortedValues[1];
                  }

                  if (!isActive) {
                    return null;
                  }

                  return (
                    <div
                      className={cn(
                        "absolute rounded-full bg-secondary-container opacity-40",
                        sliderVariants[size].tick
                      )}
                      key={i}
                      style={{
                        left: `${percent}%`,
                        transform: "translateX(-50%)",
                      }}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* Handles Container - separate from track to avoid clipping if we had overflow hidden, but we don't. 
            However, we need handles to be positioned relative to the ranger element (track).
            Ranger handles are positioned by percentage.
        */}
        {/* 
            Wait, useRanger expects the ref to be the track. 
            If we put handles outside, we need to make sure they are positioned correctly relative to the track.
            Usually handles are children of the track or siblings with same dimensions.
            Let's put them "inside" the visual track container but we need to ensure they can overflow.
            Actually, the `rangerRef` is on the track div. Handles should be siblings or children.
            If children, `overflow-hidden` on track would clip them.
            So we should NOT use `overflow-hidden` on the track div if handles are children.
        */}

        {/* Re-structure: 
            Wrapper (relative)
              Track (ref=rangerRef)
                Icon
                ActiveTrack
                Stops
              Handles (absolute, based on track)
        */}

        {/* But ranger calculates position based on the ref element's dimensions. */}

        {/* Handles */}
        {ranger.handles().map((handle, i) => (
          <button
            aria-valuemax={max}
            aria-valuemin={min}
            aria-valuenow={handle.value}
            className={cn(
              "group absolute z-20 flex touch-none flex-col items-center justify-center outline-none focus-visible:ring-0",
              "-translate-x-1/2 -translate-y-1/2 top-1/2"
            )}
            disabled={disabled}
            key={i}
            onClick={() => {}}
            onKeyDown={handle.onKeyDownHandler}
            onMouseDown={handle.onMouseDownHandler}
            onTouchStart={handle.onTouchStart}
            role="slider"
            style={{
              left: `${ranger.getPercentageForValue(handle.value)}%`,
            }}
            type="button"
          >
            {/* State Layer */}
            <div
              className={cn(
                "absolute rounded-full bg-primary/10 opacity-0 transition-opacity duration-200",
                "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100",
                // Size of state layer depends on handle size? Usually fixed or proportional.
                "h-10 w-10"
              )}
            />

            {/* Thumb */}
            <div
              className={cn(
                "shadow-sm transition-all",
                // Thumb styling based on size and state
                // This is where hover/active states for thinning would be applied
                sliderVariants[size].thumb,

                // All handles are now vertical bars (separators) or pills
                "w-[4px] rounded-full bg-primary", // Default width 4px (w-1)

                // Make thumb thin on hover/active
                "group-hover:w-[2px] group-active:w-[2px]"
              )}
            >
              {/* Value Label (only if stops/discrete or requested? M3 says "Value indicator" appears on interaction) */}
              {/* Let's show it on hover/active */}
              <div
                className={cn(
                  "pointer-events-none absolute flex flex-col items-center opacity-0 transition-opacity duration-200",
                  "group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100",
                  "-top-12 -translate-x-1/2 left-1/2"
                )}
              >
                <div
                  className={cn(
                    "relative flex items-center justify-center rounded-full bg-inverse-surface text-inverse-on-surface text-sm shadow-md",
                    "h-8 min-w-8 px-2"
                  )}
                >
                  {handle.value}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
