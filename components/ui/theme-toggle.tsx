"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export function ThemeToggle({ className, iconClassName }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" className={cn("w-9 h-9 opacity-0", className)}></Button>;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn("w-9 h-9", className)}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", iconClassName)} />
      ) : (
        <Moon className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", iconClassName)} />
      )}
    </Button>
  );
} 