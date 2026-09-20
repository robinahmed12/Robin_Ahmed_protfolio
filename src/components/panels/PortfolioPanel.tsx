"use client";

import { useState } from "react";
import { Check, ExternalLink, GitBranch, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import PanelTitle from "./PanelTitle";

type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image?: string;
  tech: string[];
  features: string[];
  links: { live: string; client: string; server: string };
};

// Filters are a short, hand-picked set of stack families rather than every tag.
// Add or rename entries here; a filter with no matching projects is hidden.
const filters: { label: string; test: (p: Project) => boolean }[] = [
  { label: "All", test: () => true },
  {
    label: "Next.js",
    test: (p) => p.tech.some((t) => t.startsWith("Next.js")),
  },
  { label: "React.js", test: (p) => p.tech.includes("React.js") },
  { label: "Express.js", test: (p) => p.tech.includes("Express.js") },
  { label: "Prisma", test: (p) => p.tech.includes("Prisma") },
  { label: "PostgreSQL", test: (p) => p.tech.includes("PostgreSQL") },
  { label: "MongoDB", test: (p) => p.tech.includes("MongoDB") },
];

const VISIBLE_TECH = 5;

// Card header tiles walk the theme's teal ramp instead of arbitrary colors.
const tileTones = [
  "bg-chart-5",
  "bg-chart-4",
  "bg-chart-3",
  "bg-chart-5",
  "bg-chart-4",
  "bg-chart-3",
];
import Image from "next/image";

function ProjectBanner({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  if (!project.image) {
    <div
      className={cn(
        "flex h-44 items-center justify-center text-3xl font-bold text-primary-foreground",
        tileTones[index % tileTones.length],
      )}
      aria-hidden="true"
    >
      {project.name.slice(0, 2).toUpperCase()}
    </div>;
    return (
      <div
        className={cn(
          "flex h-44 items-center justify-center text-3xl font-bold text-primary-foreground",
          tileTones[index % tileTones.length],
        )}
        aria-hidden="true"
      >
        {project.name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="relative h-44 w-full overflow-hidden">
      <Image
        src={project.image}
        alt={`${project.name} preview`}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={index < 2} // load the first couple eagerly, lazy-load the rest
      />
      {/* subtle gradient so a light screenshot doesn't clash with the card below it */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const extra = project.tech.length - VISIBLE_TECH;

  return (
    <Card className="pt-0">
      <ProjectBanner project={project} index={index} />
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {project.name}
        </CardTitle>
        <CardDescription>{project.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5">
        <p className="line-clamp-3 leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.slice(0, VISIBLE_TECH).map((t) => (
            <li key={t}>
              <Badge variant="outline">{t}</Badge>
            </li>
          ))}
          {extra > 0 && (
            <li>
              <Badge variant="secondary">+{extra} more</Badge>
            </li>
          )}
        </ul>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => onOpen(project)}
          className="flex-1 sm:flex-none"
        >
          Details
        </Button>

        <Button
          nativeButton={false}
          render={
            <a href={project.links.live} target="_blank" rel="noreferrer" />
          }
          className="flex-1 sm:flex-none"
        >
          Live site
          <ExternalLink data-icon="inline-end" />
        </Button>

        <Button
          variant="outline"
          nativeButton={false}
          render={
            <a href={project.links.client} target="_blank" rel="noreferrer" />
          }
          className="flex-1 sm:flex-none"
        >
          <GitBranch data-icon="inline-start" />
          Client code
        </Button>

        <Button
          variant="outline"
          nativeButton={false}
          render={
            <a href={project.links.server} target="_blank" rel="noreferrer" />
          }
          className="flex-1 sm:flex-none"
        >
          <Server data-icon="inline-start" />
          Server code
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PortfolioPanel({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  // `selected` outlives `open` so the dialog keeps its content while it animates closed.
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const available = filters
    .map((f) => ({ ...f, count: projects.filter(f.test).length }))
    .filter((f) => f.count > 0);
  const active = filters.find((f) => f.label === filter) ?? filters[0];
  const visible = projects.filter(active.test);

  const openProject = (p: Project) => {
    setSelected(p);
    setOpen(true);
  };

  return (
    <div>
      <PanelTitle>Portfolio</PanelTitle>
      <div
        role="group"
        aria-label="Filter projects by stack"
        className="mb-6 flex flex-wrap gap-2"
      >
        {available.map((f) => {
          const on = f.label === filter;
          return (
            <Button
              key={f.label}
              size="sm"
              variant={on ? "default" : "outline"}
              aria-pressed={on}
              onClick={() => setFilter(f.label)}
            >
              {f.label}
              <span
                className={cn(
                  "text-xs",
                  on ? "opacity-80" : "text-muted-foreground",
                )}
              >
                {f.count}
              </span>
            </Button>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {visible.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            onOpen={openProject}
          />
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <DialogHeader className="pr-10">
                <DialogTitle className="text-lg">{selected.name}</DialogTitle>
                <DialogDescription>{selected.tagline}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <p className="leading-relaxed text-muted-foreground">
                  {selected.description}
                </p>

                <div>
                  <h4 className="text-sm font-semibold">Key features</h4>
                  <ul className="mt-3 space-y-2.5">
                    {selected.features.map((feature) => (
                      <li key={feature} className="flex gap-3 leading-relaxed">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold">Tech stack</h4>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {selected.tech.map((t) => (
                      <li key={t}>
                        <Badge variant="secondary">{t}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="w-full sm:w-auto"
                  nativeButton={false}
                  render={
                    <a
                      href={selected.links.live}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                >
                  Live site
                  <ExternalLink data-icon="inline-end" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
