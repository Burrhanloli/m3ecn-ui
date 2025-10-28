"use client";

import { Heart, Star } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconButton } from "@/components/ui/m3e/icon-button";

export default function IconButtonDocs() {
  const [toggleChecked, setToggleChecked] = useState(false);

  const variants = ["filled", "outlined", "standard", "tonal"] as const;
  const sizes = ["xs", "s", "m", "l", "xl"] as const;
  const shapes = ["round", "square"] as const;
  const widths = ["narrow", "default", "wide"] as const;
  const toggleVariants = ["filled", "outlined", "tonal"] as const;

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Icon Button Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Preview of all variants, sizes, shapes, and widths for the Material
            Design 3 Expressive icon button component.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variants</CardTitle>
          <CardDescription>
            Explore the different icon button variants available in M3
            Expressive.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {variants.map((variant) => {
              const descriptions = {
                filled:
                  "Filled icon buttons have the highest emphasis and are used for primary actions.",
                outlined:
                  "Outlined icon buttons have medium emphasis with a border.",
                standard:
                  "Standard icon buttons have no background, used for optional actions.",
                tonal:
                  "Tonal icon buttons have a subtle background color for medium emphasis.",
              };
              return (
                <div className="space-y-3 rounded border p-4" key={variant}>
                  <h3 className="font-medium capitalize">{variant}</h3>
                  <IconButton icon={<Star />} variant={variant} />
                  <p className="text-muted-foreground text-sm">
                    {descriptions[variant]}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
          <CardDescription>
            Different sizes from XS to XL, with appropriate touch targets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {sizes.map((size) => (
              <div className="space-y-2 rounded border p-4" key={size}>
                <h3 className="font-medium capitalize">{size}</h3>
                <IconButton icon={<Star />} size={size} />
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
                <IconButton icon={<Star />} shape={shape} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Widths</CardTitle>
          <CardDescription>
            Narrow, Default, and Wide spacing around the icon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {widths.map((width) => (
              <div className="space-y-2 rounded border p-4" key={width}>
                <h3 className="font-medium capitalize">{width}</h3>
                <IconButton icon={<Star />} shape="square" width={width} />
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
            Icon buttons include a ripple effect on click using Framer Motion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {variants.map((variant) => (
              <div
                className="space-y-2 rounded border p-4"
                key={`ripple-${variant}`}
              >
                <h3 className="font-medium capitalize">{variant} Ripple</h3>
                <IconButton icon={<Star />} variant={variant} />
                <IconButton
                  enableRipple={false}
                  icon={<Star />}
                  variant={variant}
                />
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
            A grid showing combinations of variant, size, shape, and width.
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
                  shapes.map((shape) =>
                    widths.map((width) => (
                      <div
                        className="space-y-1 rounded border p-2"
                        key={`${variant}-${size}-${shape}-${width}`}
                      >
                        <IconButton
                          icon={<Star />}
                          shape={shape}
                          size={size}
                          variant={variant}
                          width={width}
                        />
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Toggle Icon Buttons</CardTitle>
          <CardDescription>
            Toggle buttons with unselected and selected states.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {toggleVariants.map((variant) => (
              <div className="space-y-2 rounded border p-4" key={variant}>
                <h3 className="font-medium capitalize">{variant} Toggle</h3>
                <IconButton
                  buttonType="toggle"
                  data-state={toggleChecked ? "checked" : "unchecked"}
                  icon={
                    <Heart fill={toggleChecked ? "currentColor" : "none"} />
                  }
                  onClick={() => setToggleChecked(!toggleChecked)}
                  variant={variant}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
