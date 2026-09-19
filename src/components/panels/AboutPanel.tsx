import { Cable, Database, Monitor, Server } from "lucide-react";
import PanelTitle from "./PanelTitle";

const services = [
  {
    title: "Frontend Development",
    desc: "Building responsive, accessible interfaces with React, Next.js, Angular, and Tailwind CSS.",
    icon: Monitor,
  },
  {
    title: "Backend Development",
    desc: "Building REST APIs and services with Node.js, Express.js, and .NET Core Web API.",
    icon: Server,
  },
  {
    title: "Database Design",
    desc: "Working with PostgreSQL, SQL Server, and MongoDB for relational and document-based data.",
    icon: Database,
  },
  {
    title: "API Integration",
    desc: "Connecting frontend apps to REST APIs with JWT authentication and clean data flow.",
    icon: Cable,
  },
];

function TextCards({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="rounded-3xl bg-muted/60 px-5 py-4 dark:bg-muted/40">
          <p className="text-[13px] leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );
}

export default function AboutPanel({
  objective,
  strengths,
  softSkills,
}: {
  objective: string;
  strengths: string[];
  softSkills: string[];
}) {
  return (
    <div>
      <PanelTitle>About me</PanelTitle>
      <p className="max-w-[64ch] text-[14px] leading-relaxed text-muted-foreground">
        {objective}
      </p>

      <h3 className="mt-10 mb-4 text-[15px] font-semibold">What I&apos;m doing</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {services.map(({ title, desc, icon: Icon }) => (
          <div key={title} className="rounded-3xl bg-muted/60 p-5 dark:bg-muted/40">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-background text-brand">
              <Icon className="size-[18px]" aria-hidden="true" />
            </div>
            <h4 className="mt-3 text-[14px] font-semibold">{title}</h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <h3 className="mt-10 mb-4 text-[15px] font-semibold">Professional Strengths</h3>
      <TextCards items={strengths} />

      <h3 className="mt-8 mb-4 text-[15px] font-semibold">Soft Skills</h3>
      <TextCards items={softSkills} />
    </div>
  );
}
