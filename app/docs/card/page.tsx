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
import { Button } from "@/components/ui/m3e/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/m3e/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CardDocs() {
  const [variant, setVariant] = useState("elevated");
  const [copied, setCopied] = useState(false);

  const variants = ["elevated", "filled", "outlined"] as const;

  const generateCode = () => {
    const props = `variant="${variant}"`;
    return `<Card ${props}>
  <CardMedia>
    <img src="..." alt="Media" />
  </CardMedia>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardSubTitle>Card Subtitle</CardSubTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`;
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <DocsCard>
        <DocsCardHeader className="text-center">
          <DocsCardTitle className="font-bold text-4xl">
            M3 Card Component Documentation
          </DocsCardTitle>
          <DocsCardDescription className="text-lg">
            Interactive playground and preview of all variants for the Material
            Design 3 Expressive card component.
          </DocsCardDescription>
        </DocsCardHeader>
      </DocsCard>

      <DocsCard>
        <DocsCardHeader>
          <DocsCardTitle>Interactive Playground</DocsCardTitle>
          <DocsCardDescription>
            Configure card props and see a live preview with generated code
            snippet.
          </DocsCardDescription>
        </DocsCardHeader>
        <DocsCardContent>
          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
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
              <div className="flex justify-center rounded border bg-surface-container-lowest p-8">
                <Card className="w-full max-w-sm" variant={variant as any}>
                  <CardMedia rounded>
                    <img
                      alt="Card Media"
                      src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
                    />
                  </CardMedia>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardSubTitle>Card Subtitle</CardSubTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>This is a {variant} card.</p>
                  </CardContent>
                  <CardFooter className="justify-end gap-2" withDivider>
                    <Button variant="text">Cancel</Button>
                    <Button>Action</Button>
                  </CardFooter>
                </Card>
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
