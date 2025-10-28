# M3 Icon Button Specification

This document summarizes the icon button specifications from Material Design 3, including the available types, configurations.

## Types

Icon buttons come in two main types:

| Type | Original M3 | M3 Expressive |
| :--- | :--- | :--- |
| **Default** | Available | Available |
| **Toggle** (selection) | Available | Available |

## Configurations

Icon buttons can be configured by Size, Shape, Color, and Width. The table below outlines the options available for both the **Original M3** and **M3 Expressive** design systems.

| Category | Options | Original M3 | M3 Expressive |
| :--- | :--- | :--- | :--- |
| **Size** | Small (default) | Available | Available |
| **Size** | XS, M, L, XL | -- | Available |
| **Shape** | Round (default) | Available | Available |
| **Shape** | Square | -- | Available |
| **Color** | Filled (default), tonal, outlined, standard | Available | Available |
| **Width** | Default | Available | Available |
| **Width** | Narrow, wide | -- | Available |

## Anatomy

The anatomy of the icon button primarily consists of two elements: the **Container** and the **Icon**. Measurements and spacing define its structure across different configurations (sizes and widths).

### Key Measurements (Default Size)

* **Container Height:** 40dp
* **Icon Size:** 24dp

### Widths and Spacing

The width configuration affects the spacing around the icon:

| Width | Leading Space | Trailing Space |
| :--- | :--- | :--- |
| **Narrow** | 4dp | 4dp |
| **Default** | 8dp | 8dp |
| **Wide** | 14dp | 14dp |

### Target Sizes

For accessibility, Extra Small and Small icon buttons must have a touch target size of **48x48dp** or larger.

## Color

The color of an icon button is defined by its color style (Filled, Tonal, Outlined, Standard) and its state (Default, Toggle unselected, Toggle selected), using Material 3 color roles.

| Style | Element | 1. Default | 2. Toggle, unselected | 3. Toggle, selected |
| :--- | :--- | :--- | :--- | :--- |
| **Filled** | Container | Primary | Surface container highest | Primary |
| | Icon | On primary | Primary | On primary |
| **Tonal** | Container | Secondary container | Surface container highest | Secondary container |
| | Icon | On secondary container | On surface variant | On secondary container |
| **Outlined** | Container | Outline variant (outline) | Outline variant (outline) | Inverse surface |
| | Icon | On surface variant | On surface variant | Inverse on surface |
| **Standard** | Icon | On surface variant | On surface variant | Primary |

***

### Color Note

> **Note:** These color roles were chosen to create design coherence and familiarity. Other color roles can be used as long as the container and text have a 3:1 contrast ratio. For example, tertiary and on tertiary.

## States Overview

States show the interaction status of a component or UI element. State layers slightly change button color upon interaction. Disabled states use different base colors entirely.

All interaction states use a state layer applied over the button's color, except for the enabled state.

| State | State Layer Opacity |
| :--- | :--- |
| **Enabled** | (No state layer) |
| **Disabled** | 10% state layer |
| **Hovered** | 8% state layer |
| **Focused** | 10% state layer |
| **Pressed** | 10% state layer |

---

## States by Button Type

These five states apply consistently across all four color styles (Filled, Tonal, Outlined, Standard) for both **Default** and **Toggle** icon buttons.

### 1. Default Icon Button States

The five states are:

1. **Enabled**
2. **Disabled** (10% state layer)
3. **Hovered** (8% state layer)
4. **Focused** (10% state layer)
5. **Pressed** (10% state layer)

### 2. Toggle Icon Button States

Toggle buttons have states for both the **unselected** and **selected** status, but they follow the same five interaction states:

1. **Enabled** (Unselected / Selected)
2. **Disabled** (10% state layer)
3. **Hovered** (8% state layer)
4. **Focused** (10% state layer)
5. **Pressed** (10% state layer)

### Standard Icon Button Note

The standard icon button's container is invisible at rest but becomes visible when a state layer is applied (e.g., in the Hovered, Focused, or Pressed states).

## Shape morph

### Pressed state

While pressed, icon buttons can morph to become more square. Both round and square icon buttons should have the same pressed shape radius, though the corner radius value differs for each button size.

### When selected (Toggle)

In addition to changing shape when pressed, toggle icon buttons also change their resting shape when toggled:

* By default, the resting shape changes from **round (unselected)** to **square (selected)**.
* If the resting shape starts as square, the selected shape should be round.

## Measurements

| Label | Size Name | Icon Size (1) | Default Width Size (2) | Narrow Width Size (3) | Wide Width Size (4) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A** | Extra small | 20 x 20 | 32 x 32 | 28 x 32 | 40 x 32 |
| **B** | Small | 24 x 24 | 40 x 40 | 32 x 40 | 52 x 40 |
| **C** | Medium | 24 x 24 | 56 x 56 | 48 x 56 | 72 x 56 |
| **D** | Large | 32 x 32 | 96 x 96 | 64 x 96 | 128 x 96 |
| **E** | Extra large | 40 x 40 | 136 x 136 | 104 x 136 | 184 x 136 |

### Key Legend (from image)

1. **Icon size**
2. **Default width size**
3. **Narrow width size**
4. **Wide width size**

### Button Corner Radius

The corner radius is specified by size for round and square shapes, including the morphed shape used in the pressed state.

| Size | XS | S | M | L | XL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Round button** | Full | Full | Full | Full | Full |
| **Square button** | 12dp | 12dp | 16dp | 28dp | 28dp |
| **Pressed state** | 8dp | 8dp | 12dp | 16dp | 16dp |

### Target Sizes

For accessibility, **Extra small (XS)** and **Small (S)** icon buttons must have a target size of **48x48dp** or larger
