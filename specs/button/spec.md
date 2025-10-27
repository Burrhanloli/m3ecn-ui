# M3 Buttons Specification

This document summarizes the button specifications from Material Design 3, including the available types, configurations.

## Types

M3 supports two primary button types: **Default** and **Toggle (selection)**. The "M3 Expressive" variant introduces the Toggle button.

| Type | Original M3 | M3 Expressive |
| :--- | :--- | :--- |
| **Default** | Available | Available |
| **Toggle (selection)** | -- | Available |

***

## Configurations

Buttons can be configured by Size, Shape, and Color.

### 1. Color Styles

There are five built-in button color styles.

| Color Style | Default Button | Toggle Button | Description |
| :--- | :--- | :--- | :--- |
| **Elevated** | Available | Available | Uses Surface container low and Primary colors. Has default elevation. |
| **Filled** | Available | Available | Default style. Uses Primary color for container and On-primary for content. |
| **Tonal** | Available | Available | Uses Secondary container and On-secondary container colors. |
| **Outlined** | Available | Available | Uses Outline variant color for the stroke. Container is Surface container. |
| **Text** | Available | Not used | No container, only label/icon in Primary color. |

### 2. Size and Shape Configurations

The M3 Expressive variant introduces more sizes (XS, M, L, XL) and a **Square** shape option.

| Category | Configuration | Original M3 | M3 Expressive |
| :--- | :--- | :--- | :--- |
| **Size** | Small (default) | Available | Available |
| **Size** | XS, M, L, XL | -- | Available |
| **Shape** | Round (default) | Available | Available |
| **Shape** | Square | -- | Available |
| **Padding** | Small button padding | 24dp (Deprecated) | 16dp |

### 3. Corner Sizes (Radii)

Corner radii for the expressive sizes (XS to XL) vary based on shape and state.

| Configuration | XS | S | M | L | XL |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Round button** | Full | Full | Full | Full | Full |
| **Square button** | 12dp | 12dp | 16dp | 28dp | 28dp |
| **Pressed state** | 8dp | 8dp | 12dp | 16dp | 16dp |

***

## States

### 1. Primary Interaction States

All button styles (Elevated, Filled, Tonal, Outlined, Text) support five interaction states:

* **Enabled:** The default, interactive state.
* **Disabled:** Non-interactive state, often achieved through opacity and zero elevation.
* **Hovered:** State when a cursor is positioned over the button.
* **Focused:** State when the button is targeted by keyboard navigation or an accessibility feature.
* **Pressed:** The momentary state when a user clicks or touches the button.

### 2. State-Specific Behavior and Tokens

| State | Key Token Change | Value (Light Theme Example) | Notes |
| :--- | :--- | :--- | :--- |
| **Enabled** | Button Elevation | `0` (Filled/Tonal/Text/Outlined); `1dp` (Elevated) | The button's base, at-rest appearance. |
| **Disabled** | Container Elevation | `0` | Elevated buttons lose their default elevation. |
| **Disabled** | Container Opacity | `0.1` | The container color is visible with low opacity. |
| **Disabled** | Label/Icon Opacity | `0.38` | Text and icons are significantly faded. |
| **Hovered** | Container State Layer Opacity | `0.08` | A state layer color (e.g., On-Primary) is overlaid on the container. |
| **Hovered** | Container Elevation | `1dp` | Elevation increases to `1dp` to indicate lift (except for Text/Outlined, which remain low or flat). |
| **Focused** | Focus Ring Indicator Thickness | `3dp` | Displays a visible ring around the button's container for accessibility. |
| **Focused** | Focus Ring Outline Offset | `2dp` | The ring is offset from the button edge by `2dp`. |
| **Pressed** | Container State Layer Opacity | `0.1` | Higher opacity state layer than Hovered to indicate a physical press. |
| **Pressed** | Container Elevation | `0` | Elevation reverts to base level or `0` for the momentary press. |

### Toggle Button States

Toggle buttons (Unselected and Selected) apply the same interaction states (Disabled, Hovered, Focused, Pressed) but use distinct color tokens for the **Unselected** versus **Selected** resting states.

* **Unselected/Enabled:** Container uses a surface color (e.g., `Surface container`) and content uses an on-surface variant color.
* **Selected/Enabled:** Container uses the primary color (e.g., `Primary`) and content uses the on-primary color.

### 3. Shape Morph Behavior

Shape morphing applies specifically to the Pressed and Selected states. The default shapes are **Round** (full corner) and **Square** (rounded corners).

#### Pressed State Shape Change

When any button is in the **Pressed** state, its corner radius morphs to a smaller, specific value, ensuring a consistent visual feedback regardless of the initial shape.

| Button Size | Corner Radius in Pressed State |
| :--- | :--- |
| **XS, S** | `8dp` |
| **M** | `12dp` |
| **L, XL** | `16dp` |

#### Selected State Shape Change (Toggle Buttons)

Toggle buttons modify their resting shape between the Unselected and Selected states:

| Resting Shape | Toggle State Change | Resulting Shape |
| :--- | :--- | :--- |
| **Round** (Full Corner) | Becomes **Selected** | **Square** (`12dp` to `28dp` corner radius, depending on size) |
| **Square** (Rounded Corner) | Becomes **Selected** | **Round** (Full Corner) |

## Color

Color values for buttons are implemented through **design tokens**, which are the building blocks of all UI elements. For implementation, a color value is a token that references a color role in the system's color palette.

### Five Built-in Button Color Styles

There are five standard color styles in Material Design 3 (M3):

1. **Elevated**
2. **Filled**
3. **Tonal**
4. **Outlined**
5. **Text**

**Note:** Both **Default** and **Toggle** buttons use these styles, but **Toggle buttons do not use the Text style**.

## Color Role Mapping

The color roles were chosen for design coherence and familiarity. When using custom colors, ensure the **container and text maintain a minimum 3:1 contrast ratio**.

The table below shows the color roles used for the container and content (icon & label) for each button style in both **Default** and **Toggle** variations (Light/Default theme):

| Button Style (Container / Content) | Default Button | Toggle Unselected | Toggle Selected |
| :--- | :--- | :--- | :--- |
| **Elevated** | Container: `Surface container low` / Content: `Primary` | Container: `Surface container low` / Content: `Primary` | Container: `Primary` / Content: `On primary` |
| **Filled** | Container: `Primary` / Content: `On primary` | Container: `Surface container` / Content: `On surface variant` | Container: `Primary` / Content: `On primary` |
| **Tonal** | Container: `Secondary container` / Content: `On secondary container` | Container: `Secondary container` / Content: `On secondary container` | Container: `Secondary` / Content: `On secondary` |
| **Outlined** | Container: (None) / Outline: `Outline variant` / Content: `On surface variant` | Container: (None) / Outline: `Outline variant` / Content: `On surface variant` | Container: `Inverse surface` / Outline: (None) / Content: `Inverse on surface` |
| **Text** | Container: (None) / Content: `Primary` | **--** | **--** |
