"use client";

import { Check, Copy, Star } from "lucide-react";
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
import { IconButton } from "@/components/ui/m3e/icon-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function IconButtonDocs() {
  const [variant, setVariant] = useState("filled");
  const [size, setSize] = useState("m");
  const [shape, setShape] = useState("round");
  const [width, setWidth] = useState("default");
  const [buttonType, setButtonType] = useState<"default" | "toggle">("default");
  const [disabled, setDisabled] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(false);
  const [copied, setCopied] = useState(false);

  const variants = ["filled", "outlined", "standard", "tonal"] as const;
  const sizes = ["xs", "s", "m", "l", "xl"] as const;
  const shapes = ["round", "square"] as const;
  const widths = ["narrow", "default", "wide"] as const;

  const generateCode = () => {
    let props = `icon={<Star />} variant="${variant}"`;
    if (size !== "m") {
      props += ` size="${size}"`;
    }
    if (shape !== "round") {
      props += ` shape="${shape}"`;
    }
    if (width !== "default") {
      props += ` width="${width}"`;
    }
    if (buttonType === "toggle") {
      props += ` buttonType="toggle" data-state="${toggleChecked ? "checked" : "unchecked"}"`;
    }
    if (disabled) {
      props += " disabled";
    }
    return `<IconButton ${props} />`;
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Icon Button Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Interactive playground and preview of all variants, sizes, shapes,
            and widths for the Material Design 3 Expressive icon button
            component.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Playground</CardTitle>
          <CardDescription>
            Configure icon button props and see a live preview with generated
            code snippet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Label htmlFor="variant-select">Variant</Label>
                <Select onValueChange={setVariant} value={variant}>
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
              <div className="space-y-2">
                <Label htmlFor="size-select">Size</Label>
                <Select onValueChange={setSize} value={size}>
                  <SelectTrigger id="size-select">
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
              <div className="space-y-2">
                <Label htmlFor="shape-select">Shape</Label>
                <Select onValueChange={setShape} value={shape}>
                  <SelectTrigger id="shape-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shapes.map((sh) => (
                      <SelectItem key={sh} value={sh}>
                        {sh}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="width-select">Width</Label>
                <Select onValueChange={setWidth} value={width}>
                  <SelectTrigger id="width-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {widths.map((w) => (
                      <SelectItem key={w} value={w}>
                        {w}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={buttonType === "toggle"}
                  id="button-type"
                  onCheckedChange={(checked) =>
                    setButtonType(checked ? "toggle" : "default")
                  }
                />
                <Label htmlFor="button-type">Toggle Button</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={disabled}
                  id="disabled"
                  onCheckedChange={(checked) => setDisabled(checked === true)}
                />
                <Label htmlFor="disabled">Disabled</Label>
              </div>
              {buttonType === "toggle" && (
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={toggleChecked}
                    id="toggle-checked"
                    onCheckedChange={setToggleChecked}
                  />
                  <Label htmlFor="toggle-checked">Checked</Label>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <Label>Preview</Label>
                <div className="flex justify-center rounded border p-4">
                  <IconButton
                    buttonType={buttonType}
                    data-state={
                      buttonType === "toggle"
                        ? toggleChecked
                          ? "checked"
                          : "unchecked"
                        : undefined
                    }
                    disabled={disabled}
                    icon={<Star />}
                    onClick={
                      buttonType === "toggle"
                        ? () => setToggleChecked(!toggleChecked)
                        : undefined
                    }
                    shape={shape as "round" | "square"}
                    size={size as "xs" | "s" | "m" | "l" | "xl"}
                    variant={
                      variant as "filled" | "outlined" | "standard" | "tonal"
                    }
                    width={width as "narrow" | "default" | "wide"}
                  />
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
