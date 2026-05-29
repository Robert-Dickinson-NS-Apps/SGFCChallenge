# SGFCChallenge

A web app for planning trips and routes between **Singapore and Malaysia**, with live border queue times, customizable routes, and fare calculations. Themed in Singapore's national colors.

**Live app:** [replit.com/@robertdickinson/SGFCChallenge](https://replit.com/@robertdickinson/SGFCChallenge)

---

## Overview

SGFCChallenge started as a running-distance app and evolved into a cross-border trip planner focused on the Singapore–Malaysia causeway corridor. It helps you:

- Pick a starting location in Singapore
- Plan a car route across to Malaysia (or back)
- See an interactive map with the route
- Check current border queue times at the checkpoints
- Estimate fares and customize trip parameters

---

## Features

- **Route planner** — calculate car routes between Singapore and Malaysia.
- **Multiple starting locations** — a growing list of pickup points across Singapore.
- **Interactive map** — visualize the full route on a map view.
- **Border queue times** — see wait estimates at the Woodlands / Tuas checkpoints.
- **Customizable trips** — tweak route options and fare assumptions.
- **Fare calculator** — estimate costs for the planned trip.
- **Singapore-themed UI** — styling uses Singapore's national colors.

---

## Tech stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React + Vite + TypeScript |
| UI          | Tailwind CSS + Radix-style components (`components.json`) |
| Backend     | Node.js + Express (`server/`) |
| Database    | Drizzle ORM (`drizzle.config.ts`) |
| Shared code | `shared/` types & schema |
| Hosting     | Replit (`.replit` config) |

---

## Repository structure

```text
SGFCChallenge/
├── client/              # React + Vite frontend
├── server/              # Express API and routing logic
├── shared/              # Shared types & schema
├── attached_assets/     # Images and Singapore-themed assets
├── drizzle.config.ts    # Drizzle ORM configuration
├── components.json      # UI component registry
├── tailwind.config.ts   # Tailwind theme (Singapore colors)
├── postcss.config.js    # PostCSS pipeline
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Scripts and dependencies
└── .replit              # Replit run/deploy configuration
```

---

## Getting started

### Prerequisites

- Node.js 18+
- npm (or pnpm / yarn)

### Clone the repo

```bash
git clone https://github.com/Robert-Dickinson-NS-Apps/SGFCChallenge.git
cd SGFCChallenge
```

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

The Express server (via `tsx`) serves the API and the Vite-built client.

### Build for production

```bash
npm run build
npm start
```

### Apply database schema (if using Drizzle)

```bash
npm run db:push
```

---

## Usage

1. Open the app.
2. Choose a starting location in Singapore.
3. Select a destination in Malaysia (or vice versa).
4. Review the route on the interactive map.
5. Check current border queue times for Woodlands / Tuas.
6. Customize route options and review the fare estimate.

---

## Customization

- **Starting locations** — add new pickup points in the client's location data.
- **Theme** — adjust `tailwind.config.ts` to tweak the Singapore color palette.
- **Fare model** — update fare logic in the server or shared schema.
- **Border data** — swap in your preferred source for live queue times.

---

## About

Built by **Robert Dickinson** as part of the [Robert-Dickinson-NS-Apps](https://github.com/Robert-Dickinson-NS-Apps) collection — a set of single-purpose web apps spanning water engineering, learning communities, and travel/lifestyle tooling. Inspired by frequent travel through the Singapore–Malaysia corridor.

## License

MIT
