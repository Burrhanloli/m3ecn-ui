"use client";

import { Check, Copy, Volume2 } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/m3e/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SliderDocs() {
  const [variant, setVariant] = useState<"standard" | "centered" | "range">(
    "standard"
  );
  const [size, setSize] = useState<"xs" | "s" | "m" | "l" | "xl">("xs");

  const [withStops, setWithStops] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [copied, setCopied] = useState(false);

  // State for slider values
  const [value, setValue] = useState([50]);
  const [rangeValue, setRangeValue] = useState([20, 80]);
  const [centeredValue, setCenteredValue] = useState([0]);

  const variants = ["standard", "centered", "range"] as const;
  const sizes = ["xs", "s", "m", "l", "xl"] as const;

  const generateCode = () => {
    let props = "";

    if (variant !== "standard") {
      props += ` variant="${variant}"`;
    }
    if (size !== "xs") {
      props += ` size="${size}"`;
    }

    if (withStops) {
      props += " withStops";
      props += " step={10}"; // Example step
    }
    if (showIcon) {
      props += " icon={<Volume2 />}";
    }
    if (disabled) {
      props += " disabled";
    }

    // Add value prop example based on variant
    if (variant === "range") {
      props += " defaultValue={[20, 80]} max={100} min={0}";
    } else if (variant === "centered") {
      props += " defaultValue={[0]} max={50} min={-50}";
    } else {
      props += " defaultValue={[50]} max={100} min={0}";
    }

    return `<Slider${props} />`;
  };

  const handleValueChange = (val: number[]) => {
    if (variant === "range") {
      setRangeValue(val);
    } else if (variant === "centered") {
      setCenteredValue(val);
    } else {
      setValue(val);
    }
  };

  const getCurrentValue = () => {
    if (variant === "range") {
      return rangeValue;
    }
    if (variant === "centered") {
      return centeredValue;
    }
    return value;
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Slider Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Interactive playground and preview of all variants, sizes, and
            orientations for the Material Design 3 Expressive slider component.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Playground</CardTitle>
          <CardDescription>
            Configure slider props and see a live preview with generated code
            snippet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant-select">Variant</Label>
                <Select
                  onValueChange={(v) => setVariant(v as any)}
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
                <Label htmlFor="size-select">Size</Label>
                <Select onValueChange={(s) => setSize(s as any)} value={size}>
                  <SelectTrigger className="w-[180px]" id="size-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={withStops}
                  id="with-stops"
                  onCheckedChange={setWithStops}
                />
                <Label htmlFor="with-stops">With Stops</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={showIcon}
                  id="show-icon"
                  onCheckedChange={setShowIcon}
                />
                <Label htmlFor="show-icon">Show Icon</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={disabled}
                  id="disabled"
                  onCheckedChange={(checked) => setDisabled(checked === true)}
                />
                <Label htmlFor="disabled">Disabled</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">Preview</Label>
                <div className="flex items-center justify-center rounded border bg-background p-12">
                  <div className="w-full max-w-md">
                    <Slider
                      disabled={disabled}
                      icon={
                        showIcon ? <Volume2 className="h-4 w-4" /> : undefined
                      }
                      max={variant === "centered" ? 50 : 100}
                      min={variant === "centered" ? -50 : 0}
                      onValueChange={handleValueChange}
                      size={size}
                      step={withStops ? 10 : 1}
                      value={getCurrentValue()}
                      variant={variant}
                      withStops={withStops}
                    />
                  </div>
                </div>
                <p className="mt-2 text-center text-muted-foreground text-sm">
                  Value: {getCurrentValue().map(Math.round).join(", ")}
                </p>
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
