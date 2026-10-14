import type { ComponentType, SVGProps } from "react";
import {
  SiAngular,
  SiCss,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGooglechrome,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiRedis,
  SiShadcnui,
  SiStripe,
  SiTailwindcss,
  SiTanstack,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import {
  ChartLine,
  Clock,
  Code,
  Database,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type Entry = { Icon: IconComponent; color: string };

// Brand colors from Simple Icons; monochrome-black logos switch to white in
// dark mode. Generic lucide fallbacks use the theme brand color.
// Keys must match the skill strings in src/data/db.json exactly.
const icons: Record<string, Entry> = {
  // Frontend
  HTML5: { Icon: SiHtml5, color: "text-[#e34f26]" },
  CSS3: { Icon: SiCss, color: "text-[#1572b6]" },
  JavaScript: { Icon: SiJavascript, color: "text-[#f7df1e]" },
  TypeScript: { Icon: SiTypescript, color: "text-[#3178c6]" },
  Angular: { Icon: SiAngular, color: "text-[#dd0031]" },
  "React.js": { Icon: SiReact, color: "text-[#61dafb]" },
  "Next.js": { Icon: SiNextdotjs, color: "text-black dark:text-white" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "text-[#06b6d4]" },
  "Responsive Design": { Icon: MonitorSmartphone, color: "text-brand" },

  // Backend
  "Node.js": { Icon: SiNodedotjs, color: "text-[#5fa04e]" },
  "Express.js": { Icon: SiExpress, color: "text-black dark:text-white" },
  "REST APIs": { Icon: Network, color: "text-brand" },
  "JWT Authentication": { Icon: SiJsonwebtokens, color: "text-[#fb015b]" },
  "Role-Based Access Control (RBAC)": { Icon: ShieldCheck, color: "text-brand" },

  // Validation / State
  Zod: { Icon: SiZod, color: "text-[#3e67b1]" },
  "React Hook Form": { Icon: SiReacthookform, color: "text-[#ec5990]" },
  "TanStack Form": { Icon: SiTanstack, color: "text-[#ff4154]" },
  "TanStack Query": { Icon: SiReactquery, color: "text-[#ff4154]" },

  // ORM / Database
  "Prisma ORM": { Icon: SiPrisma, color: "text-[#2d3748] dark:text-white" },
  PostgreSQL: { Icon: SiPostgresql, color: "text-[#4169e1]" },
  "SQL Server": { Icon: Database, color: "text-brand" },

  // Caching / Background Jobs
  Redis: { Icon: SiRedis, color: "text-[#ff4438]" },
  "Node Cron": { Icon: Clock, color: "text-brand" },
  BullMQ: { Icon: Workflow, color: "text-[#d6453d]" },

  // Tools
  Git: { Icon: SiGit, color: "text-[#f05032]" },
  GitHub: { Icon: SiGithub, color: "text-black dark:text-white" },
  "VS Code": { Icon: Code, color: "text-[#007acc]" },
  "Chrome DevTools": { Icon: SiGooglechrome, color: "text-[#4285f4]" },
  Figma: { Icon: SiFigma, color: "text-[#f24e1e]" },

  // Project Exposure
  MongoDB: { Icon: SiMongodb, color: "text-[#47a248]" },
  "Firebase Auth": { Icon: SiFirebase, color: "text-[#dd2c00]" },
  Stripe: { Icon: SiStripe, color: "text-[#635bff]" },
  Recharts: { Icon: ChartLine, color: "text-brand" },
  GSAP: { Icon: SiGreensock, color: "text-[#88ce02]" },
  "shadcn/ui": { Icon: SiShadcnui, color: "text-black dark:text-white" },
};

const fallback: Entry = { Icon: Code, color: "text-brand" };

export default function TechIcon({
  skill,
  className,
  ...props
}: { skill: string } & SVGProps<SVGSVGElement>) {
  const { Icon, color } = icons[skill] ?? fallback;
  return <Icon aria-hidden="true" className={cn(color, className)} {...props} />;
}
