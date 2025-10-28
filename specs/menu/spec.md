# M3 Menus Specifications

This document summarizes the Menu specifications from Material Design 3, including the available types, configurations.

Menus display a list of choices on a temporary surface.

## Anatomy

Menus consist of a menu container, list items, and optional dividers.

A menu is composed of the following elements:

1. Container
2. List item
3. List item leading icon
4. List item trailing icon
5. List item trailing text
6. Divider

*(View list item tokens and divider tokens on the source page for detailed values.)*

## Configurations

Menus appear when users interact with a button, action, or other control.

Examples of inputs that trigger a menu:

* Button
* Text field
* Icon button
* Selected text

## Color

Color values are implemented through **design tokens**. For design, this means working with color values that correspond with tokens, and for implementation, a color value will be a token that references a value.

Menu color roles used for light and dark schemes include:

* Surface container
* Surface container color (with Primary 40 surface tint)
* On surface
* On surface variant
* On surface (Opacity: 0.08 - often used for state layers)
* Secondary container
* On secondary container

## States

States show the interaction status of a component or interactive element.

### General Menu Item States

The general states for a menu item are:

1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed

### Selected Menu Item States

A selected menu item also supports the same 5 states:

1. Enabled
2. Disabled
3. Hovered
4. Focused
5. Pressed

*(State specifications are contained within the token modules on the source page.)*

## Measurements

Menu padding and size measurements are defined as follows:

| Attribute | Value |
| :--- | :--- |
| **Container width** | 112dp min, 280dp max |
| **Corner radius** | 4dp |
| **List item height** | 48dp |
| **Leading/trailing icon size** | 24dp |
| **Padding between elements within a list item** | 12dp |
| **Left/right padding (general)** | 12dp |
| **Left/right padding (with icon)** | 12dp |
| **Divider top/bottom padding** | 8dp |
| **Divider height** | 1dp |
| **Divider width** | Dynamic |
| **Vertical label text alignment** | Center-aligned |
| **Horizontal label text alignment** | Start-aligned |
