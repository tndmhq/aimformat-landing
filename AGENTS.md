# AGENTS.md

Guidance for AI agents working in this repository (cross-agent standard file;
Claude Code reads it via the pointer in `CLAUDE.md`).

## Repository

`aimformat-landing` — the **public** marketing site for the open
[`.aim` format](https://github.com/tndmhq/aimformat) (developer audience).
Next.js 16 / React 19 / Tailwind v4; see [`README.md`](README.md) for stack,
structure, and the newsletter setup, and [`TODO.md`](TODO.md) for deferred
work. The editor's landing site is a separate private repo (`tndm-landing`).

**This repo is public: no strategy, pricing, competitor framing, or YC
material.** Site copy follows the writing guidelines kept in the private
workspace (`tndm-workspace/knowledge/`).

## Conventions

> **Source of truth: [`tndmhq/aimformat` `AGENTS.md`](https://github.com/tndmhq/aimformat/blob/main/AGENTS.md)
> — vendored stub; read the full text there and re-sync periodically.**

- **Packages:** web-search the latest stable version first, then install/pin
  that exact version (`npm install <name>@<version>`). Never from memory.
- **Plan before implementing** anything non-trivial; confirm when interactive.
- **Memory:** this repo has no `docs/` memory tiers (placeholder-scale);
  durable decisions about the site go in the workspace log, technical
  format decisions in `aimformat`.
- **Agent-friendliness:** suggest repo improvements for future agents
  proactively.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
