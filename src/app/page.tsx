"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import db from "@/data/db.json";
import Sidebar from "@/components/Sidebar";
import NavTabs, { TabId } from "@/components/NavTabs";
import AboutPanel from "@/components/panels/AboutPanel";
import ResumePanel from "@/components/panels/ResumePanel";
import PortfolioPanel from "@/components/panels/PortfolioPanel";
import ContactPanel from "@/components/panels/ContactPanel";

const sectionIds: TabId[] = ["about", "resume", "portfolio", "contact"];

const sectionClass =
  "scroll-mt-24 rounded-4xl bg-card p-6 text-card-foreground shadow-md ring-1 ring-foreground/5 dark:ring-foreground/10 sm:p-8";

export default function Home() {
  const [active, setActive] = useState<TabId>("about");
  const lockUntil = useRef(0);

  // Scrollspy: the section whose top has passed 40% of the viewport is active.
  const sync = useCallback(() => {
    if (Date.now() < lockUntil.current) return;
    const line = window.innerHeight * 0.4;
    let current: TabId = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= line) current = id;
    }
    // The last section is short; pin it once the page bottoms out.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sectionIds[sectionIds.length - 1];
    }
    setActive(current);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const handleNavChange = (id: TabId) => {
    setActive(id);
    // Let the smooth scroll finish before scrollspy takes over again.
    lockUntil.current = Date.now() + 800;
    window.setTimeout(sync, 850);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-dvh bg-muted/60 dark:bg-background">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-[280px_1fr]">
          <div className="sm:sticky sm:top-8 sm:h-fit">
            <Sidebar profile={db.profile} />
          </div>

          <div className="min-w-0">
            <div className="sticky top-4 z-10">
              <NavTabs active={active} onChange={handleNavChange} />
            </div>

            <main className="mt-6 space-y-6">
              <section id="about" className={sectionClass}>
                <AboutPanel
                  objective={db.profile.objective}
                  strengths={db.professionalStrengths}
                  softSkills={db.softSkills}
                />
              </section>

              <section id="resume" className={sectionClass}>
                <ResumePanel
                  experience={db.experience}
                  skills={db.skills}
                  languages={db.languages}
                />
              </section>

              <section id="portfolio" className={sectionClass}>
                <PortfolioPanel projects={db.projects} />
              </section>

              <section id="contact" className={sectionClass}>
                <ContactPanel profile={db.profile} />
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
