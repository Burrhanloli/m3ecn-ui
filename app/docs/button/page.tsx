"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/registry/m3e/ui/button/button";

export default function ButtonDocs() {
  const [toggleChecked, setToggleChecked] = useState(false);

  const variants = [
    "filled",
    "outlined",
    "text",
    "tonal",
    "elevated",
    "toggle",
  ] as const;
  const sizes = ["xs", "s", "m", "l", "xl", "icon"] as const;
  const shapes = ["round", "square"] as const;

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Button Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Preview of all variants, sizes, and shapes for the Material Design 3
            Expressive button component.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>
            Explore the different button variants available in M3 Expressive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {variants.map((variant) => (
              <div className="space-y-2 rounded border p-4" key={variant}>
                <h3 className="font-medium capitalize">{variant}</h3>
                <Button variant={variant}>Sample {variant} Button</Button>
                {variant === "toggle" && (
                  <div className="space-y-1">
                    <Button
                      data-state={toggleChecked ? "checked" : "unchecked"}
                      onClick={() => setToggleChecked(!toggleChecked)}
                      variant="toggle"
                    >
                      Toggle {toggleChecked ? "Checked" : "Unchecked"}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
          <CardDescription>
            Different sizes from XS to XL, plus icon size.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sizes.map((size) => (
              <div className="space-y-2 rounded border p-4" key={size}>
                <h3 className="font-medium capitalize">{size}</h3>
                <Button size={size}>Size {size}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Shapes</CardTitle>
          <CardDescription>
            Round (fully rounded) and Square shapes with dynamic corner radii.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {shapes.map((shape) => (
              <div className="space-y-2 rounded border p-4" key={shape}>
                <h3 className="font-medium capitalize">{shape}</h3>
                <Button shape={shape}>Shape {shape}</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Ripple Effect</CardTitle>
          <CardDescription>
            Buttons now include a ripple effect on click using Framer Motion.
            The ripple originates from the click position and animates outward.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {variants.map((variant) => (
              <div
                className="space-y-2 rounded border p-4"
                key={`ripple-${variant}`}
              >
                <h3 className="font-medium capitalize">{variant} Ripple</h3>
                <Button variant={variant}>Click for Ripple</Button>
                <Button enableRipple={false} variant={variant}>
                  No Ripple
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>All Combinations</CardTitle>
          <CardDescription>
            A comprehensive grid showing every possible combination of variant,
            size, and shape, grouped by variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {variants.map((variant) => (
            <div className="mb-8" key={variant}>
              <h3 className="mb-4 border-b pb-2 font-semibold text-xl capitalize">
                {variant}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sizes.map((size) =>
                  shapes.map((shape) => (
                    <div
                      className="space-y-1 rounded border p-2"
                      key={`${variant}-${size}-${shape}`}
                    >
                      <Button shape={shape} size={size} variant={variant}>
                        {size} {shape}
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
