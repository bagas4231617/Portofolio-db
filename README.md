# Professional Portfolio - Network & Cloud Engineer

A modern, high-performance portfolio website built to showcase expertise in Network Engineering, Cloud Infrastructure, and System Administration. The visual identity is inspired by next-generation observability dashboards, network topologies, and datacenter control planes.

## Tech Stack

This project is built with modern frontend technologies focusing on speed, responsiveness, and developer experience:

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

## Features

- **Modern Architecture Aesthetic**: Slate, blue, and cyan color palette mimicking professional cloud consoles and network dashboards.
- **Topological Animations**: Custom CSS and Framer Motion orchestrating subtle, hardware-feel animations (pulsing LEDs, data lines).
- **Fully Responsive**: Adapts seamlessly to all screen sizes, from mobile devices to ultrawide monitors.
- **Contact Handling**: Built-in hook to integrate easily with Formspree for handling incoming messages.

## Running Locally

**Prerequisites:** 
- Node.js (v18+ recommended)
- npm or yarn or pnpm

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   If needed, copy `.env.example` to `.env.local` and set any required API endpoints (e.g., Formspree).

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Customization

You can personalize the portfolio by editing the data in `src/data/portfolioData.ts`. This single source of truth powers the Hero, Timeline, Certificates, and Projects sections.

---
Built with code and care.
