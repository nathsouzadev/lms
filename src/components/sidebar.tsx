"use client";

import { Users, BarChart, Settings, Menu } from "lucide-react";
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

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Users },
  { name: "Statistics", href: "/courses", icon: BarChart },
  { name: "Settings", href: "/customize", icon: Settings },
];

const SidebarContent = ({ pathname }: { pathname: string }) => {
  return (
    <div className="space-y-1">
      {sidebarItems.map((item) => (
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
