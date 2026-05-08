# FAT Karting League

A high-performance, MACH-architecture web application for the FAT Karting League.

## Technologies
- **Frontend**: Next.js 15 (App Router), Tailwind CSS v4, Framer Motion
- **CMS**: Contentful (GraphQL API)
- **Ticketing**: Vivenu (Headless API)
- **Backend**: Mock GCP Cloud Functions & Firestore

## Getting Started

### Local Development (with Docker)
1. Clone the repository.
2. Copy `.env.example` to `.env`.
3. Run `docker compose up`.
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development (without Docker)
1. Install dependencies: `npm install`.
2. Run the dev server: `npm run dev`.

## Architecture
The app follows the MACH architecture principle:
- **M**icroservices: Logic split across Next.js API routes and mock GCP functions.
- **A**PI-first: All data fetching via GraphQL (Contentful) or REST (Vivenu).
- **C**loud-native: Designed for deployment on GCP.
- **H**eadless: Decoupled CMS and Ticketing layers.

## 'Electro' Design System
- **Asphalt**: `#0B0E14` (Background)
- **Race Red**: `#FF3E3E` (Accents / CTAs)
- **Electric Blue**: `#2E5BFF` (Secondary accents)
