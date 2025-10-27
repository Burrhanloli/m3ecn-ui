"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/m3e/button";
import {
  ButtonGroup,
  ButtonGroupButton,
} from "@/components/ui/m3e/button-groups";

export default function ButtonGroupsDocs() {
  const [singleSelected, setSingleSelected] = useState<string | null>(null);
  const [multiSelected, setMultiSelected] = useState<string[]>([]);

  const handleSingleChange = (value: string | string[] | null) =>
    setSingleSelected(value as string | null);
  const handleMultiChange = (value: string | string[] | null) =>
    setMultiSelected(value as string[]);

  const types = ["standard", "connected"] as const;
  const sizes = ["xs", "s", "m", "l", "xl"] as const;
  const shapes = ["round", "square"] as const;
  const selections = ["single", "multi"] as const;
  const orientations = ["horizontal", "vertical"] as const;

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Button Groups Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Preview of all variants for Material Design 3 button groups.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Types</CardTitle>
          <CardDescription>
            Standard (variable padding) vs Connected (fixed 2dp padding).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {types.map((type) => (
              <div className="space-y-2 rounded border p-4" key={type}>
                <h3 className="font-medium capitalize">{type}</h3>
                <ButtonGroup type={type}>
                  <Button>Button 1</Button>
                  <Button>Button 2</Button>
                  <Button>Button 3</Button>
                </ButtonGroup>
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
            Different sizes with varying padding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sizes.map((size) => (
              <div className="space-y-2 rounded border p-4" key={size}>
                <h3 className="font-medium capitalize">{size}</h3>
                <ButtonGroup size={size}>
                  <Button>Size {size}</Button>
                  <Button>Button 1</Button>
                  <Button>Button 2</Button>
                </ButtonGroup>
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
            Round and square shapes (applied to buttons).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {shapes.map((shape) => (
              <div className="space-y-2 rounded border p-4" key={shape}>
                <h3 className="font-medium capitalize">{shape}</h3>
                <ButtonGroup shape={shape}>
                  <Button>Shape {shape}</Button>
                  <Button>Button 1</Button>
                  <Button>Button 2</Button>
                </ButtonGroup>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Selection</CardTitle>
          <CardDescription>
            Single and multi-select with state management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {selections.map((selection) => (
              <div className="space-y-2 rounded border p-4" key={selection}>
                <h3 className="font-medium capitalize">{selection}</h3>
                <ButtonGroup
                  onChange={
                    selection === "single"
                      ? handleSingleChange
                      : handleMultiChange
                  }
                  selection={selection}
                  value={
                    selection === "single" ? singleSelected : multiSelected
                  }
                >
                  <ButtonGroupButton value="1">
                    <Button >Option 1</Button>
                  </ButtonGroupButton>
                  <ButtonGroupButton value="2">
                    <Button >Option 2</Button>
                  </ButtonGroupButton>
                  <ButtonGroupButton value="3">
                    <Button >Option 3</Button>
                  </ButtonGroupButton>
                </ButtonGroup>
                <p className="text-muted-foreground text-sm">
                  Selected:{" "}
                  {selection === "single"
                    ? singleSelected || "None"
                    : multiSelected.join(", ") || "None"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Orientation</CardTitle>
          <CardDescription>Horizontal and vertical layouts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {orientations.map((orientation) => (
              <div className="space-y-2 rounded border p-4" key={orientation}>
                <h3 className="font-medium capitalize">{orientation}</h3>
                <ButtonGroup orientation={orientation}>
                  <Button>Button 1</Button>
                  <Button>Button 2</Button>
                  <Button>Button 3</Button>
                </ButtonGroup>
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
            Comprehensive grid of type, size, shape, selection, orientation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {types.map((type) => (
            <div className="mb-8" key={type}>
              <h3 className="mb-4 border-b pb-2 font-semibold text-xl capitalize">
                {type}
              </h3>
              {sizes.map((size) => (
                <div className="mb-4" key={size}>
                  <h4 className="mb-2 font-medium capitalize">{size}</h4>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {shapes.map((shape) => (
                      <div className="space-y-2 rounded border p-2" key={shape}>
                        <ButtonGroup shape={shape} size={size} type={type}>
                          <Button>
                            {size} {shape}
                          </Button>
                          <Button>Button 1</Button>
                          <Button>Button 2</Button>
                        </ButtonGroup>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
