"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-items";

const SidebarContent = ({ pathname }: { pathname: string }) => {
  return (
    <div className="space-y-1">
      {SIDEBAR_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center rounded-lg px-3 py-2 transition-all hover:text-primary ${
            pathname === item.href
              ? "bg-muted font-semibold text-primary"
              : "text-muted-foreground"
          }`}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export const MobileSidebar = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle hidden>Menu</SheetTitle>
          <SheetDescription hidden>Navigation menu</SheetDescription>
        </SheetHeader>
        <SidebarContent pathname={pathname} />
      </SheetContent>
    </Sheet>
  );
};

export const LargeSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-background lg:block">
      <ScrollArea className="h-full py-6 pl-8 pr-6">
        <SidebarContent pathname={pathname} />
      </ScrollArea>
    </aside>
  );
};
