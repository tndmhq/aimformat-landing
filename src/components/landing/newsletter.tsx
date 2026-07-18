"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  Container,
  RepoLink,
  RunningHead,
} from "@/components/aim/primitives";
import { PressButton } from "@/components/aim/press-button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [editorInterest, setEditorInterest] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, editorInterest }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (res.ok && data.ok) {
        setStatus("success");
        setMessage("Almost there: confirm in your inbox.");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="cta" className="relative scroll-mt-16">
      <RunningHead section="Off the Press" folio="Subscribe" />
      <Container className="py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label-serif text-oxblood">Off the press</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.08] tracking-[-0.01em] text-ink text-balance">
            Subscribe to the press notices
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-[1.15rem] leading-[1.65] text-ink/85 text-pretty">
            One file humans and agents can both hold. The launch, and whatever
            ships after it, arrives here first. Subscribe for the notices: a
            few letters a year, nothing else.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          {/* the tipped-in reply card / subscription slip */}
          <div className="relative rounded-[3px] border border-ink/15 border-t-2 border-t-oxblood/50 [border-top-style:dashed] bg-surface px-6 py-7 shadow-leaf sm:px-8">
            <span
              aria-hidden
              className="absolute -left-2 -top-2 h-4 w-4 rounded-full border border-ink/15 bg-paper"
            />
            <span
              aria-hidden
              className="absolute -right-2 -top-2 h-4 w-4 rounded-full border border-ink/15 bg-paper"
            />

            {status === "success" ? (
              <div
                className="flex flex-col items-center gap-3 py-4 text-center"
                role="status"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-greenline/40 bg-greenline/10 text-greenline">
                  <Check className="size-5" aria-hidden />
                </span>
                <p className="font-display text-xl text-ink">{message}</p>
                <p className="font-body text-[0.92rem] text-ink-soft">
                  Click the confirmation note we just sent, and the next thing
                  you hear from us is the launch.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@studio.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={status === "error"}
                    className="h-11 flex-1 rounded-[2px] border-ink/25 bg-paper/60 px-3.5 font-body text-[1rem] text-ink placeholder:text-ink-faint"
                  />
                  <PressButton
                    type="submit"
                    disabled={status === "loading"}
                    className="h-11 rounded-[2px] px-6"
                  >
                    {status === "loading" ? "Sending…" : "Subscribe"}
                  </PressButton>
                </div>
                <label className="mt-4 flex cursor-pointer items-start gap-2.5 font-body text-[0.95rem] leading-snug text-ink/85">
                  <input
                    type="checkbox"
                    checked={editorInterest}
                    onChange={(e) => setEditorInterest(e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 cursor-pointer accent-oxblood"
                  />
                  <span>
                    Also keep me posted on the{" "}
                    <span className="text-ink">Tndm editor</span>, the
                    Word-meets-Cursor app built on the format.
                  </span>
                </label>
                {status === "error" && (
                  <p
                    className="mt-3 font-body text-[0.9rem] text-redline"
                    role="alert"
                  >
                    {message}
                  </p>
                )}
                <p className="mt-4 font-body text-[0.88rem] leading-snug text-ink-soft">
                  Launch notices arrive here first. No spam, no sharing,
                  unsubscribe in one click.
                </p>
              </form>
            )}
          </div>

          <div className="mt-7 flex flex-col items-center gap-2">
            <RepoLink variant="seal" />
            <p className="font-body text-[0.85rem] text-ink-faint">
              The format is open source under the MIT License: read it, fork it,
              build on it today.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
