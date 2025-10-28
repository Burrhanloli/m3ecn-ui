# M3 Split Button Specification

This document summarizes the Split Button specifications from Material Design 3, including the available types, configurations.

## Types

Split buttons currently have one type defined in Material 3, which is available in the M3 Expressive system.

| Type | Original M3 | M3 Expressive |
| :--- | :--- | :--- |
| **Split button** | -- | Available |

## Configurations

Split buttons support various color styles and sizes to fit different contexts.

### Color Configurations

Split buttons use the same color schemes and state layers as standard buttons. The trailing menu icon changes color when selected, but the button itself does not change color—only a state layer is applied.

The available color configurations are:

* Elevated
* Filled
* Tonal
* Outlined

| Category | Configuration | Original M3 | M3 Expressive |
| :--- | :--- | :--- | :--- |
| **Color** | Elevated, filled, tonal, outlined | -- | Available |

### Size Configurations

Split buttons come in five different sizes.

| Category | Configuration | Original M3 | M3 Expressive |
| :--- | :--- | :--- | :--- |
| **Size** | XS, S, M, L, XL | -- | Available |

## Anatomy

### Elements of a Split Button

A split button is composed of four main elements:

1. **Leading button:** The primary action area.
2. **Icon:** Optional icon within the leading button.
3. **Label text:** Optional text label within the leading button.
4. **Trailing button:** The menu-opening action area.

### Button Content

#### Leading Button Customization

The leading button in a split button can be customized to include one or both of the following:

* Label + icon
* Label (text only)
* Icon (icon only)

#### Trailing Button Rule

The trailing button, which is used to open a menu for more options, should **always** contain a menu icon.

## Color

Color values are implemented through **design tokens**. Design tokens are the building blocks of all UI elements. The same tokens are used in designs, tools, and code.

### Color Scheme Application

Split buttons use the same color schemes as standard buttons.

However, unlike toggle buttons, the split button's container color **does not change when selected**—only a state layer is applied to the trailing button (the menu-opening action area) to indicate the selected state.

Split buttons use the same colors and state layers as standard buttons, which are shown in the related button token module.

### Color Roles

Split buttons have four main color roles (styles) that are used for the unselected and selected trailing icon states in both light and dark themes:

* **Elevated**
* **Filled**
* **Tonal**
* **Outlined**

## States

States are visual representations used to communicate the status of a component or an interactive element.

### General State Application

Split button states utilize the same colors and state layers as both standard buttons and icon buttons. For detailed color and state layer values, reference the specifications for those components.

### Leading Button States (Action Area)

The leading button is the primary action area of the split button.

#### Shape Changes

The inner corners of the leading button change shape for **hovered**, **focused**, and **pressed** states.

#### Leading States

The leading button supports the following 5 states:

1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed (and Pressed with focus)

### Trailing Button States (Menu Area)

The trailing button is the menu-opening area of the split button.

#### Shape and Icon Changes

The inner corners of the trailing button change shape for **hovered**, **focused**, and **pressed** states. Additionally, the menu **icon becomes centered when the button is selected**.

#### Trailing States

The trailing button supports the following 6 states:

1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed (and Pressed with focus)
6. Selected (and Selected with focus)

## Measurements

### Content Centering

* Text and icons are **optically centered** when the buttons are asymmetrical.
* They are centered normally when symmetrical.

### Menu Icon Offset (When Unselected)

The menu icon in the trailing button is offset from the center based on the size of the split button:

| Size | Menu Icon Offset from Center |
| :--- | :--- |
| **XS** | -1dp |
| **S** | -1dp |
| **M** | -2dp |
| **L** | -3dp |
| **XL** | -6dp |

### Spacing and Corner Radius

* The space between the leading and trailing buttons should **always be 2dp**.
* The **inner corner radius** changes depending on the overall button size:

| Size | Inner Corner Radius |
| :--- | :--- |
| **Extra small (XS)** | 4dp |
| **Small (S)** | 4dp |
| **Medium (M)** | 4dp |
| **Large (L)** | 8dp |
| **Extra large (XL)** | 12dp |
