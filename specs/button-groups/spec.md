# M3 Buttons groups Specification

This document summarizes the button groups specifications from Material Design 3, including the available types, configurations.

## Types

Button groups organize buttons and add interactions between them.

Various colors and shapes of **standard** and **connected** button groups are available.

| Type | Original M3 | M3 Expressive |
| :--- | :--- | :--- |
| **Standard button group** | -- | Available |
| **Connected button group** | Available as segmented button (Segmented buttons help people select options, switch views, or sort elements. Note: They're deprecated in the expressive update. Use a nav rail instead.) | Available |

---

## Configurations

Five sizes of button groups and two shapes of button groups are available.

Configurations for both types of button groups include:

* **Sizes:** Extra small, Small, Medium, Large, Extra large
* **Selection:** Single-select and multi-select
* **Shapes:** Round and square

| Category | Configuration | Original M3 | M3 Expressive Update |
| :--- | :--- | :--- | :--- |
| **Size** | XS, S, M, L, XL | -- | Available |
| **Default shape** | Round, square | -- | Available |
| **Selection** | Single-select, multi-select, selection-required | Available as segmented button (Segmented buttons help people select options, switch views, or sort elements. Note: They're deprecated in the expressive update. Use a nav rail instead.) | Available |

## Anatomy

Button groups are **invisible containers** that add **padding between buttons** and **modify button shape**. They don't contain any buttons by default.

The **container** is outlined on both types of button groups.

### Common layouts

Button groups allow you to mix and match buttons and icon buttons for different scenarios.

The four common layouts of button groups are:

1. **Label buttons**
2. **Label buttons and icon buttons**
3. **Extra small icon buttons**
4. **Large icon buttons**

## Selection & activation

### Standard button groups

**Standard button groups** add interaction between adjacent buttons when a button is selected or activated.

This interaction changes the **width, shape, and padding** of the selected or activated button, which in turn adjusts the width of buttons directly next to it.

### Connected button groups

**Connected button groups** don't add any interaction between adjacent buttons when selected or activated.

They only affect the **shape** of the button being selected or activated without affecting adjacent buttons.

## States

### Standard button group

When a button is **pressed**, standard button groups modify the **width and shape** of that button and **adjacent buttons**.

The five states of a standard button group are:

1. **Enabled**
2. **Disabled**
3. **Hovered**
4. **Focused**
5. **Pressed**

When a toggle button is **selected** in a standard button group, its shape should change between **square and round**. The color should change according to the button specs.

The five states of a standard button group with toggle buttons are:

1. **Enabled**
2. **Disabled**
3. **Hovered**
4. **Focused**
5. **Pressed**

---

### Connected button group

Connected button groups have different shape changes than standard button groups. **Selecting a button does not affect adjacent buttons**.

The unselected states for a connected button group are:

1. **Enabled**
2. **Disabled**
3. **Hovered**
4. **Focused**
5. **Pressed**

The selected states for a connected button group with toggle buttons are:

1. **Enabled**
2. **Hovered**
3. **Focused**
4. **Pressed**

## Measurements

### Standard button group

Standard groups apply **padding between all buttons**. The amount of padding changes based on button size to ensure a minimum accessible target size of **48dp**. (More details on padding: Button specs, icon button specs)

| Standard button group inner padding | Value |
| :--- | :--- |
| **XS** (Extra small) | 18dp |
| **S** (Small) | 12dp |
| **M** (Medium) | 8dp |
| **L** (Large) | 8dp |
| **XL** (Extra large) | 8dp |

---

### Connected button group

For all connected button groups, use **2dp padding**. This provides visual consistency at scale.

### Round connected button group

Round connected button group inner padding is **2dp at every size**. The outer shape is fully round, and the inner shape remains square with the following corner sizes:

| Corner Size | Value |
| :--- | :--- |
| **XS** (Extra small) | 4dp |
| **S** (Small) | 8dp |
| **M** (Medium) | 8dp |
| **L** (Large) | 16dp |
| **XL** (Extra large) | 20dp |

### Square connected button group

Square connected button group inner padding is **2dp at every size**. The outer shape has the following corner sizes:

| Corner Size | Value |
| :--- | :--- |
| **XS** (Extra small) | 4dp |
| **S** (Small) | 8dp |
| **M** (Medium) | 8dp |
| **L** (Large) | 16dp |
| **XL** (Extra large) | 20dp |

---

## Minimum widths

Extra small and small connected button groups have **48dp target areas** and a minimum width of **48dp**.
