import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ---------------------------------------------------------------------------
// Email capture.
//
// In production, BUTTONDOWN_API_KEY (a Vercel env var) is REQUIRED and signups
// are sent to Buttondown; without it the request fails loudly rather than
// pretending to succeed. In local dev, with no key set, it falls back to
// appending to data/subscribers.json so the form works out of the box.
// Get the key at https://buttondown.com/settings/api
// ---------------------------------------------------------------------------

const SOURCE = "aim-format-landing"
const BUTTONDOWN_ENDPOINT = "https://api.buttondown.com/v1/subscribers"

type Result = "added" | "exists"

// --- Buttondown (production) -----------------------------------------------

async function subscribeViaButtondown(
  email: string,
  editorInterest: boolean,
  apiKey: string
): Promise<Result> {
  const res = await fetch(BUTTONDOWN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      ...(editorInterest ? { tags: ["editor-interest"] } : {}),
    }),
  })

  if (res.ok) return "added"

  // Buttondown returns 400 when the address is already on the list.
  const detail = await res.text()
  if (res.status === 400 && /already|exists|subscribed/i.test(detail)) {
    return "exists"
  }

  throw new Error(`Buttondown responded ${res.status}: ${detail}`)
}

// --- Local file fallback (dev, no API key) ---------------------------------

const DATA_DIR = path.join(process.cwd(), "data")
const STORE = path.join(DATA_DIR, "subscribers.json")

type Subscriber = {
  email: string
  subscribedAt: string
  source: string
  editorInterest?: boolean
}

async function readStore(): Promise<Subscriber[]> {
  try {
    const raw = await fs.readFile(STORE, "utf8")
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function persistToFile(
  email: string,
  editorInterest: boolean
): Promise<Result> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  const subscribers = await readStore()
  const exists = subscribers.some(
    (s) => s.email.toLowerCase() === email.toLowerCase()
  )
  if (exists) return "exists"

  subscribers.push({
    email,
    subscribedAt: new Date().toISOString(),
    source: SOURCE,
    editorInterest,
  })
  await fs.writeFile(STORE, JSON.stringify(subscribers, null, 2) + "\n", "utf8")
  return "added"
}

async function persistSubscriber(
  email: string,
  editorInterest: boolean
): Promise<Result> {
  const apiKey = process.env.BUTTONDOWN_API_KEY
  if (apiKey) return subscribeViaButtondown(email, editorInterest, apiKey)

  // The file fallback is for local dev only. In production the filesystem is
  // ephemeral, so a fake "success" here would silently drop the address —
  // the one failure mode this page cannot afford. Fail loudly instead.
  if (process.env.NODE_ENV === "production") {
    throw new Error("BUTTONDOWN_API_KEY is not set in production.")
  }
  return persistToFile(email, editorInterest)
}

export async function POST(req: Request) {
  let email: unknown
  let editorInterest = false
  try {
    const body = await req.json()
    email = body?.email
    editorInterest = body?.editorInterest === true
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    )
  }

  const normalized = typeof email === "string" ? email.trim() : ""
  if (!normalized || normalized.length > 254 || !EMAIL_RE.test(normalized)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 }
    )
  }

  try {
    const status = await persistSubscriber(normalized, editorInterest)
    return NextResponse.json({ ok: true, status })
  } catch (err) {
    console.error("[subscribe] failed to persist subscriber:", err)
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    )
  }
}
