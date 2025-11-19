"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Button",
    url: "/docs/button",
  },
  {
    title: "Button Groups",
    url: "/docs/button-groups",
  },
  {
    title: "Card",
    url: "/docs/card",
  },
  {
    title: "Carousel",
    url: "/docs/carousel",
  },
  {
    title: "Divider",
    url: "/docs/divider",
  },
  {
    title: "Icon Button",
    url: "/docs/icon-button",
  },
  {
    title: "FAB",
    url: "/docs/fab",
  },
  {
    title: "FAB Menu",
    url: "/docs/fab-menu",
  },
  {
    title: "Menu",
    url: "/docs/menu",
  },
  {
    title: "Progress",
    url: "/docs/progress",
  },
  {
    title: "Split Button",
    url: "/docs/split-button",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="p4">
      <SidebarHeader>
        <h2 className="font-bold text-lg">Documentation</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
