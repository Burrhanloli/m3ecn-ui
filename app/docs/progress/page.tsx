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
  const [thickness, setThickness] = useState<"default" | "thick">("default");
  const [fourColor, setFourColor] = useState(false);
  const [value, setValue] = useState(DEFAULT_VALUE);
  const [copied, setCopied] = useState(false);

  const thicknesses = ["default", "thick"] as const;

  const generateCode = () => {
    let props = `thickness="${thickness}"`;
    if (fourColor) {
      props += " fourColor={true}";
    }
    return `<Progress value={${value}} max={100}>\n  <Progress.Linear ${props} />\n</Progress>`;
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
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-wrap gap-4">
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
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={fourColor}
                  id="four-color"
                  onCheckedChange={(checked) => setFourColor(checked === true)}
                />
                <Label htmlFor="four-color">Four Color</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value-input">Value</Label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="value-input"
                  max="100"
                  min="0"
                  onChange={(e) => setValue(Number(e.target.value))}
                  type="number"
                  value={value}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-4">
                <Label>Preview</Label>
                <Progress aria-label="Progress preview" max={100} value={value}>
                  <Progress.Linear
                    fourColor={fourColor}
                    thickness={thickness}
                  />
                </Progress>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label>Code</Label>
                  <UIButton
                    onClick={() => {
                      navigator.clipboard.writeText(generateCode());
                      setCopied(true);
                      setTimeout(() => setCopied(false), COPY_TIMEOUT);
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
