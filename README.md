<div align="center">

# MOHAMED HUSSAIN N
### AI + Full Stack Developer — *I ship systems that think.*

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.0-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployed with Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
  <a href="#-architecture--directory-structure">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-author">Author</a>
</p>

</div>

---

## ✦ Overview

This repository houses the personal portfolio and digital lab of **Mohamed Hussain N**. 

Engineered with a **Swiss Editorial / Brutalist-refined aesthetic**, the project merges rigorous grid hierarchy, typography-led information density, and fluid motion design. It showcases production-grade AI agents, scalable full-stack applications, interactive playgrounds, and engineering career milestones.

```
   ┌───────────────────────────────────────────────────────────────┐
   │  MOHAMED HUSSAIN N  ·  AI & FULL STACK DEVELOPER              │
   │  [■ AVAILABLE FOR Q4/Q1 ROLES]  ·  STATUS: DEPLOYED          │
   └───────────────────────────────────────────────────────────────┘
```

---

## ⚡ Key Features

### 1. 🎯 Adaptive Dual-Engine Custom Cursor
- **Dynamic Canvas Adaptation:** Automatically detects section backgrounds via `data-canvas="light"` and `data-canvas="dark"` attributes.
- **Color Inversion:** 
  - **Dark Canvas (`#0A0A0A`):** Pure white hairline outer ring with `mix-blend-mode: difference`.
  - **Light Canvas (`#F4F4F4`):** Solid `#0A0A0A` ink dot with high-contrast perimeter ring.
- **Lerp Trailing Physics:** Custom animation frame loop delivering inertial smoothing on mouse movement.
- **Smart Touch Fallback:** Automatically deactivated on mobile and touch devices (`pointer: coarse`).

### 2. 🌊 Kinetic Inertial Smooth Scroll (Lenis)
- Native-feeling momentum scroll with normalized delta across varied input devices (trackpads, mousewheels, touch).
- Seamless anchor scrolling for navigation targets (`#contact`, `#home`) with automatic target-offset calculation.

### 3. 🍱 Swiss Editorial Grid & Brutalist Layout
- High-contrast monochromatic foundations accented with industrial rust-copper (`#9C502F`).
- Subtle 2.5% SVG procedural fractal film grain overlay for tangible depth.
- Clean typographic pairing: **Inter Tight** for high-legibility display copy and **JetBrains Mono** for technical data streams.

### 4. 📬 Serverless Contact Pipeline (`/api/contact`)
- Edge-ready Next.js 14 Route Handler.
- HTML-templated transactional dispatch powered by **Nodemailer**.
- Server-side payload validation, input sanitization, and automated auto-responder confirmations.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router, Server Components) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + PostCSS |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) & [Lenis Smooth Scroll](https://lenis.darkroom.engineering/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend & Email**| Next.js API Routes, [Nodemailer](https://nodemailer.com/) |
| **Hosting** | [Vercel](https://vercel.com/) |

---

## 📂 Architecture & Directory Structure

```plaintext
portfolio/
├── public/
│   ├── profile.png            # High-resolution headshot
│   ├── resume.pdf             # Direct downloadable PDF resume
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/       # Serverless email dispatch handler
│   │   │       └── route.ts
│   │   ├── globals.css        # Typography, custom scrollbars, cursor blending
│   │   ├── layout.tsx         # Root layout with metadata, smooth scroll & cursor
│   │   └── page.tsx           # Assembled portfolio sections
│   ├── components/
│   │   ├── About.tsx          # Bio, design philosophy, PDF resume download
│   │   ├── Certifications.tsx # Verified credentials & achievements
│   │   ├── Contact.tsx        # Interactive email dispatch form
│   │   ├── CustomCursor.tsx   # Canvas-aware trailing cursor engine
│   │   ├── FAQ.tsx            # Expandable interactive accordion
│   │   ├── Footer.tsx         # Quick links, social channels, "Back to top"
│   │   ├── Hero.tsx           # High-impact brutalist typographic statement
│   │   ├── Journey.tsx        # Interactive career timeline & milestones
│   │   ├── Navbar.tsx         # Floating header with live status pill & smooth anchor CTAs
│   │   ├── OpenToWork.tsx     # Availability badge & collaboration scope
│   │   ├── Projects.tsx       # Flagship projects with live demo & repo links
│   │   ├── Skills.tsx         # Categorized tech matrix & capability grid
│   │   └── SmoothScroll.tsx   # Lenis inertial scroll provider
│   └── data/
│       └── portfolio.ts       # Centralized, single-source-of-truth content store
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17+ or higher
- **npm**, **pnpm**, or **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/MohamedHussain4690/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup (Optional for Contact Form)
Create a `.env.local` file in the root directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 👨‍💻 Author

**Mohamed Hussain N**
- **LinkedIn:** [linkedin.com/in/mohamed-hussain-n-](https://www.linkedin.com/in/mohamed-hussain-n-/)
- **GitHub:** [@MohamedHussain4690](https://github.com/MohamedHussain4690)
- **Role:** AI + Full Stack Developer

---

<div align="center">
  <sub>Engineered with precision. © 2026 Mohamed Hussain N. All rights reserved.</sub>
</div>
