#Full Website

Complete multi-page construction website built with React + TypeScript + Tailwind CSS + React Router.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Folder Structure

```
brikly-full/
├── public/
│   └── favicon.svg
├── src/
│   ├── pages/
│   │   ├── HomePage.tsx          # / — main landing page
│   │   ├── AboutPage.tsx         # /about — about page
│   │   └── ServicesPage.tsx      # /services — services page
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.tsx        # Shared nav (active link per route)
│   │   │   └── Footer.tsx        # Shared footer (4-col with contact info)
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx          # Full-screen hero
│   │   │   ├── Features.tsx      # On Time / ISO Certified / Quality Materials
│   │   │   ├── About.tsx         # About section with image layout
│   │   │   ├── Services.tsx      # 3 service cards → links to /services
│   │   │   ├── Projects.tsx      # 2x2 project gallery
│   │   │   ├── CTA.tsx           # "Let's Build Your Dream Home" banner
│   │   │   ├── Testimonials.tsx  # Client review cards
│   │   │   ├── Stats.tsx         # 100+ clients / 10 Yrs warranty
│   │   │   ├── Partners.tsx      # Partner logos bar
│   │   │   └── WhyUs.tsx         # 2x2 "What Sets Us Apart" grid
│   │   │
│   │   ├── about/
│   │   │   ├── AboutHero.tsx     # Dark hero "Building With Purpose"
│   │   │   ├── AboutIntro.tsx    # "Built in Austin. Trusted Across Central Texas."
│   │   │   ├── StatsGrid.tsx     # 100+ Projects / 80+ Clients / 110% Commitment
│   │   │   ├── VisionMission.tsx # Vision, Mission & Values cards
│   │   │   ├── WhatDrivesUs.tsx  # Worker illustration + checklist
│   │   │   └── AboutCTA.tsx      # "From Idea to Reality" lime banner
│   │   │
│   │   └── services/
│   │       ├── ServicesHero.tsx  # Dark hero "Our Construction Solutions"
│   │       ├── ServicesList.tsx  # Residential / Commercial / Renovation rows
│   │       ├── Process.tsx       # 3-step process cards
│   │       └── ServicesCTA.tsx   # "From Idea to Reality" lime banner
│   │
│   ├── App.tsx                   # Routes + shared layout
│   ├── main.tsx                  # Entry point with BrowserRouter
│   └── index.css                 # Global styles + Tailwind
│
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🔗 Pages & Routes

| Route       | Page          | Description                          |
|-------------|---------------|--------------------------------------|
| `/`         | Home          | Full landing page with all sections  |
| `/about`    | About         | Company story, stats, team values    |
| `/services` | Services      | Service listings + 3-step process    |

---

## 🎨 Tech Stack

- **React 18** + **TypeScript**
- **React Router v6** — client-side routing
- **Vite** — blazing fast dev & build
- **Tailwind CSS** — utility-first styling
- **Google Fonts** — Manrope (headings) + Plus Jakarta Sans (body)

## 🎨 Brand Colors

| Token        | Hex       |
|-------------|-----------|
| Dark Green   | `#0d3d36` |
| Lime         | `#b5e42a` |
| Lime Dark    | `#9dca1a` |
