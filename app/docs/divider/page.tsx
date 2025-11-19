"use client";

import { Check, Copy } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Divider } from "@/components/ui/m3e/divider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DividerDocs() {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal"
  );
  const [variant, setVariant] = useState<"full" | "inset" | "middle">("full");
  const [copied, setCopied] = useState(false);

  const orientations = ["horizontal", "vertical"] as const;
  const variants = ["full", "inset", "middle"] as const;

  const generateCode = () =>
    `<Divider orientation="${orientation}" variant="${variant}" />`;

  return (
    <div className="container mx-auto space-y-8 p-8">
      <DocsCard>
        <DocsCardHeader className="text-center">
          <DocsCardTitle className="font-bold text-4xl">
            M3 Divider Component
          </DocsCardTitle>
          <DocsCardDescription className="text-lg">
            A divider is a thin line that groups content in lists and layouts.
          </DocsCardDescription>
        </DocsCardHeader>
      </DocsCard>

      <DocsCard>
        <DocsCardHeader>
          <DocsCardTitle>Interactive Playground</DocsCardTitle>
          <DocsCardDescription>
            Configure divider props and see a live preview.
          </DocsCardDescription>
        </DocsCardHeader>
        <DocsCardContent>
          <div className="grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Orientation</Label>
                <Select
                  onValueChange={(v) => setOrientation(v as any)}
                  value={orientation}
                >
                  <SelectTrigger>
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
                <Label>Variant</Label>
                <Select
                  onValueChange={(v) => setVariant(v as any)}
                  value={variant}
                >
                  <SelectTrigger>
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
            </div>

            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="flex h-64 items-center justify-center rounded border bg-surface-container-lowest p-8">
                <div
                  className={
                    orientation === "vertical"
                      ? "flex h-full w-full items-center justify-center"
                      : "w-full"
                  }
                >
                  {orientation === "vertical" ? (
                    <div className="flex h-full items-center gap-4">
                      <div>Left</div>
                      <Divider orientation="vertical" variant={variant} />
                      <div>Right</div>
                    </div>
                  ) : (
                    <div className="w-full space-y-4">
                      <div>Top</div>
                      <Divider orientation="horizontal" variant={variant} />
                      <div>Bottom</div>
                    </div>
                  )}
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
                    setTimeout(() => setCopied(false), 2000);
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
    </div>
  );
}
