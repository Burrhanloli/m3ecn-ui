"use client";

import { Check, Copy, Plus, Star } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button as UIButton } from "@/components/ui/button";
import {
  Card as DocsCard,
  CardContent as DocsCardContent,
  CardDescription as DocsCardDescription,
  CardHeader as DocsCardHeader,
  CardTitle as DocsCardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Fab } from "@/components/ui/m3e/fab";
import { ExtendedFab } from "@/components/ui/m3e/extended-fab";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FabDocs() {
  // Regular FAB state
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("standard");
  const [copied, setCopied] = useState(false);

  // Extended FAB state
  const [extendedVariant, setExtendedVariant] = useState("primary");
  const [extendedSize, setExtendedSize] = useState("small");
  const [iconPosition, setIconPosition] = useState("leading");
  const [labelText, setLabelText] = useState("Create");
  const [extendedCopied, setExtendedCopied] = useState(false);

  const variants = ["primary", "secondary", "tertiary"] as const;
  const sizes = ["standard", "medium", "large"] as const;
  const extendedSizes = ["small", "medium", "large"] as const;
  const iconPositions = ["leading", "trailing"] as const;

  const generateCode = () => {
    const props = `variant="${variant}" size="${size}"`;
    return `<Fab ${props} icon={<Plus />} />`;
  };

  const generateExtendedCode = () => {
    const props = `variant="${extendedVariant}" size="${extendedSize}" iconPosition="${iconPosition}"`;
    return `<ExtendedFab ${props} icon={<Star />}>\n  ${labelText}\n</ExtendedFab>`;
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <DocsCard>
        <DocsCardHeader className="text-center">
          <DocsCardTitle className="font-bold text-4xl">
            M3 FAB Component Documentation
          </DocsCardTitle>
          <DocsCardDescription className="text-lg">
            Interactive playground and preview of all variants for Material
            Design 3 Expressive floating action button and extended FAB
            components.
          </DocsCardDescription>
        </DocsCardHeader>
      </DocsCard>

      {/* Regular FAB Section */}
      <DocsCard>
        <DocsCardHeader>
          <DocsCardTitle>Regular FAB</DocsCardTitle>
          <DocsCardDescription>
            Standard floating action button with icon only. Configure FAB props
            and see a live preview with generated code snippet.
          </DocsCardDescription>
        </DocsCardHeader>
        <DocsCardContent>
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-2 gap-4">
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
              <Label>Preview</Label>
              <div className="flex justify-center rounded border bg-surface-container-lowest p-12">
                <Fab
                  icon={<Plus />}
                  size={size as any}
                  variant={variant as any}
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
        </DocsCardContent>
      </DocsCard>

      {/* Extended FAB Section */}
      <DocsCard>
        <DocsCardHeader>
          <DocsCardTitle>Extended FAB</DocsCardTitle>
          <DocsCardDescription>
            Extended floating action button with icon and text label. Supports
            expand/collapse animation and configurable icon position.
          </DocsCardDescription>
        </DocsCardHeader>
        <DocsCardContent>
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="extended-variant-select">Variant</Label>
                <Select
                  onValueChange={setExtendedVariant}
                  value={extendedVariant}
                >
                  <SelectTrigger id="extended-variant-select">
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
                <Label htmlFor="extended-size-select">Size</Label>
                <Select
                  onValueChange={setExtendedSize}
                  value={extendedSize}
                >
                  <SelectTrigger id="extended-size-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {extendedSizes.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon-position-select">Icon Position</Label>
                <Select
                  onValueChange={setIconPosition}
                  value={iconPosition}
                >
                  <SelectTrigger id="icon-position-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconPositions.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="label-text-input">Label Text</Label>
                <Input
                  id="label-text-input"
                  onChange={(e) => setLabelText(e.target.value)}
                  placeholder="Enter label text"
                  value={labelText}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="flex justify-center rounded border bg-surface-container-lowest p-12">
                <ExtendedFab
                  icon={<Star />}
                  iconPosition={iconPosition as any}
                  size={extendedSize as any}
                  variant={extendedVariant as any}
                >
                  {labelText}
                </ExtendedFab>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label>Code</Label>
                <UIButton
                  onClick={() => {
                    navigator.clipboard.writeText(generateExtendedCode());
                    setExtendedCopied(true);
                    setTimeout(() => setExtendedCopied(false), 5000);
                  }}
                  size="sm"
                  variant="outline"
                >
                  {extendedCopied ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {extendedCopied ? "Copied" : "Copy"}
                </UIButton>
              </div>
              <SyntaxHighlighter
                className="rounded"
                language="jsx"
                style={oneDark}
              >
                {generateExtendedCode()}
              </SyntaxHighlighter>
            </div>
          </div>
        </DocsCardContent>
      </DocsCard>
    </div>
  );
}
