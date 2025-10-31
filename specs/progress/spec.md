# ⏳ Progress Indicator Specification

This document details the implementation specification for a modular **Progress Indicator** component for a React application, leveraging the **composition pattern** and styled to follow the **Material 3 / Material 3 Expressive** guidelines in a **shadcn-style** (utility-first, unstyled base, highly customizable with Tailwind CSS).

## 1. Design Reference

* **Core Guidelines:** Material Design 3 Progress Indicators
* **Expressive Features Supported:** Linear Wavy/Flat (with two thicknesses), Circular (with two modes and four-color option).
* **Styling Base:** Tailwind CSS utility classes, utilizing M3 color tokens and custom sizing.

## 2. Component Structure (React Composition)

The component uses the **Compound Component Pattern** with a root context component and specialized child components.

### 2.1. Component Composition

| Component Name | Role | Description |
| :--- | :--- | :--- |
| `Progress` | **Base / Root** | Provides shared context, accessibility attributes (`aria-valuenow`, `aria-label`), and manages the `value` and `max` state. |
| `Progress.Linear` | **Primary Indicator** | Renders a horizontal bar. Handles determinate, indeterminate, and M3 expressive variants. |
| `Progress.Circular` | **Primary Indicator** | Renders a circular spinner/gauge. Handles determinate and indeterminate modes. |
| `Progress.Label` | **Optional Slot** | Renders an accessible text label describing the process. |

### 2.2. Usage Example

```tsx
// Determinate Linear Wavy (Thick Expressive)
<Progress value={85} max={100} aria-label="Downloading update">
  <Progress.Linear mode="determinate" variant="wavy" thickness="thick" />
</Progress>

// Indeterminate Circular (Four-Color M3)
<Progress aria-label="Processing transaction">
  <Progress.Circular mode="indeterminate" fourColor={true} size="md" />
</Progress>
````

-----

## 3. API Specification

### 3.1. `Progress` Component (Root)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `0` | The current value of the progress (0-100 recommended). Required for `determinate` mode. |
| `max` | `number` | `100` | The maximum possible value. |
| `className` | `string` | `''` | Custom class for the container element. |
| `aria-label` | `string` | `undefined` | **Required** for accessibility to describe the indicator's purpose. |

### 3.2. `Progress.Linear` Component

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'determinate' \| 'indeterminate'` | `'determinate'` | Progress is known or unknown. |
| `variant` | `'flat' \| 'wavy'` | `'flat'` | Implements standard M3 or M3 Expressive styles. |
| `thickness` | `'default' \| 'thick'` | `'default'` | Controls the height: `'default'` ($4\text{dp}$ track) or `'thick'` ($8\text{dp}$ track). |
| `buffer` | `number` | `undefined` | Secondary progress value for buffering (0-100). Only applicable in `determinate` mode. |
| `fourColor` | `boolean` | `false` | Enables M3 color cycling in `indeterminate` mode. |

### 3.3. `Progress.Circular` Component

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'determinate' \| 'indeterminate'` | `'determinate'` | Progress is known or unknown. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Defines the diameter (e.g., $24\text{dp}$, $48\text{dp}$, $72\text{dp}$). |
| `strokeWidth` | `number` | *M3 default* | Overrides the default stroke thickness for the given size. |
| `fourColor` | `boolean` | `false` | Enables M3 color cycling in `indeterminate` mode. |

-----

## 4. Implementation Details: `Progress.Linear` (Measurements)

All measurements are based on the Material 3 Expressive spec diagram.

### 4.1. Core Sizing (Thickness $\times$ Variant)

| Prop Combination | Track Height | Total Container Height | Radius/Stop Size |
| :--- | :--- | :--- | :--- |
| `flat`, `default` | $4\text{dp}$ (`h-1`) | $4\text{dp}$ (`h-1`) | $4\text{dp}$ |
| `flat`, `thick` | $8\text{dp}$ (`h-2`) | $8\text{dp}$ (`h-2`) | $8\text{dp}$ |
| `wavy`, `default` | $4\text{dp}$ (`h-1`) | $10\text{dp}$ (`h-2.5` custom) | $4\text{dp}$ |
| `wavy`, `thick` | $8\text{dp}$ (`h-2`) | $14\text{dp}$ (`h-3.5` custom) | $8\text{dp}$ |

### 4.2. Wavy Variant (`variant="wavy"`)

* **Wave Shape:** Generated via SVG path or mask with a consistent **$40\text{dp}$ Wavelength** and **$\pm 3\text{dp}$ Amplitude** from the center line, regardless of thickness.
* **Wavy Animation:** Requires a dedicated CSS `@keyframes` for the wave motion itself, simulating a continuous ripple or flow.
* **Stop Indicator Positioning:** The $4\text{dp}$ diameter stop indicator must be rendered **$4\text{dp}$ from the center line** to visually align with the wave's vertical space.

### 4.3. Determinate Mode Requirements

* **Stop Indicator:** A circular element (`4\text{dp}` diameter) must be rendered at the trailing edge of the active indicator when $0 < value < 100$. This element ensures the track end is visually distinct (M3 Accessibility).
* **Track Gap:** The distance between the active indicator and the stop indicator is $4\text{dp}$ (default) or $8\text{dp}$ (thick).

### 4.4. Indeterminate Mode Requirements

* **Motion:** Requires complex, coordinated CSS `@keyframes` (two segments: A and B) to achieve the non-repeating travel, grow, and shrink pattern specified by M3.
* **Four-Color Cycle:** If `fourColor` is `true`, a separate, $8\text{s}$ CSS animation (`@keyframes indeterminate-color-cycle`) must cycle the active indicator color through four M3 color tokens (Primary, Primary Container, Tertiary, Tertiary Container) concurrently with the motion animation.

-----

## 5. Implementation Details: `Progress.Circular`

The circular indicator is based on an SVG structure using `<circle>` elements for the track and the active indicator.

### 5.1. Determinate Mode

* **Progress:** The indicator fill is controlled by the `stroke-dashoffset` property, calculated using the $value% $ and the circle's circumference.
* **Stroke Cap:** The active indicator must use a **rounded stroke cap** (M3 default).

### 5.2. Indeterminate Mode

* **Motion:** Achieved through two concurrent animations: continuous rotation (`animate-spin`) and a `stroke-dashoffset`/`stroke-dasharray` change that makes the active arc segment grow, travel, and shrink.
* **Four-Color Cycle:** If `fourColor` is `true`, the stroke color of the active arc must cycle through the four M3 color tokens over a $6\text{s}$ period using the same `indeterminate-color-cycle` keyframe used for the linear indicator.

-----

## 6. Accessibility (ARIA)

The component must adhere to the WAI-ARIA specification for the `progressbar` role.

| Element | ARIA Role / Attribute | Value / Rule |
| :--- | :--- | :--- |
| `Progress` Root | `role="progressbar"` | Defines the element type. |
| `Progress` Root | `aria-valuenow` | The current `value` prop. **Must be omitted for `indeterminate` mode.** |
| `Progress` Root | `aria-valuemin` | `0` |
| `Progress` Root | `aria-valuemax` | `max` prop. |
| `Progress` Root | `aria-label` or `aria-labelledby` | **Required** to convey the purpose and status to screen readers. |
