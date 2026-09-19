"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ThemeToggle() {
  // The icon swaps with CSS (dark: variant), so there is no hydration flash
  // and no React state to keep in sync with the <html> class.
  const toggle = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggle}
            aria-label="Toggle light and dark theme"
          />
        }
      >
        <Sun className="hidden dark:block" />
        <Moon className="dark:hidden" />
      </TooltipTrigger>
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  );
}
