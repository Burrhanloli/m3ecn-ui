"use client";

import { Check, Circle, MoreHorizontal, Settings, User } from "lucide-react";
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
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
} from "@/components/ui/m3e/menu";

export default function MenuDocs() {
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState<string>("");

  const handleCheckboxChange = (checked: boolean, value: string) => {
    if (checked) {
      setCheckboxValues((prev) => [...prev, value]);
    } else {
      setCheckboxValues((prev) => prev.filter((v) => v !== value));
    }
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-4xl">
            M3 Menu Component Documentation
          </CardTitle>
          <CardDescription className="text-lg">
            Preview of Material Design 3 menu variants, configurations, and
            interactive examples.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Basic Menu</CardTitle>
          <CardDescription>
            Simple menu with trigger button and basic items.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Standard Menu</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Options</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Basic menu triggered by a button, displaying a list of options.
              </p>
            </div>
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">With Shortcuts</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Edit</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>
                    Undo
                    <MenuShortcut>⌘Z</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    Redo
                    <MenuShortcut>⌘Y</MenuShortcut>
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem>
                    Cut
                    <MenuShortcut>⌘X</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    Copy
                    <MenuShortcut>⌘C</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    Paste
                    <MenuShortcut>⌘V</MenuShortcut>
                  </MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Menu items with keyboard shortcuts for common actions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Items with Icons</CardTitle>
          <CardDescription>
            Menu items with leading or trailing icons.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Leading Icons</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>
                    <Settings className="mr-2 size-4" />
                    Account
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>
                    <User className="mr-2 size-4" />
                    Profile
                  </MenuItem>
                  <MenuItem>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </MenuItem>
                  <MenuItem>
                    <Check className="mr-2 size-4" />
                    Logout
                  </MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Icons placed before the text for visual emphasis.
              </p>
            </div>
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Trailing Icons</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>More</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>
                    View Details
                    <MoreHorizontal className="ml-auto size-4" />
                  </MenuItem>
                  <MenuItem>
                    Edit
                    <Settings className="ml-auto size-4" />
                  </MenuItem>
                  <MenuItem>
                    Delete
                    <Circle className="ml-auto size-4" />
                  </MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Icons placed after the text, often for additional actions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Checkbox and Radio Items</CardTitle>
          <CardDescription>
            Selectable menu items with checkbox or radio behavior.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Checkbox Items</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Preferences</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuCheckboxItem
                    checked={checkboxValues.includes("notifications")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked, "notifications")
                    }
                  >
                    Enable Notifications
                  </MenuCheckboxItem>
                  <MenuCheckboxItem
                    checked={checkboxValues.includes("dark-mode")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked, "dark-mode")
                    }
                  >
                    Dark Mode
                  </MenuCheckboxItem>
                  <MenuCheckboxItem
                    checked={checkboxValues.includes("auto-save")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked, "auto-save")
                    }
                  >
                    Auto Save
                  </MenuCheckboxItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Multiple selections allowed. Selected:{" "}
                {checkboxValues.join(", ") || "None"}
              </p>
            </div>
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Radio Items</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Theme</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuRadioGroup
                    onValueChange={setRadioValue}
                    value={radioValue}
                  >
                    <MenuRadioItem value="light">Light</MenuRadioItem>
                    <MenuRadioItem value="dark">Dark</MenuRadioItem>
                    <MenuRadioItem value="system">System</MenuRadioItem>
                  </MenuRadioGroup>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Single selection only. Selected: {radioValue || "None"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Separators and Labels</CardTitle>
          <CardDescription>
            Organizing menu items with separators and labels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">With Separators</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Actions</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>Edit Profile</MenuItem>
                  <MenuItem>Change Password</MenuItem>
                  <MenuSeparator />
                  <MenuItem>Privacy Settings</MenuItem>
                  <MenuItem>Notification Settings</MenuItem>
                  <MenuSeparator />
                  <MenuItem variant="destructive">Delete Account</MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Separators group related items, with a destructive action at the
                end.
              </p>
            </div>
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">With Labels</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Organized Menu</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuLabel>Account</MenuLabel>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuSeparator />
                  <MenuLabel>Actions</MenuLabel>
                  <MenuItem>Export Data</MenuItem>
                  <MenuItem>Import Data</MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Labels provide context and organization for menu sections.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>Submenus</CardTitle>
          <CardDescription>
            Nested menus for hierarchical options.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Nested Submenu</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>File</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>New File</MenuItem>
                  <MenuItem>Open</MenuItem>
                  <MenuSub>
                    <MenuSubTrigger>Recent Files</MenuSubTrigger>
                    <MenuSubContent>
                      <MenuItem>Document 1.txt</MenuItem>
                      <MenuItem>Document 2.txt</MenuItem>
                      <MenuItem>Document 3.txt</MenuItem>
                    </MenuSubContent>
                  </MenuSub>
                  <MenuSeparator />
                  <MenuItem>Save</MenuItem>
                  <MenuItem>Save As...</MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Submenus allow deeper navigation without cluttering the main
                menu.
              </p>
            </div>
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Complex Submenu</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Tools</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuSub>
                    <MenuSubTrigger>Developer Tools</MenuSubTrigger>
                    <MenuSubContent>
                      <MenuItem>Console</MenuItem>
                      <MenuItem>Network</MenuItem>
                      <MenuSub>
                        <MenuSubTrigger>Advanced</MenuSubTrigger>
                        <MenuSubContent>
                          <MenuItem>Performance</MenuItem>
                          <MenuItem>Memory</MenuItem>
                        </MenuSubContent>
                      </MenuSub>
                    </MenuSubContent>
                  </MenuSub>
                  <MenuItem>Extensions</MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Multiple levels of nesting for complex hierarchies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <hr className="my-8" />

      <Card>
        <CardHeader>
          <CardTitle>All Examples</CardTitle>
          <CardDescription>
            Comprehensive examples combining various menu features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Full Featured Menu</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>
                    <Settings className="mr-2 size-4" />
                    Menu
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuLabel>Account</MenuLabel>
                  <MenuItem>
                    <User className="mr-2 size-4" />
                    Profile
                  </MenuItem>
                  <MenuItem>
                    <Settings className="mr-2 size-4" />
                    Settings
                  </MenuItem>
                  <MenuSeparator />
                  <MenuLabel>Preferences</MenuLabel>
                  <MenuCheckboxItem
                    checked={checkboxValues.includes("theme")}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked, "theme")
                    }
                  >
                    Dark Theme
                  </MenuCheckboxItem>
                  <MenuRadioGroup
                    onValueChange={setRadioValue}
                    value={radioValue}
                  >
                    <MenuRadioItem value="compact">Compact View</MenuRadioItem>
                    <MenuRadioItem value="detailed">
                      Detailed View
                    </MenuRadioItem>
                  </MenuRadioGroup>
                  <MenuSeparator />
                  <MenuItem variant="destructive">Logout</MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Combines labels, icons, checkboxes, radios, and destructive
                items.
              </p>
            </div>
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Navigation Menu</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Navigate</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>Home</MenuItem>
                  <MenuSub>
                    <MenuSubTrigger>Projects</MenuSubTrigger>
                    <MenuSubContent>
                      <MenuItem>Web App</MenuItem>
                      <MenuItem>Mobile App</MenuItem>
                      <MenuItem>Desktop App</MenuItem>
                    </MenuSubContent>
                  </MenuSub>
                  <MenuItem>About</MenuItem>
                  <MenuItem>Contact</MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Navigation-style menu with submenus for categories.
              </p>
            </div>
            <div className="space-y-3 rounded border p-4">
              <h3 className="font-medium">Action Menu</h3>
              <Menu>
                <MenuTrigger asChild>
                  <Button>Actions</Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem>
                    Edit
                    <MenuShortcut>⌘E</MenuShortcut>
                  </MenuItem>
                  <MenuItem>
                    Duplicate
                    <MenuShortcut>⌘D</MenuShortcut>
                  </MenuItem>
                  <MenuSeparator />
                  <MenuItem variant="destructive">
                    Delete
                    <MenuShortcut>⌫</MenuShortcut>
                  </MenuItem>
                </MenuContent>
              </Menu>
              <p className="text-muted-foreground text-sm">
                Action-oriented menu with shortcuts and destructive action.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
