# Future City Concept Generator

An AI-powered urban planning and futuristic metropolis concept generator built with **Google Gemini API (gemini-3.8-flash)**, **Supabase**, **TypeScript**, **Tailwind CSS**, and **Express**.

Designed for urban planners, architects, students, municipal leaders, and designers to envision, model, compare, and export resilient future cities.

---

## 🌟 Key Features

1. **Dashboard & Analytics:** Real-time metrics on generated city concepts, sustainability eco scores, planned populations, status distributions, and active audit activity streams.
2. **AI Concept Synthesis:** Server-side Google Gemini 3.8 Flash integration generating:
   - Visionary overviews & core architectural philosophies
   - Structural materials & vertical spatial zoning
   - 100% clean energy baseload & storage models
   - Autonomous zero-congestion transit networks & pedestrian realms
   - Closed-loop water recycling & plasma waste-to-energy conversion
   - Preventive healthcare triage, adaptive education & civic safety
   - Multi-sector capital expenditure (CAPEX) & operational budget approximations
   - 4-stage phased roadmaps with milestone checklists
3. **Interactive Spatial District Radar:** Visualizes radial, cluster, and floating topological districts with elevation, capacity, and highlight metrics.
4. **Side-by-Side Comparison Matrix:** Compare up to 4 concepts head-to-head across eco scores, transit modes, budgets, and energy mixes.
5. **PDF & JSON Export:** 1-click printable urban briefs with print-optimized stylesheets (`@media print`) and structured JSON downloads.
6. **Browser Local Storage Engine & Supabase Cloud Option:** Instant zero-latency local persistence in browser `localStorage` for all concepts, projects, activity logs, profiles, and comparisons with JSON backup/restore, plus optional Supabase cloud synchronization.
7. **Transparent AI Disclaimers:** All quantitative estimations and budget models are explicitly labeled as unverified approximations for conceptual visioning.

---

## 🏗️ Architecture & Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Space Grotesk & Plus Jakarta Sans typography.
- **Backend:** Express API server running server-side `@google/genai` SDK with `aistudio-build` telemetry headers.
- **AI Model:** `gemini-3.8-flash` (official `@google/genai` TypeScript SDK).
- **Database:** Supabase (PostgreSQL with RLS), with tables for `profiles`, `projects`, `city_concepts`, and `activity_logs`.
- **Build & Dev:** Vite 8 + TSX.

---

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js 20+ installed
- npm or yarn
- (Optional) Gemini API Key and Supabase account

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   git clone <repo-url>
   cd future-city-concept-generator
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

   Fill in your configuration:
   ```env
   # Required for Live Gemini Generation
   GEMINI_API_KEY="your_gemini_api_key_here"

   # Optional for Supabase Cloud Database (if omitted, runs in local persistent mode)
   VITE_SUPABASE_URL="https://your-project.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_URL="https://your-project.supabase.co"
   SUPABASE_ANON_KEY="your-anon-key"
   ```

3. **Set Up the Supabase Database (Optional):**
   - Open your project dashboard at [supabase.com](https://supabase.com).
   - Navigate to the **SQL Editor**.
   - Copy and paste the contents of `supabase/schema.sql`.
   - Click **Run** to provision the tables, triggers, and Row Level Security (RLS) policies.

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

---

## 🚢 Deployment to Vercel

1. Push your repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. Configure Environment Variables in Vercel:
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `VITE_SUPABASE_URL`: Your Supabase Project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Anon Key.
4. Click **Deploy**. Vercel will automatically build and deploy your application.

---

## 🔒 Security & Privacy

- **Server-Side API Key Protection:** The `GEMINI_API_KEY` is never bundled into client-side code or exposed to the browser.
- **Row Level Security (RLS):** Supabase policies ensure users can only access and modify their own projects, concepts, and profiles.

---

## 📄 License
Apache-2.0
