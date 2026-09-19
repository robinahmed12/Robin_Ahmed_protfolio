"use client";

import { cn } from "@/lib/utils";

export type TabId = "about" | "resume" | "portfolio" | "contact";

const tabs: { id: TabId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "portfolio", label: "Portfolio" },
  { id: "contact", label: "Contact" },
];

export default function NavTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <nav
      aria-label="Sections"
      className="flex gap-1 overflow-x-auto rounded-full bg-card/90 p-1.5 shadow-md ring-1 ring-foreground/5 backdrop-blur-md dark:ring-foreground/10"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          aria-current={active === tab.id ? "true" : undefined}
          className={cn(
            "flex-1 rounded-full px-3 py-2.5 text-[13px] sm:px-4 font-medium whitespace-nowrap transition-colors",
            active === tab.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
