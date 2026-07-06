"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProposalStatus } from "@/lib/snippets";

/** Two letterpress-style buttons. Semantic green/red, reserved for the demo. */
export function AcceptRejectChips({
  size = "md",
  onAccept,
  onReject,
  className,
}: {
  size?: "sm" | "md";
  onAccept: () => void;
  onReject: () => void;
  className?: string;
}) {
  const pad =
    size === "sm" ? "px-2 py-0.5 text-[0.62rem]" : "px-2.5 py-1 text-[0.72rem]";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={onAccept}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1 rounded-[2px] border border-greenline/45 bg-greenline/10 font-mono tracking-wide text-greenline transition-colors hover:border-greenline hover:bg-greenline/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-greenline",
          pad,
        )}
      >
        Accept <span aria-hidden>✓</span>
      </button>
      <button
        type="button"
        onClick={onReject}
        className={cn(
          "inline-flex cursor-pointer items-center gap-1 rounded-[2px] border border-redline/45 bg-redline/10 font-mono tracking-wide text-redline transition-colors hover:border-redline hover:bg-redline/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redline",
          pad,
        )}
      >
        Reject <span aria-hidden>✗</span>
      </button>
    </div>
  );
}

function statusLine(status: ProposalStatus) {
  if (status === "accepted")
    return "accepted · folded into the document · record kept in the file";
  if (status === "rejected")
    return "rejected · document unchanged · record kept in the file";
  return "proposed by Claude · 14:32";
}

/**
 * The page's showpiece: a clause actively marked up in two-color editor's ink,
 * with the agent attribution and working accept/reject buttons. Click Accept
 * and the proposal folds into the text; click Reject and it withdraws. Either
 * way the record stays — which is the format's whole argument, enacted.
 *
 * Uncontrolled by default; pass `status` + `onStatusChange` to control it
 * (the three-lane figure does, so the lanes and the source update in step).
 */
export function RedlineDemo({
  status: controlledStatus,
  onStatusChange,
  chipSize = "md",
  proseClassName,
  className,
}: {
  status?: ProposalStatus;
  onStatusChange?: (status: ProposalStatus) => void;
  chipSize?: "sm" | "md";
  proseClassName?: string;
  className?: string;
}) {
  const [internalStatus, setInternalStatus] = useState<ProposalStatus>("pending");
  const status = controlledStatus ?? internalStatus;
  const setStatus = (s: ProposalStatus) => {
    setInternalStatus(s);
    onStatusChange?.(s);
  };

  return (
    <div className={cn("font-body", className)}>
      <p
        aria-live="polite"
        className={cn(
          "text-[1.06rem] leading-[1.9] text-ink",
          proseClassName,
        )}
      >
        The Vendor shall deliver the completed milestones within{" "}
        {status === "pending" && (
          <>
            <span className="redline">sixty (60) days</span>{" "}
            <span className="greenline">thirty (30) business days</span>
          </>
        )}
        {status === "accepted" && (
          <span className="rounded-[2px] bg-greenline/15 px-0.5">
            thirty (30) business days
          </span>
        )}
        {status === "rejected" && <span>sixty (60) days</span>}{" "}
        of the effective date.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        {status === "pending" ? (
          <AcceptRejectChips
            size={chipSize}
            onAccept={() => setStatus("accepted")}
            onReject={() => setStatus("rejected")}
          />
        ) : (
          <button
            type="button"
            onClick={() => setStatus("pending")}
            className="label-mono cursor-pointer text-ink-soft underline decoration-ink/30 underline-offset-4 transition-colors hover:text-oxblood"
          >
            ↺ reopen the proposal
          </button>
        )}
        <span
          className={cn(
            "font-body text-[0.85rem] italic",
            status === "pending" ? "text-oxblood" : "text-ink-soft",
          )}
        >
          {statusLine(status)}
        </span>
      </div>
    </div>
  );
}
