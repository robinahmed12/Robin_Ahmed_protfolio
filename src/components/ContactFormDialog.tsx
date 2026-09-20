"use client";

import { useState } from "react";
import { Check, Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full rounded-2xl border-none bg-muted/60 px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30 dark:bg-muted/40";

const labelClass = "text-[12px] font-medium text-muted-foreground";

export default function ContactFormDialog({
  recipientEmail,
}: {
  recipientEmail: string;
}) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  function reset() {
    setValues({ name: "", email: "", subject: "", message: "" });
    setStatus("idle");
    setError("");
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) reset();
  }

  function update(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    try {
      const body = new FormData();
      for (const [key, value] of Object.entries(values)) {
        body.append(key, value);
      }

      const res = await fetch("/api/contact", { method: "POST", body });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setError(
          data.error ?? "Could not send your message. Please try again later."
        );
        return;
      }

      setStatus("done");
    } catch {
      setStatus("error");
      setError(
        "Network error. Please check your connection and try again, or email me directly."
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button size="lg" className="mt-8">
            <Send data-icon="inline-start" />
            Send a message
          </Button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send a message</DialogTitle>
          <DialogDescription>
            This goes straight to my inbox ({recipientEmail}). I usually reply
            within a day.
          </DialogDescription>
        </DialogHeader>

        {status === "done" ? (
          <>
            <div className="flex flex-col items-center gap-3 rounded-3xl bg-muted/60 py-10 text-center dark:bg-muted/40">
              <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-brand">
                <Check className="size-6" />
              </span>
              <p className="text-sm font-medium">Message sent successfully!</p>
              <p className="max-w-[32ch] text-[13px] text-muted-foreground">
                Thanks for reaching out — I&apos;ll get back to you as soon as I
                can.
              </p>
            </div>
            <DialogFooter showCloseButton>
              <DialogClose render={<Button variant="outline" />}>
                Close
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className={labelClass}>Your name</span>
                <input
                  className={inputClass}
                  name="name"
                  value={values.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="John Doe"
                  required
                  minLength={2}
                />
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>Your email</span>
                <input
                  className={inputClass}
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </label>
            </div>
            <label className="grid gap-1.5">
              <span className={labelClass}>Subject</span>
              <input
                className={inputClass}
                name="subject"
                value={values.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="Job opportunity / project inquiry"
                required
                minLength={2}
              />
            </label>
            <label className="grid gap-1.5">
              <span className={labelClass}>Message</span>
              <textarea
                className={`${inputClass} min-h-32 resize-none`}
                name="message"
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell me about your project or opportunity..."
                required
                minLength={10}
              />
            </label>

            {status === "error" && (
              <p className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-[13px] text-destructive">
                {error}
              </p>
            )}

            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" && (
                  <Loader2 data-icon="inline-start" className="animate-spin" />
                )}
                {status === "sending" ? "Sending..." : "Send message"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}