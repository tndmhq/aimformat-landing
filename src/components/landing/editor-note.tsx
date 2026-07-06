import { Container } from "@/components/aim/primitives";

export function EditorNote() {
  return (
    <section id="editor" className="relative scroll-mt-16">
      <Container>
        <div className="mx-auto max-w-2xl border-y border-ink/15 py-10 text-center">
          <p className="label-mono mb-4 text-ink-faint">Editor&rsquo;s note</p>
          <p className="font-body text-[1.05rem] italic leading-[1.7] text-ink-soft text-pretty">
            The format is open and complete on its own; everything above works
            today with a text editor and an agent. A premium Tndm editor,
            collaborative, with the red-and-green ink built into the writing
            surface, is being set in type. It is built on the open format, not
            in place of it. Coming soon.
          </p>
          <p className="mt-4 font-body text-[0.95rem] italic text-ink-soft">
            Want it?{" "}
            <a
              href="#cta"
              className="text-oxblood underline-offset-4 hover:underline"
            >
              Say so when you subscribe
            </a>
            {" "}— there is a box for exactly that.
          </p>
        </div>
      </Container>
    </section>
  );
}
