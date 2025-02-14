import { Users, Library, Settings, BookCopy } from "lucide-react";

export const SIDEBAR_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Users },
  { name: "Courses", href: "/courses", icon: Library },
  { name: "Manage courses", href: "/dashboard/courses", icon: BookCopy },
  { name: "Settings", href: "/customize", icon: Settings },
];
