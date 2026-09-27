---
name: digital-products
description: >
  Use this skill whenever the user wants to create, design, fact-check, or sell a
  printable digital guide, ebook, workbook, planner, checklist pack, or similar
  low-ticket digital product — especially for Gumroad, but the design and
  fact-checking steps apply to any self-publishing platform. Trigger this for
  requests like "turn this PDF/text into a guide I can sell", "make this look
  premium/print-ready", "help me set up my Gumroad listing", "write my product
  description", "make promo images for my product", or "is it safe to sell this,
  are these facts accurate before I publish". Covers the full pipeline: building a
  print-ready HTML-to-PDF guide with proper pagination and styling, fact-checking
  claims against real sources before publishing, generating marketing screenshots
  and mockups, writing a formatted sales description, and walking through
  Gumroad's product setup (pricing, thumbnail, content upload, discount
  test-purchase, payout settings).
---

# Digital Products: design, fact-check, and sell a printable guide

A end-to-end workflow for turning raw text (or an idea) into a polished, sellable
digital product — most commonly a multi-day guide, workbook, or planner sold as a
PDF on Gumroad. Jump directly to whichever stage the user is at; they rarely need
all of it in one sitting.

## The five stages

1. **Build** — turn the content into a print-ready HTML/CSS document
2. **Fact-check** — verify any factual/health/scientific claims before it goes public
3. **Market** — generate promo screenshots and a formatted sales description
4. **List** — walk the user through Gumroad's product setup screen by screen
5. **Verify & launch** — a real test purchase before telling anyone it exists

Work stage by stage. Most users come back over several sessions — check what they've
already done (published listing, uploaded file, etc.) rather than re-explaining
earlier stages.

---

## Stage 1 — Build the print-ready document

Treat this as a real print design task, not a webpage. Read `/mnt/skills/public/frontend-design/SKILL.md`
before styling if it's available — it has design-token and layout guidance that
applies here too. Use a headless-browser tool (e.g. Playwright) to render the HTML
to PDF and *measure* overflow per page rather than eyeballing it — see the technique
below.

**Structure**
- One `<article class="page">` per printed page, fixed to the target paper size
  (`210mm × 297mm` for A4) with `page-break-before: always` (and `break-before: page`)
  applied via a shared class, so every logical page break is explicit rather than
  left to the browser's flow.
- A cover page is full-bleed (image edge-to-edge, no padding).
- Give every page a footer/folio (page number, section label) except the cover.

**Typography & palette**
- Pull 2–3 Google Fonts that suit the subject (a bold display face for headers, a
  clean sans for body, optionally a serif-italic accent for pull quotes).
- Derive the palette from the cover image or the subject matter: one dark "ink"
  color, one soft neutral background, one accent used sparingly (never as body
  text color).

**Recurring content devices worth reusing**
- Custom checkboxes: hide the native `<input type="checkbox">` visually (not with
  `display:none`, so it stays accessible) and style a sibling `<span>` as the box,
  with a `:checked + span` rule for the fill/check state. This is a lot more
  "premium" than default browser checkboxes and works when printed or filled in a
  PDF viewer.
- Fill-in fields: a label plus a `border-bottom` line instead of a boxed `<input>`
  — reads as a workbook, not a web form.
- Numbered "day" or "step" pages: a large outline-stroked number (`-webkit-text-stroke`
  with transparent fill) as a background flourish behind the heading.
- A progress indicator (row of dots/segments) in the footer when the product has a
  multi-day or multi-step structure, filled up to the current day.

**Verifying it actually fits the page**
Don't trust visual inspection alone for a 20+ page document. Render the HTML with
a headless browser and script a per-page overflow check:
```python
# For each .page, compare its content box's scrollHeight to its clientHeight.
# Any positive value means that page's content overflows onto the next one.
```
Run this after every content or CSS change touching shared page styles. Also
render at least one pass with a fallback system font (in case the real Google Font
fails to load in the check environment) to make sure margins have slack — text set
in a wider fallback font is the most common cause of last-minute overflow.

**Exporting**
The deliverable to the user is the single self-contained HTML file (fonts via
`<link>`, no external local assets). Tell them to open it in Chrome and use
"Save as PDF" with Paper=A4 (or Letter), Margins=None, and Background graphics ON
— all three matter, and background graphics is the one people miss. If the artifact
publishing tool is available in the session, prefer publishing an HTML page over
generating a PDF directly, and give printing instructions in-page.

---

## Stage 2 — Fact-check before anything goes on sale

Any product making factual, scientific, or health-adjacent claims needs a genuine
verification pass before the user is told it's safe to sell — don't assume content
(including content Claude itself helped draft) is accurate by default.

- Extract every discrete factual claim (numbers, mechanisms, named effects,
  "studies show" type statements).
- Web-search each one that isn't rock-solid common knowledge; prefer primary
  sources (health agencies, peer-reviewed reviews/meta-analyses) over secondary
  blog summaries.
- Report back claim-by-claim: confirmed as-is, confirmed with a caveat (and give
  the tighter phrasing), or unsupported (and suggest a fix or removal).
