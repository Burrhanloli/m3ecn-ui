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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/m3e/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProgressDocs() {
  const DEFAULT_VALUE = 66;
  const COPY_TIMEOUT = 5000;

  // Interactive playground states
  const [type, setType] = useState<"linear" | "circular">("linear");
  const [thickness, setThickness] = useState<"default" | "thick">("default");
  const [fourColor, setFourColor] = useState(false);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [variant, setVariant] = useState<"linear" | "wavy">("linear");
  const [size, setSize] = useState(48);
  const [copied, setCopied] = useState(false);

  const thicknesses = ["default", "thick"] as const;
  const variants = ["linear", "wavy"] as const;

  const generateCode = () => {
    let props = `thickness="${thickness}"`;
    if (fourColor) {
      props += " fourColor={true}";
    }
    if (variant === "wavy") {
      props += ' variant="wavy"';
    }

    if (type === "circular") {
      if (size !== 48) {
        props += ` size={${size}}`;
      }
      return `<Progress value={${value}} max={100}>\n  <Progress.Circular ${props} />\n</Progress>`;
    }

    return `<Progress value={${value}} max={100}>\n  <Progress.Linear ${props} />\n</Progress>`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), COPY_TIMEOUT);
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Progress Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Material 3 Progress indicators with determinate and indeterminate
            modes for showing ongoing processes.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Playground</CardTitle>
          <CardDescription>
            Configure progress props and see a live preview with generated code
            snippet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      checked={type === "linear"}
                      className="h-4 w-4"
                      id="type-linear"
                      name="type"
                      onChange={() => setType("linear")}
                      type="radio"
                      value="linear"
                    />
                    <Label htmlFor="type-linear">Linear</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      checked={type === "circular"}
                      className="h-4 w-4"
                      id="type-circular"
                      name="type"
                      onChange={() => setType("circular")}
                      type="radio"
                      value="circular"
                    />
                    <Label htmlFor="type-circular">Circular</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thickness-select">Thickness</Label>
                <Select
                  onValueChange={(val) =>
                    setThickness(val as "default" | "thick")
                  }
                  value={thickness}
                >
                  <SelectTrigger id="thickness-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {thicknesses.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="variant-select">Variant</Label>
                <Select
                  onValueChange={(val) => setVariant(val as "linear" | "wavy")}
                  value={variant}
                >
                  <SelectTrigger id="variant-select">
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

              {type === "circular" && (
                <div className="space-y-2">
                  <Label htmlFor="size-input">Size (px)</Label>
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="size-input"
                    max="240"
                    min="24"
                    onChange={(e) => setSize(Number(e.target.value))}
                    type="number"
                    value={size}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={fourColor}
                  id="four-color"
                  onCheckedChange={(checked) =>
                    setFourColor(checked as boolean)
                  }
                />
                <Label htmlFor="four-color">Four Color Animation</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value-input">Value: {value}%</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="value-input"
                  max="100"
                  min="0"
                  onChange={(e) => setValue(Number(e.target.value))}
                  type="range"
                  value={value}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex min-h-[200px] items-center justify-center rounded-lg border bg-surface-container-lowest p-8">
                <div className="flex w-full flex-col items-center space-y-4">
                  <Label>Preview</Label>
                  <Progress
                    aria-label="Progress preview"
                    className={type === "circular" ? "w-auto" : "w-full"}
                    max={100}
                    value={value}
                  >
                    {type === "linear" ? (
                      <Progress.Linear
                        fourColor={fourColor}
                        thickness={thickness}
                        variant={variant}
                      />
                    ) : (
                      <Progress.Circular
                        fourColor={fourColor}
                        size={size}
                        thickness={thickness}
                        variant={variant}
                      />
                    )}
                  </Progress>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>Code</Label>
                  <UIButton onClick={handleCopy} size="sm" variant="outline">
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
