"use client";

import { LogOut } from "lucide-react";
import { LargeSidebar, MobileSidebar } from "./sidebar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between border-b px-4 py-3">
        {isHome ? (
          <div className="flex gap-2 w-full">
            <p className="text-center w-full">Classplay</p>
          </div>
        ) : (
          <>
            <MobileSidebar />
            <div className="flex gap-2">
              <p className="text-center">Classplay</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 rounded-full"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Sair</span>
            </Button>
          </>
        )}
      </header>

      <div className="flex flex-1 overflow-hidden">
        {!isHome && <LargeSidebar />}

        {children}
      </div>
    </div>
  );
};
