# M3 Extended FAB Specification

This document summarizes the Extended FAB specifications from Material Design 3, including exact token values, configurations, and states.

## Overview

Extended FABs help people take primary actions, just like regular FABs. They're wider than FABs and include a text label, providing more detail and a larger target surface.

**Reference:** [M3 Extended FAB Specs](https://m3.material.io/components/extended-fab/specs)

***

## Sizes

The M3 Extended FAB comes in three sizes: **Small**, **Medium**, and **Large**.

### Size Specifications

| Size | Container Height | Icon Size | Typography | Corner Radius | Collapsed Width |
|------|-----------------|-----------|------------|---------------|-----------------|
| **Small** | `56px` | `24px` | Label Large: `14px` / `20px` LH, weight `500`, spacing `0.1px` | `16px` | `56px` |
| **Medium** | `80px` | `32px` | Headline Small: `24px` / `32px` LH, weight `400` | `16px` | `80px` |
| **Large** | `96px` | `36px` | Headline Medium: `28px` / `36px` LH, weight `400` | `28px` | `96px` |

### Spacing Specifications

#### Small Size
- **Leading space** (container edge to icon): `16px`
- **Icon-label space**: `12px`
- **Trailing space** (label to container edge): `20px`

#### Medium Size
- **Leading space**: `16px`
- **Icon-label space**: `12px`
- **Trailing space**: `20px`

#### Large Size
- **Leading space**: `28px`
- **Icon-label space**: `12px`
- **Trailing space**: `32px`

***

## Configurations

### Icon Position

Extended FABs support two icon positions:

| Position | Description |
|----------|-------------|
| **Leading** | Icon appears before the text label (default) |
| **Trailing** | Icon appears after the text label |

When icon position is trailing, the leading and trailing space values are swapped.

### Expanded State

Extended FABs support two display states:

| State | Description | Behavior |
|-------|-------------|----------|
| **Expanded** | Shows both icon and text label | Full width with text visible |
| **Collapsed** | Shows icon only | Square dimensions (e.g., `56px × 56px` for small) |

The transition between expanded and collapsed states uses a smooth animation:
- **Duration**: `350ms`
- **Easing**: `cubic-bezier(0.2, 0.0, 0, 1.0)` (M3 standard easing)

***

## Color Variants

Extended FABs support three color variants based on M3 container color tokens:

| Variant | Container Color | Content Color | State Layer (Hover) | State Layer (Pressed) |
|---------|----------------|---------------|---------------------|----------------------|
| **Primary** | `primary-container` | `on-primary-container` | `on-primary-container/8%` | `on-primary-container/12%` |
| **Secondary** | `secondary-container` | `on-secondary-container` | `on-secondary-container/8%` | `on-secondary-container/12%` |
| **Tertiary** | `tertiary-container` | `on-tertiary-container` | `on-tertiary-container/8%` | `on-tertiary-container/12%` |

***

## States

### Interaction States

Extended FABs support five interaction states:

* **Enabled:** The default, interactive state
* **Disabled:** Non-interactive state with reduced opacity
* **Hovered:** State when cursor is positioned over the FAB
* **Focused:** State when the FAB is targeted by keyboard navigation
* **Pressed:** Momentary state when clicking/touching the FAB

### State-Specific Tokens

| State | Elevation | Container Opacity | Content/Icon Opacity | Notes |
|-------|-----------|-------------------|----------------------|-------|
| **Enabled** | `m3-elevation-3` | `100%` | `100%` | Default resting state |
| **Disabled** | `m3-elevation-0` | `12%` (uses `on-surface/12%`) | `38%` (uses `on-surface/38%`) | No shadow, reduced visibility |
| **Hovered** | `m3-elevation-4` | `100%` + state layer `8%` | `100%` | Elevated appearance on hover |
| **Focused** | `m3-elevation-3` | `100%` | `100%` | Shows `3px` focus ring with `2px` offset |
| **Pressed** | `m3-elevation-3` | `100%` + state layer `12%` | `100%` | Returns to base elevation |

### Elevation Values

Extended FABs use the following M3 elevation levels:

- **m3-elevation-3** (Enabled, Pressed): 
  - `0px 1px 3px 0px rgba(0, 0, 0, 0.3)`
  - `0px 4px 8px 3px rgba(0, 0, 0, 0.15)`

- **m3-elevation-4** (Hover):
  - `0px 2px 3px 0px rgba(0, 0, 0, 0.3)`
  - `0px 6px 10px 4px rgba(0, 0, 0, 0.15)`

***

## Implementation Notes

### Typography Scale

The Extended FAB uses M3 typography scale values:

- **Label Large** (Small size): Font size `14px`, Line height `20px`, Weight `500`, Letter spacing `0.1px`
- **Headline Small** (Medium size): Font size `24px`, Line height `32px`, Weight `400`
- **Headline Medium** (Large size): Font size `28px`, Line height `36px`, Weight `400`

### State Layers

State layers are implemented using a `before` pseudo-element with opacity transitions:

- **Hover**: `8%` opacity of the on-container color
- **Pressed**: `12%` opacity of the on-container color
- **Transition**: `200ms` duration for opacity changes

### Animation

The expand/collapse animation affects both:
- **Container width**: Animates from fixed width (collapsed) to auto width (expanded)
- **Text opacity**: Fades in/out with the same duration and easing

### Accessibility

- **Focus ring**: `3px` thickness with `2px` offset from container edge
- **Focus ring color**: Uses `secondary` color role with `20%` opacity
- **Scale on press**: `96%` of original size for tactile feedback
- **Keyboard navigation**: Full support for Enter and Space key activation

***

## Usage Guidelines

### When to Use Extended FAB

- When the action label provides important context
- When you want to emphasize a primary action
- When screen real estate allows for a wider button
- When the action is the most prominent on the screen

### Regular FAB vs Extended FAB

| Feature | Regular FAB | Extended FAB |
|---------|------------|--------------|
| **Width** | Fixed (56/80/96px) | Variable (auto-width when expanded) |
| **Content** | Icon only | Icon + text label |
| **Use case** | Well-known actions (e.g., "+", "✓") | Actions needing clarification |
| **Prominence** | High | Higher (due to text label) |

### Best Practices

1. **Keep labels concise** - Use 1-2 words maximum
2. **Use sentence case** - e.g., "Create" not "CREATE"
3. **Choose the right variant**:
   - **Primary**: Most important action
   - **Secondary**: Important but not primary
   - **Tertiary**: Alternative action
4. **Icon selection**: Choose icons that clearly represent the action
5. **Placement**: Typically anchored to bottom-right of screen
