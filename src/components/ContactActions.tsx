"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  Mail,
  MessageCircle,
  Phone as PhoneIcon,
} from "lucide-react";
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
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ContactActions({
  type,
  value,
  triggerClassName,
  children,
}: {
  type: "email" | "phone";
  value: string;
  triggerClassName?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const isEmail = type === "email";
  const telHref = `tel:${value.replace(/\s/g, "")}`;
  const waHref = `https://wa.me/${value.replace(/[^0-9]/g, "")}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            aria-label={`${isEmail ? "Email" : "Phone"}: ${value}`}
            className={cn(
              "inline-flex cursor-pointer items-start gap-3 text-left",
              triggerClassName
            )}
          >
            {children}
          </button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEmail ? "Email" : "Phone number"}</DialogTitle>
          <DialogDescription>
            {isEmail
              ? "Use my email for job opportunities, freelance work, or project inquiries."
              : "Reach me by phone or WhatsApp — I'm happy to connect."}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-3xl bg-muted/60 px-4 py-3.5 text-center dark:bg-muted/40">
          <p className="text-sm font-medium break-all">{value}</p>
        </div>

        <div className="grid gap-2">
          {isEmail && (
            <DialogClose
              nativeButton={false}
              render={
                <a
                  href={`mailto:${value}`}
                  className={buttonVariants({ variant: "outline", className: "w-full" })}
                >
                  <Mail data-icon="inline-start" />
                  Open mail client
                </a>
              }
            />
          )}

          {!isEmail && (
            <>
              <DialogClose
                nativeButton={false}
                render={
                  <a
                    href={telHref}
                    className={buttonVariants({ variant: "outline", className: "w-full" })}
                  >
                    <PhoneIcon data-icon="inline-start" />
                    Call now
                  </a>
                }
              />
              <DialogClose
                nativeButton={false}
                render={
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className={buttonVariants({ variant: "outline", className: "w-full" })}
                  >
                    <MessageCircle data-icon="inline-start" />
                    Message on WhatsApp
                  </a>
                }
              />
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            variant={copied ? "secondary" : "default"}
            className="w-full"
            onClick={copy}
          >
            {copied ? (
              <Check data-icon="inline-start" />
            ) : (
              <Copy data-icon="inline-start" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}