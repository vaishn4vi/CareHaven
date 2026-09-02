# CareHaven

An all-in-one health companion website — track your BMI, hydration and mood, find nearby hospitals, book appointments, manage personal health records, and learn from curated health resources.

## What's in this rebuild

This version fixes the structural bugs in the original project and adds real functionality to every tool. Highlights:

- **Consistent site chrome** (`css/main.css`, `js/site.js`) — a single design system with dark mode, a mobile-friendly nav, working site-wide search, and a 5-language switcher, shared across all pages.
- **Working tools with persistence** (data stored in the browser via `localStorage`, nothing sent to a server):
  - BMI Calculator — now keeps a history and shows trends
  - Water Tracker — personalized goals, streaks, and reminders
  - Mental Health — mood journal, guided breathing exercise, crisis resources
  - Doctor Registration + Book Appointment — registering a doctor makes them bookable
  - Personal Health Records — add records with optional file attachments
  - Hospitals finder — search by city or sort by distance from your location
  - Medicines Info — searchable local reference (not medical advice)
  - Diet Plans, Women's Health, Blood Centers, Video Tutorials — restyled and fixed
- **New: My Dashboard** (`sub-websites/dashboard.html`) — a snapshot pulling together your BMI, water, mood, records and appointments in one place.
- **Security fixes**: removed three hardcoded/exposed API keys (Google Places, Wit.ai, YouTube Data API) that were committed in client-side JavaScript in the original code, and replaced them with equivalent functionality that doesn't require exposing credentials.
- **Bug fixes**: corrected numerous broken absolute paths (`/css/...`, `/js/...` that only work when served from a very specific root), mismatched files (the mental health and mental therapy pages were loading each other's CSS/JS), dead navigation links (to pages that never existed), and a homepage chat script that threw a runtime error on load.

## Running it

This is a static site — no build step or server required. Open `index.html` in a browser, or serve the folder with any static file server for the best experience (e.g. `npx serve .`).

## Notes

- All personal data (BMI history, water logs, mood journal, appointments, records) is stored only in the browser's `localStorage` on the device being used — it is not synced across devices or sent anywhere.
- Medicine and health information throughout the site is general and educational, not medical advice — always consult a qualified professional.
