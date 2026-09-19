import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import PanelTitle from "./PanelTitle";

type Profile = { email: string; phone: string; location: string };

const tile = "rounded-3xl bg-muted/60 p-5 dark:bg-muted/40";

function Tile({
  icon: Icon,
  label,
  children,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4 text-brand" />
        <p className="text-[12px]">{label}</p>
      </div>
      <p className="text-[13px] font-medium break-all">{children}</p>
    </>
  );
  return href ? (
    <a href={href} className={`${tile} block transition-colors hover:bg-muted`}>
      {body}
    </a>
  ) : (
    <div className={tile}>{body}</div>
  );
}

export default function ContactPanel({ profile }: { profile: Profile }) {
  return (
    <div>
      <PanelTitle>Contact</PanelTitle>
      <p className="max-w-[56ch] text-[14px] leading-relaxed text-muted-foreground">
        Open to junior and full-stack roles, and freelance work. Email is the
        fastest way to reach me.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Tile icon={Mail} label="Email" href={`mailto:${profile.email}`}>
          {profile.email}
        </Tile>
        <Tile icon={Phone} label="Phone" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
          {profile.phone}
        </Tile>
        <Tile icon={MapPin} label="Location">
          {profile.location}
        </Tile>
      </div>

      <Button
        size="lg"
        className="mt-8"
        nativeButton={false}
        render={<a href={`mailto:${profile.email}`} />}
      >
        <Send data-icon="inline-start" />
        Send a message
      </Button>
    </div>
  );
}
