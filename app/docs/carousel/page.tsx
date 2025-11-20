"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/m3e/carousel";

export default function CarouselPage() {
  return (
    <div className="container mx-auto space-y-8 p-8">
      <div>
        <h1 className="mb-4 font-bold text-3xl">Carousel</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          A carousel allows users to browse through a set of items.
        </p>
      </div>

      <section>
        <h2 className="mb-4 font-semibold text-2xl">Multi-browse Carousel</h2>
        <p className="mb-4 text-muted-foreground">
          Shows multiple items at once. Default variant.
        </p>
        <div className="mx-auto w-full max-w-4xl">
          <Carousel className="w-full" variant="multi-browse">
            <CarouselContent className="h-[500px]">
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem className="" key={`multi-browse-${index}`}>
                  <img
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full rounded-[28px] object-cover"
                    src={`https://picsum.photos/seed/${index + 1}/500/500`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-2xl">Uncontained Carousel</h2>
        <p className="mb-4 text-muted-foreground">
          Allows free scrolling without snapping to specific items.
        </p>
        <div className="mx-auto w-full max-w-4xl">
          <Carousel className="w-full" variant="uncontained">
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  className="basis-1/4"
                  key={`uncontained-${index}`}
                >
                  <div className="p-1">
                    <img
                      alt={`Slide ${index + 1}`}
                      className="aspect-square w-full rounded-[28px] object-cover"
                      src={`https://picsum.photos/seed/${index + 10}/500/500`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-2xl">Hero Carousel</h2>
        <p className="mb-4 text-muted-foreground">
          Shows one large item at a time.
        </p>
        <div className="mx-auto w-full max-w-2xl">
          <Carousel className="w-full" variant="hero">
            <CarouselContent className="h-[500px]">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={`hero-${index}`}>
                  <img
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full rounded-[28px] object-cover"
                    src={`https://picsum.photos/seed/${index + 20}/800/450`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-semibold text-2xl">Full-screen Carousel</h2>
        <p className="mb-4 text-muted-foreground">
          Shows one edge-to-edge large item at a time and scrolls vertically.
        </p>
        <div className="mx-auto h-[600px] w-full max-w-md overflow-hidden rounded-xl border">
          <Carousel className="h-full w-full" variant="full-screen">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={`fullscreen-${index}`}>
                  <img
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full object-cover"
                    src={`https://picsum.photos/seed/${index + 40}/600/1000`}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
