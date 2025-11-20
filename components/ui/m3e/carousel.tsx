"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  variant?: "multi-browse" | "uncontained" | "hero" | "full-screen";
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      variant = "multi-browse",
      ...props
    },
    ref
  ) => {
    // Determine Embla options based on variant
    const variantOpts: CarouselOptions = React.useMemo(() => {
      if (variant === "uncontained") {
        return {
          align: "start",
          containScroll: false,
          dragFree: true, // Uncontained is free-scrolling
        };
      }
      if (variant === "multi-browse") {
        return {
          align: "start",
          containScroll: false,
          dragFree: true,
          watchSlides: false,
          watchResize: false,
        };
      }
      if (variant === "hero") {
        return {
          align: "start",
          containScroll: false,
          dragFree: true,
          watchSlides: false,
          watchResize: false,
        };
      }
      if (variant === "full-screen") {
        return {
          align: "start",
          containScroll: false,
          dragFree: false,
        };
      }
      return {};
    }, [variant]);

    const [carouselRef, api] = useEmblaCarousel(
      {
        ...variantOpts,
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) {
        return;
      }

      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext]
    );

    // Dynamic Sizing Logic for Multi-browse, Hero, and Center-aligned
    React.useEffect(() => {
      if (!api || (variant !== "multi-browse" && variant !== "hero")) {
        return;
      }

      const onScroll = () => {
        if (!api) {
          return;
        }
        const slides = api.slideNodes();
        const containerWidth = api.rootNode().clientWidth;
        const SMALL_WIDTH = 56; // 56px
        const HERO_LARGE_WIDTH_FACTOR = 0.7;
        const MULTI_BROWSE_LARGE_WIDTH_FACTOR = 0.52; // Adjusted for Large + Medium + Small
        const MULTI_BROWSE_EASING = 1.1; // Slower decay to keep Medium visible
        const EASING_POWER = 2.5;

        // Define target widths
        const smallWidth = SMALL_WIDTH;
        const minVal = smallWidth;

        for (const slide of slides) {
          const slideRect = slide.getBoundingClientRect();
          const containerRect = api.rootNode().getBoundingClientRect();

          // Calculate center of slide relative to container start
          const slideStart = slideRect.left - containerRect.left;

          // Distance from left edge.
          const distance = slideStart;

          let computedWidth = minVal;

          if (variant === "hero") {
            // Hero: Large -> Small directly
            const heroLargeWidth = containerWidth * HERO_LARGE_WIDTH_FACTOR;
            const heroRange = heroLargeWidth - minVal;

            computedWidth =
              minVal +
              heroRange *
                Math.max(0, 1 - distance / containerWidth) ** EASING_POWER;

            // Clamp
            if (computedWidth < smallWidth) {
              computedWidth = smallWidth;
            }
            if (computedWidth > heroLargeWidth) {
              computedWidth = heroLargeWidth;
            }
          } else {
            // Multi-browse
            const mbLargeWidth =
              containerWidth * MULTI_BROWSE_LARGE_WIDTH_FACTOR;
            const mbRange = mbLargeWidth - minVal;
            computedWidth =
              minVal +
              mbRange *
                Math.max(0, 1 - distance / containerWidth) **
                  MULTI_BROWSE_EASING;

            if (computedWidth < smallWidth) {
              computedWidth = smallWidth;
            }
            if (computedWidth > mbLargeWidth) {
              computedWidth = mbLargeWidth;
            }
          }

          slide.style.flexBasis = `${computedWidth}px`;
          // Ensure height is consistent
          slide.style.height = "100%";
        }
      };

      api.on("scroll", onScroll);
      api.on("reInit", onScroll);
      onScroll();

      return () => {
        api.off("scroll", onScroll);
        api.off("reInit", onScroll);
        for (const slide of api.slideNodes()) {
          slide.style.flexBasis = "";
          slide.style.height = "";
        }
      };
    }, [api, variant]);

    React.useEffect(() => {
      if (!(api && setApi)) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("reInit", onSelect);
        api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          variant,
        }}
      >
        <div
          aria-roledescription="carousel"
          className={cn("relative focus:outline-none", className)}
          onKeyDown={handleKeyDown}
          ref={ref}
          role="region"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation, variant } = useCarousel();

  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          // Spacing
          variant === "multi-browse" && "ml-0 gap-2 py-2 pr-4 pl-4",
          variant === "uncontained" && "ml-0 gap-2 py-2 pr-4 pl-4",
          variant === "hero" && "ml-0 gap-2 py-2 pr-4 pl-4",
          variant === "full-screen" && "ml-0 h-full gap-4 p-0",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation, variant } = useCarousel();

  return (
    <div
      aria-roledescription="slide"
      className={cn(
        "h-full min-w-0 shrink-0 grow-0 basis-full overflow-hidden",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        // Variant specific sizing
        // Multi-browse: Large item is dominant. We set a large basis, and rely on 'gap' for spacing.
        // The 'Large, Medium, Small' visual hierarchy is often achieved by the container width and item sizing.
        // If we want dynamic sizing, we'd need JS. For now, let's set a good default.
        variant === "multi-browse" && "basis-[70%] rounded-[28px] pl-0",
        // Uncontained: Large items, free scrolling.
        variant === "uncontained" && "basis-[85%] rounded-[28px] pl-0",
        variant === "hero" && "basis-[70%] rounded-[28px] pl-0",
        variant === "full-screen" && "basis-full pt-0 pl-0",
        className
      )}
      ref={ref}
      role="group"
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export { type CarouselApi, Carousel, CarouselContent, CarouselItem };
