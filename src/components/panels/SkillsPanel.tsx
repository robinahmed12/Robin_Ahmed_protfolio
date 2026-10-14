import { Badge } from "@/components/ui/badge";
import TechIcon from "@/components/TechIcon";
import PanelTitle from "./PanelTitle";

export default function SkillsPanel({
  skills,
}: {
  skills: Record<string, string[]>;
}) {
  return (
    <div>
      <PanelTitle>Skills</PanelTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, list]) => (
          <div key={category} className="rounded-3xl bg-muted/60 p-5 dark:bg-muted/40">
            <p className="text-[13px] font-semibold">{category}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {list.map((skill) => (
                <Badge key={skill} variant="outline" className="h-auto whitespace-normal py-0.5">
                  <TechIcon skill={skill} data-icon="inline-start" />
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
