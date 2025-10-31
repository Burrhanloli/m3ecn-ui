"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/m3e/progress";

export default function ProgressDocs() {
  const [linearProgress, setLinearProgress] = useState(66);
  const [circularProgress, setCircularProgress] = useState(45);

  const sizes = ["sm", "md", "lg"] as const;
  const types = ["linear", "circular"] as const;
  const _variants = ["flat", "wavy"] as const;
  const _thicknesses = ["default", "thick"] as const;

  useEffect(() => {
    const interval = setInterval(() => {
      setLinearProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      setCircularProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
          <CardTitle>Types</CardTitle>
          <CardDescription>
            Progress indicators come in linear and circular variants for
            different use cases.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {types.map((type) => {
              const descriptions = {
                linear:
                  "Linear progress bars are horizontal indicators ideal for forms, file uploads, and processes with clear start/end points.",
                circular:
                  "Circular progress indicators are perfect for loading states, spinners, and compact spaces where vertical space is limited.",
              };
              return (
                <div className="space-y-3 rounded border p-4" key={type}>
                  <h3 className="font-medium capitalize">{type}</h3>
                  <div className="space-y-2">
                    {type === "linear" ? (
                      <Progress
                        aria-label={`${type} progress example`}
                        max={100}
                        value={66}
                      >
                        <Progress.Linear />
                      </Progress>
                    ) : (
                      <Progress
                        aria-label={`${type} progress example`}
                        max={100}
                        value={66}
                      >
                        <Progress.Circular size="md" />
                      </Progress>
                    )}
                    <p className="text-muted-foreground text-sm">
                      {descriptions[type]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Linear Progress Variants</CardTitle>
          <CardDescription>
            Material 3 Expressive variants with flat and wavy styles, plus
            thickness options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Flat vs Wavy</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Flat Default</h4>
                  <Progress
                    aria-label="Flat default progress"
                    max={100}
                    value={66}
                  >
                    <Progress.Linear thickness="default" />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Standard flat progress with 4dp height
                  </p>
                </div>
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Wavy Default</h4>
                  <Progress
                    aria-label="Wavy default progress"
                    max={100}
                    value={66}
                  >
                    <Progress.Linear thickness="default" />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Wavy progress with 10dp total height
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Thickness Variants</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Flat Thick</h4>
                  <Progress
                    aria-label="Flat thick progress"
                    max={100}
                    value={66}
                  >
                    <Progress.Linear thickness="thick" />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Flat progress with 8dp height
                  </p>
                </div>
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Wavy Thick</h4>
                  <Progress
                    aria-label="Wavy thick progress"
                    max={100}
                    value={66}
                  >
                    <Progress.Linear thickness="thick" />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Wavy progress with 14dp total height
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Four-Color Animation</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Linear Four-Color</h4>
                  <Progress aria-label="Four-color linear progress">
                    <Progress.Linear fourColor={true} />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Indeterminate progress with color cycling
                  </p>
                </div>
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Circular Four-Color</h4>
                  <div className="text-center">
                    <Progress aria-label="Four-color circular progress">
                      <Progress.Circular fourColor={true} size="md" />
                    </Progress>
                  </div>
                  <p className="text-center text-muted-foreground text-sm">
                    Circular spinner with color cycling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Linear Progress</CardTitle>
          <CardDescription>
            Horizontal progress bar with support for buffer indicators and
            accessibility features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Basic Examples</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Determinate (66%)</h4>
                  <Progress
                    aria-label="File upload progress"
                    max={100}
                    value={66}
                  >
                    <Progress.Linear />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Shows 66% completion with stop indicator
                  </p>
                </div>
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Indeterminate</h4>
                  <Progress aria-label="Loading content">
                    <Progress.Linear />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Continuous animation for unknown duration
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Animated Progress</h3>
              <div className="space-y-2 rounded border p-4">
                <label className="font-medium text-sm">
                  Auto-updating: {linearProgress}%
                </label>
                <Progress
                  aria-label="Auto-updating progress"
                  max={100}
                  value={linearProgress}
                >
                  <Progress.Linear />
                </Progress>
                <p className="text-muted-foreground text-sm">
                  Progress updates automatically every 100ms
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Circular Progress</CardTitle>
          <CardDescription>
            Circular spinner indicators with size variants and smooth rotation
            animations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Size Variants</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {sizes.map((size) => (
                  <div className="space-y-2 rounded border p-4" key={size}>
                    <h4 className="font-medium capitalize">{size}</h4>
                    <div className="space-y-2">
                      <div className="text-center">
                        <Progress
                          aria-label={`Task progress ${size}`}
                          max={100}
                          value={size === "sm" ? 25 : size === "md" ? 50 : 75}
                        >
                          <Progress.Circular size={size} />
                        </Progress>
                      </div>
                      <p className="text-center text-muted-foreground text-sm">
                        {size === "sm" && "Small (24dp) - 25%"}
                        {size === "md" && "Medium (48dp) - 50%"}
                        {size === "lg" && "Large (72dp) - 75%"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Indeterminate Sizes</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {sizes.map((size) => (
                  <div className="space-y-2 rounded border p-4" key={size}>
                    <h4 className="font-medium capitalize">{size}</h4>
                    <div className="text-center">
                      <Progress aria-label={`Loading ${size}`}>
                        <Progress.Circular size={size} />
                      </Progress>
                    </div>
                    <p className="text-center text-muted-foreground text-sm">
                      Continuous rotation animation
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Animated Circular</h3>
              <div className="space-y-2 rounded border p-4">
                <label className="font-medium text-sm">
                  Auto-updating: {circularProgress}%
                </label>
                <div className="text-center">
                  <Progress
                    aria-label={`Auto-updating circular progress ${circularProgress}%`}
                    max={100}
                    value={circularProgress}
                  >
                    <Progress.Circular size="md" />
                  </Progress>
                </div>
                <p className="text-center text-muted-foreground text-sm">
                  {circularProgress}% completion
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Progress with Labels</CardTitle>
          <CardDescription>
            Accessible progress indicators with descriptive text labels for
            screen readers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded border p-4">
              <h3 className="font-medium">Linear with Label</h3>
              <Progress aria-label="Installation progress" max={100} value={33}>
                <Progress.Linear />
                <Progress.Label>Installing... 33%</Progress.Label>
              </Progress>
              <p className="text-muted-foreground text-sm">
                Label describes the current process state
              </p>
            </div>
            <div className="space-y-2 rounded border p-4">
              <h3 className="font-medium">Circular with Label</h3>
              <Progress aria-label="Connecting to server">
                <Progress.Circular size="md" />
                <Progress.Label>Connecting to server...</Progress.Label>
              </Progress>
              <p className="text-muted-foreground text-sm">
                Label provides context for assistive technology
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Custom Styling</CardTitle>
          <CardDescription>
            Progress components support custom styling through className props
            for both the track and indicator elements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded border p-4">
              <h3 className="font-medium">Custom Colors</h3>
              <Progress
                aria-label="Custom styled progress"
                max={100}
                value={60}
              >
                <Progress.Linear
                  className="bg-red-100"
                  indicatorClassName="bg-red-500"
                />
              </Progress>
              <p className="text-muted-foreground text-sm">
                Override default M3 colors with custom classes
              </p>
            </div>
            <div className="space-y-2 rounded border p-4">
              <h3 className="font-medium">Custom Stroke Width</h3>
              <Progress aria-label="Custom stroke width" max={100} value={70}>
                <Progress.Circular size="md" strokeWidth={8} />
              </Progress>
              <p className="text-muted-foreground text-sm">
                Override default stroke width (4dp) with custom value
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Linear Progress with Stop Indicator</CardTitle>
          <CardDescription>
            Linear progress indicators with stop indicators at the end for
            better visibility and accessibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Stop Indicator Examples</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">25% Progress</h4>
                  <Progress aria-label="Progress at 25%" max={100} value={25}>
                    <Progress.Linear />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Stop indicator positioned at 25% mark
                  </p>
                </div>
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">75% Progress</h4>
                  <Progress aria-label="Progress at 75%" max={100} value={75}>
                    <Progress.Linear />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    Stop indicator positioned at 75% mark
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-lg">Thickness Variants</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Default Thickness</h4>
                  <Progress
                    aria-label="Default thickness progress"
                    max={100}
                    value={60}
                  >
                    <Progress.Linear thickness="default" />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    4dp track with 4dp stop indicator
                  </p>
                </div>
                <div className="space-y-2 rounded border p-4">
                  <h4 className="font-medium">Thick Progress</h4>
                  <Progress aria-label="Thick progress" max={100} value={60}>
                    <Progress.Linear thickness="thick" />
                  </Progress>
                  <p className="text-muted-foreground text-sm">
                    8dp track with 8dp stop indicator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Accessibility Features</CardTitle>
          <CardDescription>
            Built-in ARIA support and semantic HTML for screen readers and
            keyboard navigation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2 rounded border p-4">
              <h3 className="font-medium">ARIA Attributes</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <code className="rounded bg-muted px-2 py-1">
                    role="progressbar"
                  </code>
                  <span className="text-muted-foreground">
                    {" "}
                    - Identifies element as progress bar
                  </span>
                </div>
                <div className="text-sm">
                  <code className="rounded bg-muted px-2 py-1">
                    aria-valuenow
                  </code>
                  <span className="text-muted-foreground">
                    {" "}
                    - Current value (determinate only)
                  </span>
                </div>
                <div className="text-sm">
                  <code className="rounded bg-muted px-2 py-1">
                    aria-valuemin/max
                  </code>
                  <span className="text-muted-foreground">
                    {" "}
                    - Min/max range values
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2 rounded border p-4">
              <h3 className="font-medium">Visual Accessibility</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <strong>Stop Indicator:</strong> Small circle at progress end
                  for better visibility
                </div>
                <div className="text-sm">
                  <strong>High Contrast:</strong> Uses M3 color tokens for
                  proper contrast
                </div>
                <div className="text-sm">
                  <strong>Focus States:</strong> Visible focus rings for
                  keyboard navigation
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
