"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MenuItem } from "@/components/ui/m3e/menu";
import {
  SplitButton,
  SplitButtonLeading,
  SplitButtonMenu,
  SplitButtonTrailing,
} from "@/components/ui/m3e/split-button";

export default function SplitButtonDocs() {
  const variants = ["filled", "outlined", "tonal", "elevated"] as const;
  const sizes = ["xs", "s", "m", "l", "xl"] as const;

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Split Button Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Preview of all variants, sizes, and shapes for the Material Design 3
            Expressive split button component.
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {variants.map((variant) => {
              const descriptions = {
                filled:
                  "Filled buttons have the highest emphasis and are used for primary actions that require immediate attention.",
                outlined:
                  "Outlined buttons have medium emphasis and are used for secondary actions or important actions that aren't primary.",
                tonal:
                  "Tonal buttons have medium emphasis with a subtle background color, providing an alternative to filled buttons in less prominent scenarios.",
                elevated:
                  "Elevated buttons include a shadow for depth and are used when buttons need to stand out on layered surfaces.",
              };
              return (
                <div className="space-y-3 rounded border p-4" key={variant}>
                  <h3 className="font-medium capitalize">{variant}</h3>
                  <SplitButton variant={variant}>
                    <SplitButtonLeading>Action</SplitButtonLeading>
                    <SplitButtonTrailing />
                    <SplitButtonMenu>
                      <MenuItem>Option 1</MenuItem>
                      <MenuItem>Option 2</MenuItem>
                      <MenuItem>Option 3</MenuItem>
                    </SplitButtonMenu>
                  </SplitButton>
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
          <CardDescription>Different sizes from XS to XL.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sizes.map((size) => (
              <div className="space-y-2 rounded border p-4" key={size}>
                <h3 className="font-medium capitalize">{size}</h3>
                <SplitButton size={size}>
                  <SplitButtonLeading>Size {size}</SplitButtonLeading>
                  <SplitButtonTrailing />
                  <SplitButtonMenu>
                    <MenuItem>Option 1</MenuItem>
                    <MenuItem>Option 2</MenuItem>
                  </SplitButtonMenu>
                </SplitButton>
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {sizes.map((size) => (
                  <div
                    className="space-y-1 rounded border p-2"
                    key={`${variant}-${size}`}
                  >
                    <SplitButton size={size} variant={variant}>
                      <SplitButtonLeading>{size}</SplitButtonLeading>
                      <SplitButtonTrailing />
                      <SplitButtonMenu>
                        <MenuItem>Opt 1</MenuItem>
                        <MenuItem>Opt 2</MenuItem>
                      </SplitButtonMenu>
                    </SplitButton>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
