import {
  Container,
  RunningHead,
  SectionHeader,
} from "@/components/aim/primitives";
import { cn } from "@/lib/utils";

const columns = ["Open", "AI-native", "Layout", "Propose / accept", "Renders itself"];

const rows: {
  name: string;
  highlight?: boolean;
  cells: string[];
}[] = [
  { name: ".aim", highlight: true, cells: ["✓", "✓", "✓", "✓", "✓"] },
  { name: "Markdown", cells: ["✓", "partial", "—", "—", "needs renderer"] },
  { name: "DOCX", cells: ["partial", "—", "✓", "track-changes only", "needs app"] },
  { name: "PPTX", cells: ["partial", "—", "✓", "—", "needs app"] },
  { name: "PDF", cells: ["partial", "—", "✓", "—", "read-only"] },
  {
    name: "Notion / Gamma",
    cells: ["—", "in-app only", "✓", "in-app only", "closed service"],
  },
];

function Cell({ value, accent }: { value: string; accent?: boolean }) {
  if (value === "✓")
    return (
      <span className={cn("text-[1.05rem]", accent ? "text-accent" : "text-ink")}>
        ✓
      </span>
    );
  if (value === "—") return <span className="text-ink-faint">—</span>;
  return (
    <span className="font-body text-[0.82rem] text-ink-soft">{value}</span>
  );
}

export function Ledger() {
  return (
    <section id="comparison" className="relative scroll-mt-16">
      <RunningHead section="§7" folio="The Ledger" />
      <Container className="py-20 sm:py-24">
        <SectionHeader
          n="§7"
          eyebrow="§7 · The Ledger"
          title="Where .aim sits"
          lede="The footnotes in §1 carry the argument; this is the same argument made scannable. Five properties, the formats people reach for today, and the one that has all five."
        />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-ink/30">
                <th className="label-mono py-3 pr-4 font-normal text-ink-soft">
                  Format
                </th>
                {columns.map((c) => (
                  <th
                    key={c}
                    className="label-mono px-3 py-3 text-center font-normal text-ink-soft"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.name}
                  className={cn(
                    "border-b border-ink/12",
                    row.highlight && "bg-highlight/55",
                  )}
                >
                  <th
                    scope="row"
                    className={cn(
                      "py-3.5 pr-4 text-left font-display text-[1.15rem] font-medium",
                      row.highlight
                        ? "border-l-2 border-accent pl-3 text-ink"
                        : "pl-[2px] text-ink",
                    )}
                  >
                    {row.name}
                  </th>
                  {row.cells.map((value, i) => (
                    <td key={i} className="px-3 py-3.5 text-center">
                      <Cell value={value} accent={row.highlight} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-7 measure font-body text-[0.95rem] leading-relaxed text-ink-soft">
          <span className="text-ink">AI-native</span> means a frontier model can
          read and write the raw file accurately with no special tooling.{" "}
          <span className="text-ink">Renders itself</span> means the file is the
          styled artifact, not a representation a separate application must
          reconstruct. Notion and Gamma are excellent products, but closed: you
          cannot hold the file, and an agent cannot read it without their
          service. Markdown is the closest open analog; .aim keeps its openness
          and adds layout, slides, stable chunks, and propose-and-accept.
        </p>
      </Container>
    </section>
  );
}
