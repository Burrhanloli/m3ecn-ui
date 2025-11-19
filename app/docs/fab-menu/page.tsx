"use client";

import { Check, Copy, Edit, Plus, Share, Star, X } from "lucide-react";
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
import {
  FabMenu,
  FabMenuContent,
  FabMenuItem,
  FabMenuTrigger,
} from "@/components/ui/m3e/fab-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FabMenuDocs() {
  const [variant, setVariant] = useState("primary");
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const variants = ["primary", "secondary", "tertiary"] as const;

  const generateCode =
    () => `<FabMenu variant="${variant}" open={isOpen} onOpenChange={setIsOpen}>
  <FabMenuTrigger
    icon={<Plus />}
    iconWhenOpen={<X />}
  />
  <FabMenuContent>
    <FabMenuItem icon={<Edit />} label="Edit" onClick={() => console.log('Edit')} />
    <FabMenuItem icon={<Share />} label="Share" onClick={() => console.log('Share')} />
    <FabMenuItem icon={<Star />} label="Favorite" onClick={() => console.log('Favorite')} />
  </FabMenuContent>
</FabMenu>`;

  return (
    <div className="container mx-auto space-y-8 p-8">
      <DocsCard>
        <DocsCardHeader className="text-center">
          <DocsCardTitle className="font-bold text-4xl">
            M3 FAB Menu Component Documentation
          </DocsCardTitle>
          <DocsCardDescription className="text-lg">
            Interactive playground and preview of Material Design 3 Expressive
            FAB Menu component. Display 2-6 related actions from a primary FAB
            with staggered animations.
          </DocsCardDescription>
        </DocsCardHeader>
      </DocsCard>

      {/* Interactive Playground */}
      <DocsCard>
        <DocsCardHeader>
          <DocsCardTitle>Interactive Playground</DocsCardTitle>
          <DocsCardDescription>
            Configure FAB Menu props and see a live preview with generated code
            snippet. The menu expands upward with staggered animations.
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
            </div>

            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="flex min-h-[400px] items-end justify-center rounded border bg-surface-container-lowest p-12">
                <FabMenu
                  onOpenChange={setIsOpen}
                  open={isOpen}
                  variant={variant as any}
                >
                  <FabMenuTrigger icon={<Plus />} iconWhenOpen={<X />} />
                  <FabMenuContent>
                    <FabMenuItem
                      icon={<Edit />}
                      label="Edit"
                      onClick={() => {}}
                    />
                    <FabMenuItem
                      icon={<Share />}
                      label="Share"
                      onClick={() => {}}
                    />
                    <FabMenuItem
                      icon={<Star />}
                      label="Favorite"
                      onClick={() => {}}
                    />
                  </FabMenuContent>
                </FabMenu>
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
    </div>
  );
}