- Flag anything that reads as a guaranteed-outcome or medical/diagnostic claim
  ("cures," "guaranteed," diagnosing a condition) — these create real policy risk
  on marketplaces, independent of whether the underlying fact is true. Suggest
  outcome-neutral phrasing ("a practical plan for X" rather than "guaranteed to
  fix X").
- If the product touches health, finance, or legal topics, check whether it has
  (or needs) a plain disclaimer section, and that the sales description doesn't
  contradict it with an overpromise.
- Separately, flag IP/rights questions the user should confirm themselves: is the
  cover art theirs to sell (AI-generated images are generally fine if the tool's
  terms grant commercial rights to the user — confirm which tool), are any fonts
  used under a license that permits embedding in a sold PDF (Google Fonts / OFL
  fonts are), is any reference text quoted rather than paraphrased.

---

## Stage 3 — Marketing assets

**Promo screenshots**: don't rely on the live product's fonts being available in a
sandboxed/offline tool environment — check first, and if the real fonts can't load,
render with close visual substitutes and tell the user plainly that the final
images should be regenerated from real screenshots once they have the exported PDF,
if pixel-perfect accuracy matters to them.

Compose 3–5 wide (16:9) marketing images, each: one short benefit headline + one
supporting line + 1–3 angled/overlapping page screenshots from the actual product,
on a background that echoes the cover's palette. Vary which interior pages get
featured across the set (a "how it works" page, a tracker/log page, a checklist
page, the cover + table of contents) — this is one of the highest-leverage things
for conversion because buyers can't otherwise tell what they're getting before
paying.

**Sales description**: format for scanability, not just correctness — bold the
product name and key phrases, use real headings for sections (What's inside / How
it works / The details), pull the opening pain-point lines into a blockquote, and
end with a short plain disclaimer if the fact-check stage flagged one. If the
platform's editor is a rich-text box, it's often easier to build the formatted copy
as a small HTML page with a "copy" button (using the Clipboard API's
`text/html` type so bold/headings paste correctly) than to describe formatting
instructions for the user to apply by hand — see `references/copy-button-pattern.md`
if a bundled example is present, or otherwise construct one directly: a styled
`<div id="desc">` holding the real formatted markup, plus a button that copies
`el.innerHTML` as `text/html` and `el.innerText` as a `text/plain` fallback.

---

## Stage 4 — Gumroad listing walkthrough

Users are often on mobile and screenshot their way through Gumroad's settings —
work from what they send rather than assuming the current UI layout, since Gumroad
changes it. Field-by-field guidance to give:

- **Thumbnail**: square, ≥600×600px — use the cover art itself if it's already
  square.
- **Cover images** (the carousel): lead with the full cover, then 3–5 interior
  marketing screenshots (Stage 3) — this materially affects conversion.
- **Summary**: one sentence, shown next to the buy button — the core promise plus
  format.
- **Additional details** (bullet list): format, page count, "program length" if
  applicable, time commitment, printable yes/no — Gumroad's own guidance says this
  is what helps someone decide to buy, so don't leave it empty.
- **Pricing**: no strong opinion needed unless asked, but note that Gumroad's flat
  $0.50-per-transaction component means very low prices ($1–3) lose a large
  fraction to fees.
- **Versions**: skip unless they want a second format (e.g. a Letter-size PDF
  alongside A4).
- **Settings toggles worth flagging**: "publicly show number of sales" (suggest
  leaving off until there's real social proof), "mark as e-publication for VAT"
  (relevant for EU buyers, worth turning on for an ebook/PDF), refund policy
  (a 30-day refund policy is normal for low-ticket digital products and builds
  trust more than it costs).
- **Content tab**: this is where the actual deliverable file gets uploaded — flag
  clearly that a listing with no file here will charge buyers and deliver
  nothing. Suggest a short welcome note above the file (how to start) and a
  receipt-email message.
- **Payout / bank details**: reassure the user this is only for receiving payouts,
  not a charge to them — Gumroad has no monthly fee, only a per-sale cut (as of
  writing, roughly 10% + $0.50 on direct sales, higher on Discover-marketplace
  sales, plus standard card processing) taken out of what buyers pay. If they're
  filling in IBAN/bank fields, remind them the payee name must match the bank
  account exactly, and to copy-paste the IBAN rather than retype it.

---

## Stage 5 — Verify before launch

Always push for a real test purchase before the user shares the link publicly:
1. Create a single-use 100%-off discount code scoped to just this product.
2. Buy it themselves (ideally in a private/incognito window, or note that buying
   while logged in as the product's own creator may bypass payment entirely —
   that's expected and still confirms delivery, but doesn't test the actual
   checkout flow a stranger will see, so a logged-out pass is worth doing too if
   they want full confidence).
3. Confirm: the receipt email arrives with the right message, the file downloads
   and opens cleanly, fonts/colors render as intended (not a fallback font), and
   the cover/thumbnail look right on the listing page.
4. Delete the discount code afterward so it can't be reused.

Only after this passes is it worth moving on to promotion (social posts, Pinterest,
etc.) — happy to help draft those next if asked.
