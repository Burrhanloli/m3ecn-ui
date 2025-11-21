"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button as UIButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/m3e/carousel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CarouselDocs() {
  const [variant, setVariant] = useState<
    "multi-browse" | "uncontained" | "hero" | "full-screen"
  >("multi-browse");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [itemCount, setItemCount] = useState("10");
  const [copied, setCopied] = useState(false);

  const variants = [
    "multi-browse",
    "uncontained",
    "hero",
    "full-screen",
  ] as const;
  const orientations = ["horizontal", "vertical"] as const;
  const counts = ["5", "10", "15", "20"];

  const generateCode = () => {
    let props = `variant="${variant}"`;
    if (orientation !== "horizontal") {
      props += ` orientation="${orientation}"`;
    }

    const itemClass =
      variant === "uncontained"
        ? ' className="basis-1/4"'
        : variant === "multi-browse"
          ? ' className=""'
          : // Default handling in component
            variant === "hero"
            ? ' className=""'
            : // Default handling in component
              ""; // full-screen handles itself

    return `<Carousel ${props} className="w-full${variant === "full-screen" ? " h-full" : ""}">
  <CarouselContent${variant !== "full-screen" ? ' className="h-[500px]"' : ""}>
    {Array.from({ length: ${itemCount} }).map((_, index) => (
      <CarouselItem${itemClass} key={index}>
        <img
          alt={\`Slide \${index + 1}\`}
          className="h-full w-full object-cover${variant !== "full-screen" ? " rounded-[28px]" : ""}"
          src={\`https://picsum.photos/seed/\${index + 1}/800/600\`}
        />
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>`;
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Carousel Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Interactive playground and preview of all variants and orientations
            for the Material Design 3 Expressive carousel component.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Playground</CardTitle>
          <CardDescription>
            Configure carousel props and see a live preview with generated code
            snippet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant-select">Variant</Label>
                <Select
                  onValueChange={(v) =>
                    setVariant(
                      v as
                        | "multi-browse"
                        | "uncontained"
                        | "hero"
                        | "full-screen"
                    )
                  }
                  value={variant}
                >
                  <SelectTrigger className="w-[180px]" id="variant-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orientation-select">Orientation</Label>
                <Select
                  onValueChange={(v) =>
                    setOrientation(v as "horizontal" | "vertical")
                  }
                  value={orientation}
                >
                  <SelectTrigger className="w-[180px]" id="orientation-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orientations.map((o) => (
                      <SelectItem key={o} value={o}>
                        {o}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="count-select">Item Count</Label>
                <Select onValueChange={setItemCount} value={itemCount}>
                  <SelectTrigger className="w-[180px]" id="count-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {counts.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Preview</Label>
                <div
                  className={`flex justify-center overflow-hidden rounded border bg-background p-4 ${
                    variant === "full-screen" ? "h-[600px]" : ""
                  }`}
                >
                  {/* Wrapper to constrain width for better preview of certain variants */}
                  <div
                    className={`w-full ${
                      variant === "full-screen"
                        ? "h-full max-w-md"
                        : "max-w-4xl"
                    }`}
                  >
                    <Carousel
                      className={`w-full ${
                        variant === "full-screen" ? "h-full" : ""
                      }`}
                      orientation={orientation}
                      variant={variant}
                    >
                      <CarouselContent
                        className={variant !== "full-screen" ? "h-[500px]" : ""}
                      >
                        {Array.from({
                          length: Number.parseInt(itemCount, 10),
                        }).map((_, index) => (
                          <CarouselItem
                            className={
                              variant === "uncontained" ? "basis-1/4" : ""
                            }
                            key={index}
                          >
                            <div
                              className={
                                variant === "uncontained" ? "p-1" : "h-full"
                              }
                            >
                              <img
                                alt={`Slide ${index + 1}`}
                                className={`h-full w-full object-cover ${
                                  variant !== "full-screen"
                                    ? "rounded-[28px]"
                                    : ""
                                }`}
                                src={`https://picsum.photos/seed/${
                                  index + 1
                                }/800/600`}
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label>Code</Label>
                  <UIButton
                    onClick={() => {
                      navigator.clipboard.writeText(generateCode());
                      setCopied(true);
                      setTimeout(() => setCopied(false), 5000);
                    }}
                    size="sm"
                    variant="outline"
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </UIButton>
                </div>
                <SyntaxHighlighter
                  className="rounded"
                  language="jsx"
                  style={oneDark}
                >
                  {generateCode()}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
