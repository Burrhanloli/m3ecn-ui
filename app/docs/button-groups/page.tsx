"use client";

import { Check, Heart, X } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/m3e/button";
import { ButtonGroup } from "@/components/ui/m3e/button-groups";
import { IconButton } from "@/components/ui/m3e/icon-button";

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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {types.map((type) => {
              const descriptions = {
                standard:
                  "Standard button groups allow variable spacing between buttons, providing flexibility in layout and visual separation.",
                connected:
                  "Connected button groups have minimal spacing with shared borders, creating a unified and seamless appearance.",
              };
              return (
                <div className="space-y-3 rounded border p-4" key={type}>
                  <h3 className="font-medium capitalize">{type}</h3>
                  <ButtonGroup type={type}>
                    <Button>Button 1</Button>
                    <Button>Button 2</Button>
                    <Button>Button 3</Button>
                  </ButtonGroup>
                  <p className="text-muted-foreground text-sm">
                    {descriptions[type]}
                  </p>
                </div>
              );
            })}
          </div>
          <h3 className="font-semibold text-lg">Connected</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sizes.map((size) => {
              const sizeDescriptions = {
                xs: "Extra small size with minimal padding, ideal for compact interfaces.",
                s: "Small size with reduced padding, suitable for secondary actions.",
                m: "Medium size with standard padding, the default for most use cases.",
                l: "Large size with increased padding, for prominent actions.",
                xl: "Extra large size with generous padding, for high-emphasis buttons.",
              };
              return (
                <div className="space-y-3 rounded border p-4" key={size}>
                  <h3 className="font-medium capitalize">{size}</h3>
                  <ButtonGroup size={size}>
                    <Button>Size {size}</Button>
                    <Button>Button 1</Button>
                    <Button>Button 2</Button>
                  </ButtonGroup>
                  <p className="text-muted-foreground text-sm">
                    {sizeDescriptions[size]}
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
          <CardTitle>Shapes</CardTitle>
          <CardDescription>
            Round and square shapes (applied to buttons).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {shapes.map((shape) => {
              const shapeDescriptions = {
                round:
                  "Round buttons with fully rounded corners, providing a softer, more approachable appearance.",
                square:
                  "Square buttons with sharp corners, offering a modern and structured look.",
              };
              return (
                <div className="space-y-3 rounded border p-4" key={shape}>
                  <h3 className="font-medium capitalize">{shape}</h3>
                  <ButtonGroup shape={shape}>
                    <Button>Shape {shape}</Button>
                    <Button>Button 1</Button>
                    <Button>Button 2</Button>
                  </ButtonGroup>
                  <p className="text-muted-foreground text-sm">
                    {shapeDescriptions[shape]}
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
          <CardTitle>Selection</CardTitle>
          <CardDescription>
            Single and multi-select with state management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {types.map((type) => (
            <div className="mb-8" key={type}>
              <h3 className="mb-4 border-b pb-2 font-semibold text-xl capitalize">
                {type}
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {selections.map((selection) => {
                  const selectionDescriptions = {
                    single:
                      "Single selection allows only one button to be selected at a time, ideal for mutually exclusive options.",
                    multi:
                      "Multi selection enables multiple buttons to be selected simultaneously, suitable for choosing multiple options.",
                  };
                  return (
                    <div
                      className="mb-3 space-y-3 rounded border p-4"
                      key={selection}
                    >
                      <h3 className="font-medium capitalize">{selection}</h3>
                      <ButtonGroup
                        onChange={
                          selection === "single"
                            ? handleSingleChange
                            : handleMultiChange
                        }
                        selection={selection}
                        type={type}
                        value={
                          selection === "single"
                            ? singleSelected
                            : multiSelected
                        }
                      >
                        <Button value="1">Option 1</Button>
                        <Button value="2">Option 2</Button>
                        <Button value="3">Option 3</Button>
                      </ButtonGroup>
                      <p className="text-muted-foreground text-sm">
                        {selectionDescriptions[selection]}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Selected:{" "}
                        {selection === "single"
                          ? (singleSelected ?? "None")
                          : (multiSelected.join(", ") ?? "None")}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {selections.map((selection) => {
                  const selectionDescriptions = {
                    single:
                      "Single selection allows only one button to be selected at a time, ideal for mutually exclusive options.",
                    multi:
                      "Multi selection enables multiple buttons to be selected simultaneously, suitable for choosing multiple options.",
                  };
                  return (
                    <div
                      className="mb-3 space-y-3 rounded border p-4"
                      key={selection}
                    >
                      <h3 className="font-medium capitalize">{selection}</h3>
                      <ButtonGroup
                        onChange={
                          selection === "single"
                            ? handleSingleChange
                            : handleMultiChange
                        }
                        selection={selection}
                        shape="round"
                        type={type}
                        value={
                          selection === "single"
                            ? singleSelected
                            : multiSelected
                        }
                      >
                        <Button value="1">Option 1</Button>
                        <Button value="2">Option 2</Button>
                        <Button value="3">Option 3</Button>
                      </ButtonGroup>
                      <p className="text-muted-foreground text-sm">
                        {selectionDescriptions[selection]}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Selected:{" "}
                        {selection === "single"
                          ? (singleSelected ?? "None")
                          : (multiSelected.join(", ") ?? "None")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mb-8">
            <h3 className="mb-4 border-b pb-2 font-semibold text-xl">
              Icon Buttons
            </h3>
            {types.map((type) => (
              <div className="mb-8" key={type}>
                <h4 className="mb-4 font-medium capitalize">{type}</h4>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {selections.map((selection) => {
                    const selectionDescriptions = {
                      single:
                        "Single selection allows only one icon button to be selected at a time, ideal for mutually exclusive options.",
                      multi:
                        "Multi selection enables multiple icon buttons to be selected simultaneously, suitable for choosing multiple options.",
                    };
                    return (
                      <div
                        className="mb-3 space-y-3 rounded border p-4"
                        key={selection}
                      >
                        <h5 className="font-medium capitalize">{selection}</h5>
                        <ButtonGroup
                          onChange={
                            selection === "single"
                              ? handleSingleChange
                              : handleMultiChange
                          }
                          selection={selection}
                          shape="square"
                          size="l"
                          type={type}
                          value={
                            selection === "single"
                              ? singleSelected
                              : multiSelected
                          }
                        >
                          <IconButton
                            icon={<Check />}
                            value="1"
                            width="narrow"
                          />
                          <IconButton icon={<X />} value="2" />
                          <IconButton icon={<Heart />} value="3" width="wide" />
                        </ButtonGroup>
                        <p className="text-muted-foreground text-sm">
                          {selectionDescriptions[selection]}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Selected:{" "}
                          {selection === "single"
                            ? (singleSelected ?? "None")
                            : (multiSelected.join(", ") ?? "None")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Combinations</CardTitle>
          <CardDescription>
            Comprehensive grid of type, size, shape.
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
