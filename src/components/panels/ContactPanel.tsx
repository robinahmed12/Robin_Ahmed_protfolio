import { Mail, MapPin, Phone } from "lucide-react";
import ContactActions from "@/components/ContactActions";
import ContactFormDialog from "@/components/ContactFormDialog";
import PanelTitle from "./PanelTitle";

type Profile = { email: string; phone: string; location: string };

const tile = "rounded-3xl bg-muted/60 p-5 dark:bg-muted/40";

function Tile({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className={tile}>
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4 text-brand" />
        <p className="text-[12px]">{label}</p>
      </div>
      <div className="text-[13px] font-medium break-all">{children}</div>
    </div>
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
        <Tile icon={Mail} label="Email">
          <ContactActions
            type="email"
            value={profile.email}
            triggerClassName="transition-colors hover:text-brand"
          >
            {profile.email}
          </ContactActions>
        </Tile>
        <Tile icon={Phone} label="Phone">
          <ContactActions
            type="phone"
            value={profile.phone}
            triggerClassName="transition-colors hover:text-brand"
          >
            {profile.phone}
          </ContactActions>
        </Tile>
        <Tile icon={MapPin} label="Location">
          {profile.location}
        </Tile>
      </div>

      <ContactFormDialog recipientEmail={profile.email} />
    </div>
  );
}
