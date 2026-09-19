import { Badge } from "@/components/ui/badge";
import PanelTitle from "./PanelTitle";

type ExperienceItem = {
  company: string;
  title: string;
  period: string;
  points: string[];
};

type Language = { name: string; level: string };

export default function ResumePanel({
  experience,
  skills,
  languages,
}: {
  experience: ExperienceItem[];
  skills: Record<string, string[]>;
  languages: Language[];
}) {
  return (
    <div>
      <PanelTitle>Experience</PanelTitle>
      <ol className="space-y-8 border-l pl-6">
        {experience.map((item) => (
          <li key={item.company} className="relative">
            <span
              className="absolute top-1.5 -left-[30px] size-2.5 rounded-full bg-brand ring-4 ring-card"
              aria-hidden="true"
            />
            <p className="text-[12px] text-brand">{item.period}</p>
            <h3 className="mt-1 text-[14px] font-semibold">
              {item.title}
              <span className="font-normal text-muted-foreground"> · {item.company}</span>
            </h3>
            <ul className="mt-3 space-y-2">
              {item.points.map((p) => (
                <li key={p} className="flex gap-3 text-[13px] leading-relaxed text-muted-foreground">
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <PanelTitle>My skills</PanelTitle>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, list]) => (
            <div key={category} className="rounded-3xl bg-muted/60 p-5 dark:bg-muted/40">
              <p className="text-[13px] font-semibold">{category}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {list.map((skill) => (
                  <Badge key={skill} variant="outline" className="h-auto whitespace-normal py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <PanelTitle>Languages</PanelTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          {languages.map((l) => (
            <div key={l.name} className="rounded-3xl bg-muted/60 px-5 py-4 dark:bg-muted/40">
              <p className="text-[13px] font-semibold">{l.name}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{l.level}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
