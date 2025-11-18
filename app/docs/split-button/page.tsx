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
import { Label } from "@/components/ui/label";
import { MenuItem } from "@/components/ui/m3e/menu";
import {
  SplitButton,
  SplitButtonLeading,
  SplitButtonMenu,
  SplitButtonTrailing,
} from "@/components/ui/m3e/split-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SplitButtonDocs() {
  const [variant, setVariant] = useState("filled");
  const [size, setSize] = useState("m");
  const [copied, setCopied] = useState(false);

  const variants = ["filled", "outlined", "tonal", "elevated"] as const;
  const sizes = ["xs", "s", "m", "l", "xl"] as const;

  const generateCode = () => {
    let props = `variant="${variant}"`;
    if (size !== "m") {
      props += ` size="${size}"`;
    }
    return `<SplitButton ${props}>
  <SplitButtonLeading>Action</SplitButtonLeading>
  <SplitButtonTrailing />
  <SplitButtonMenu>
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
  </SplitButtonMenu>
</SplitButton>`;
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Split Button Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Interactive playground and preview of all variants and sizes for the
            Material Design 3 Expressive split button component.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Playground</CardTitle>
          <CardDescription>
            Configure split button props and see a live preview with generated
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
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="flex justify-center rounded border p-4">
                  <SplitButton
                    size={size as "xs" | "s" | "m" | "l" | "xl"}
                    variant={
                      variant as "filled" | "outlined" | "tonal" | "elevated"
                    }
                  >
                    <SplitButtonLeading>
                      <Star />
                      Action
                    </SplitButtonLeading>
                    <SplitButtonTrailing />
                    <SplitButtonMenu>
                      <MenuItem>Option 1</MenuItem>
                      <MenuItem>Option 2</MenuItem>
                      <MenuItem>Option 3</MenuItem>
                    </SplitButtonMenu>
                  </SplitButton>
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
