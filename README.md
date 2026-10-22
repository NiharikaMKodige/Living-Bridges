# Living Bridges

**Every street dog, known by its nose.**

Living Bridges helps feeders, NGOs, communities and municipal teams recognise street dogs from a short nose video and keep one shared record for each dog: its unique ID, vaccination status and sterilisation status. Everything happens inside WhatsApp, with no app to download and no login.

This repository contains the **marketing website and interactive demo** for Living Bridges. The recognition backend will be integrated later.

> **Status:** Front-end only. Dog identification is coming soon and is being tested on fresh field data.

---

## What's in the site

- **Hero** with an animated nose-ridge pattern and a live WhatsApp chat simulator
- **Interactive chat demo** where visitors can type or tap through identifying a dog, registering a new dog and updating a record. The bot's replies type out letter by letter. All data shown is illustrative.
- **About** and **How it works** sections, including credit to the underlying research
- **Who it's for**: feeders, NGOs and vets, communities and RWAs, municipal teams
- **Roadmap** showing identification as coming soon, followed by feeding coordination, ABC drive tracking, dashboards and CSR fund routing
- **Launch waitlist** and **partner enquiry form**
- **FAQ**, header, footer and a floating WhatsApp button
- Light theme, responsive down to mobile, keyboard focus styles and reduced-motion support

## Tech

A single, self-contained HTML file with inline CSS and vanilla JavaScript. There are no build steps, frameworks or dependencies.

- Fonts: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) and [Figtree](https://fonts.google.com/specimen/Figtree) via Google Fonts
- Everything else (icons, nose-print art, chat simulator) is inline SVG, CSS and JS

## Getting started

1. Clone the repository.
2. Rename `living-bridges-demo.html` to `index.html` if you plan to host it (optional).
3. Open the file in any modern browser. That's it.

```bash
git clone https://github.com/<your-org>/living-bridges.git
cd living-bridges
open index.html   # or double-click the file
```

## Configuration

Search the file for these placeholders and replace them before going live:

| What | Where | Placeholder |
| --- | --- | --- |
| WhatsApp number | `var WA_NUMBER` in the script at the bottom | `919999999999` (country code + number, no `+` or spaces) |
| Prefilled WhatsApp message | `WA_TEXT` next to `WA_NUMBER` | "Hi, I'd like to use the Canine ID Bot" |
| Contact email | Contact section and footer | `hello@example.com` |

Every WhatsApp button, including the floating one, reads from `WA_NUMBER`, so you only change it in one place.

## Deploy with GitHub Pages

1. Make sure the page is saved as `index.html` in the repository root.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. The site will be live at `https://<your-org>.github.io/<repo-name>/`.

## Not connected yet

The following are front-end only for now and need the backend:

- **Chat demo**: a scripted simulation, not connected to any model or database
- **Waitlist form** and **partner enquiry form**: they show a thank-you message but do not store or send anything (see the comments in the script)
- **WhatsApp button**: opens a normal chat with the configured number. Once the bot is live, use the number registered with the Meta WhatsApp Cloud API.

## Roadmap

1. **Dog identification and unique ID** (coming soon): nose-print recognition and guided registration
2. Feeding coordination
3. ABC and vaccination drive tracking
4. RWA and institution dashboards
5. CSR fund routing

## Research

The nose-print matching approach builds on published research in canine biometrics, including the paper *"AI-Driven Canine Dog Nose Print Recognition"*. Please credit the original authors wherever this work is presented.

## License

To be decided. Add a `LICENSE` file before making the repository public.