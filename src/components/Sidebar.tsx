"use client";

import { useState } from "react";
import { ChevronDown, Download, Globe, Mail, MapPin, Phone } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import IconLink from "@/components/IconLink";
import ContactActions from "@/components/ContactActions";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  image?: string; 
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand">
        <Icon className="size-3.5" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <div className="text-[13px] break-all">{children}</div>
      </div>
    </li>
  );
}

export default function Sidebar({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const hover = "transition-colors hover:text-brand";

  return (
    <aside className="rounded-4xl bg-card p-6 text-card-foreground shadow-md ring-1 ring-foreground/5 dark:ring-foreground/10">
      <div className="flex items-center gap-4 sm:flex-col sm:text-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-3xl bg-primary text-xl font-semibold text-primary-foreground sm:size-28 sm:rounded-4xl sm:text-3xl">
          {/* {initials(profile.name)} */}
          <img className="rounded-2xl" src="/WhatsApp Image 2026-08-16 at 4.45.37 PM.jpeg" alt="image" />
        </div>

        <div className="sm:mt-1">
          <h1 className="text-base font-semibold sm:text-lg">{profile.name}</h1>
          <Badge variant="secondary" className="mt-2 h-auto px-2.5 py-1 whitespace-normal">
            {profile.role}
          </Badge>
        </div>

        <div className="ml-auto sm:ml-0">
          <ThemeToggle />
        </div>
      </div>

      <Separator className="my-5" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-[13px] font-medium sm:justify-center sm:gap-2"
      >
        {open ? "Hide contacts" : "Show contacts"}
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {!open && (
        <ul className="mt-4 space-y-4">
          <ContactRow icon={Mail} label="Email">
            <ContactActions type="email" value={profile.email} triggerClassName={hover}>
              {profile.email}
            </ContactActions>
          </ContactRow>
          <ContactRow icon={Phone} label="Phone">
            <ContactActions type="phone" value={profile.phone} triggerClassName={hover}>
              {profile.phone}
            </ContactActions>
          </ContactRow>
          <ContactRow icon={MapPin} label="Location">
            {profile.location}
          </ContactRow>
        </ul>
      )}

      <Separator className="my-5" />

      <div className="flex justify-center gap-1">
        {/* <IconLink href={profile.portfolio} label="Portfolio site">
          <Globe />
        </IconLink> */}
        <IconLink href={profile.github} label="GitHub">
          <GithubIcon />
        </IconLink>
        <IconLink href={profile.linkedin} label="LinkedIn">
          <LinkedinIcon />
        </IconLink>
      </div>

      <Button
        size="lg"
        className="mt-5 w-full"
        nativeButton={false}
        render={
          <a href="/docs/Resume_of_Robin_Ahmed.pdf" download="Robin_Ahmed_Resume.pdf" />
        }
      >
        <Download data-icon="inline-start" />
        Download resume
      </Button>
    </aside>
  );
}
