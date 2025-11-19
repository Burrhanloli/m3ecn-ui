# M3 Expressive Card Specification

This document summarizes the specifications for the Material 3 Expressive Card component.

## Types

There are three primary card types:

| Type | Description |
| :--- | :--- |
| **Elevated** | Container with a drop shadow. Used for separation from background. |
| **Filled** | Container with a solid color fill. distinct from background. |
| **Outlined** | Container with a stroke and no fill. |

## Configurations

### 1. Shapes (Expressive)

The Expressive Card supports multiple corner radii to adapt to different brand personalities and layouts.

| Size | Corner Radius |
| :--- | :--- |
| **XS** | 8dp |
| **S** | 12dp (Standard M3) |
| **M** | 16dp |
| **L** | 24dp |
| **XL** | 32dp |

### 2. Interaction States

Cards support the following interaction states:

- **Enabled**
- **Hovered**: Elevation increase (for Elevated), State layer overlay.
- **Focused**: Focus ring.
- **Pressed**: State layer overlay, scale transform (optional expressive touch).
- **Dragged**: (If applicable)

## Component API

The component will be built using `class-variance-authority` (cva) for variants.

```tsx
<Card variant="elevated" shape="md">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>
```

### Props

- `variant`: `elevated` (default), `filled`, `outlined`
- `shape`: `xs`, `sm` (default), `md`, `lg`, `xl`
- `interactive`: `boolean` (default false) - Enables hover/press effects.

## Tokens

| Token | Value |
| :--- | :--- |
| `container-color-elevated` | `Surface Container Low` |
| `container-color-filled` | `Surface Container Highest` |
| `container-color-outlined` | `Surface` |
| `outline-color` | `Outline Variant` |
