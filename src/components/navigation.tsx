"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, Database, Home } from "lucide-react"
import { useTheme } from "next-themes"

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const { theme } = useTheme()

  // Determine if we're in dark mode
  const isDarkMode = theme === "dark"

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50 bg-white dark:bg-slate-800 shadow-sm">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className={`flex flex-col h-full ${isDarkMode ? "bg-slate-800" : "bg-slate-900"} text-white`}>
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold">Tournament Manager</h2>
            <p className="text-slate-400 text-sm">Navigation Menu</p>
          </div>

          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Link href="/" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>

              <Link href="/admin" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-slate-800">
                  <Database className="mr-2 h-4 w-4" />
                  Admin Panel
                </Button>
              </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-slate-700">
            <p className="text-xs text-slate-400">© 2024 Tournament Manager</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
