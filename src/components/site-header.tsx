"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "MODELS", href: "/#models" },
  { label: "COMPARE", href: "/compare" },
  { label: "ABOUT", href: "#" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#222] bg-[#0A0A0A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/80">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded bg-[#DC0000]">
              <svg viewBox="0 0 24 24" className="size-5 text-white" fill="currentColor">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18L18 8v8l-6 3.82L6 16V8l6-3.82z" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-[-0.02em] text-[#F5F5F0]">
              Cavallino Analytics
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-medium tracking-[0.1em] text-[#888880] transition-colors hover:text-[#F5F5F0]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#F5F5F0]">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-[#0A0A0A] border-[#222]">
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm font-medium tracking-[0.1em] text-[#888880] transition-colors hover:text-[#F5F5F0]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
