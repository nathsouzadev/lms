import Link from "next/link"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SimpleHeaderProps {
  headerColor: string
  logoColor: string
  pageTitle: string
}

export function SimpleHeader({ headerColor, logoColor, pageTitle }: SimpleHeaderProps) {
  return (
    <header style={{ backgroundColor: headerColor }} className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span style={{ color: logoColor }} className="text-2xl font-bold">
                {pageTitle}
              </span>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                href="/"
                className="text-stone-500 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium dark:text-stone-400 dark:hover:text-stone-50"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-stone-500 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium dark:text-stone-400 dark:hover:text-stone-50"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-stone-500 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium dark:text-stone-400 dark:hover:text-stone-50"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-stone-500 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium dark:text-stone-400 dark:hover:text-stone-50"
              >
                Contact
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

