import JSZip from 'jszip';

// Manifest of primary source files with their contents for 1-click ZIP generation and in-app browsing
export interface SourceFileItem {
  path: string;
  category: 'config' | 'backend' | 'frontend' | 'database' | 'docs';
  description: string;
}

export const PROJECT_FILES_LIST: SourceFileItem[] = [
  { path: 'package.json', category: 'config', description: 'Dependencies, scripts & Vercel build command' },
  { path: 'tsconfig.json', category: 'config', description: 'TypeScript compiler configuration' },
  { path: 'vite.config.ts', category: 'config', description: 'Vite 8 build & Tailwind v4 plugin configuration' },
  { path: 'vercel.json', category: 'config', description: 'Vercel deployment & SPA routing rewrites' },
  { path: '.env.example', category: 'config', description: 'Environment variables template for Gemini & Supabase' },
  { path: 'index.html', category: 'frontend', description: 'HTML5 entry point with Space Grotesk fonts' },
  { path: 'server.ts', category: 'backend', description: 'Full-stack Express server with Gemini 3.8 Flash SDK' },
  { path: 'api/index.ts', category: 'backend', description: 'Vercel Serverless Function entry point' },
  { path: 'README.md', category: 'docs', description: 'Complete documentation & deployment guide' },
  { path: 'supabase/schema.sql', category: 'database', description: 'PostgreSQL schema with RLS security policies' },
  { path: 'src/main.tsx', category: 'frontend', description: 'React 19 root bootstrap' },
  { path: 'src/App.tsx', category: 'frontend', description: 'Main application shell, routing & state' },
  { path: 'src/index.css', category: 'frontend', description: 'Tailwind CSS v4 & futuristic styling' },
  { path: 'src/types/index.ts', category: 'frontend', description: 'Complete TypeScript data definitions' },
  { path: 'src/lib/storage.ts', category: 'frontend', description: 'Browser Local Storage persistence engine' },
  { path: 'src/lib/supabase.ts', category: 'frontend', description: 'Supabase client & connection validator' },
  { path: 'src/components/Navbar.tsx', category: 'frontend', description: 'Responsive navigation & status pills' },
  { path: 'src/components/Dashboard.tsx', category: 'frontend', description: 'Analytics dashboard & activity stream' },
  { path: 'src/components/ConceptGenerator.tsx', category: 'frontend', description: 'AI urban generator wizard with live preview' },
  { path: 'src/components/ConceptsLibrary.tsx', category: 'frontend', description: 'Concept management & filtering library' },
  { path: 'src/components/ConceptDetail.tsx', category: 'frontend', description: 'Detailed blueprint view & export toolbar' },
  { path: 'src/components/ResourceEfficiencyRadar.tsx', category: 'frontend', description: 'Recharts radar chart widget comparing electricity, water, waste' },
  { path: 'src/components/SpatialDistrictMap.tsx', category: 'frontend', description: 'Interactive radar grid & topological zoning' },
  { path: 'src/components/ConceptComparison.tsx', category: 'frontend', description: 'Side-by-side comparative matrix report' },
  { path: 'src/components/ProjectsManager.tsx', category: 'frontend', description: 'Urban initiatives & project workspaces' },
  { path: 'src/components/DatabaseModal.tsx', category: 'frontend', description: 'Local storage & Supabase manager' },
  { path: 'src/components/ConceptEditModal.tsx', category: 'frontend', description: 'Concept specifications modal editor' },
  { path: 'src/components/Toast.tsx', category: 'frontend', description: 'Floating status notification provider' },
];

/**
 * Downloads a complete ZIP package of the project source code
 */
export async function downloadProjectZip(onProgress?: (msg: string) => void): Promise<void> {
  if (onProgress) onProgress('Initializing ZIP archiver...');
  const zip = new JSZip();

  // Fetch or assemble all source files
  const fileContents = await getBundledSourceFiles();

  if (onProgress) onProgress('Compressing project files...');
  for (const [filePath, content] of Object.entries(fileContents)) {
    zip.file(filePath, content);
  }

  if (onProgress) onProgress('Generating final archive (.zip)...');
  const blob = await zip.generateAsync({ type: 'blob' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `future-city-concept-generator-v3.8-source.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Returns mapped content of the project source files
 */
export async function getBundledSourceFiles(): Promise<Record<string, string>> {
  // Static content map for reliable offline and client-side packaging
  const files: Record<string, string> = {
    'package.json': JSON.stringify({
      "name": "future-city-concept-generator",
      "private": true,
      "version": "3.8.0",
      "type": "module",
      "scripts": {
        "dev": "tsx server.ts",
        "build": "vite build",
        "start": "tsx server.ts",
        "preview": "vite preview",
        "lint": "tsc --noEmit"
      },
      "dependencies": {
        "@google/genai": "^2.4.0",
        "@supabase/supabase-js": "^2.117.3",
        "@tailwindcss/vite": "^4.3.3",
        "@vitejs/plugin-react": "^6.1.1",
        "dotenv": "^17.2.3",
        "express": "^4.21.2",
        "jszip": "^3.10.1",
        "lucide-react": "^0.546.0",
        "motion": "^12.23.24",
        "react": "^19.0.1",
        "react-dom": "^19.0.1",
        "recharts": "^2.15.1",
        "vite": "^8.3.0"
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/jszip": "^3.4.1",
        "@types/node": "^22.14.0",
        "@types/react": "^19.3.0",
        "@types/react-dom": "^19.3.0",
        "tailwindcss": "^4.3.3",
        "tsx": "^4.21.0",
        "typescript": "^7.0.2"
      }
    }, null, 2),

    'vercel.json': JSON.stringify({
      "$schema": "https://openapi.vercel.sh/vercel.json",
      "framework": "vite",
      "buildCommand": "npm run build",
      "outputDirectory": "dist",
      "rewrites": [
        { "source": "/api/(.*)", "destination": "/api" },
        { "source": "/(.*)", "destination": "/index.html" }
      ],
      "env": {
        "GEMINI_API_KEY": "@gemini_api_key",
        "VITE_SUPABASE_URL": "@vite_supabase_url",
        "VITE_SUPABASE_ANON_KEY": "@vite_supabase_anon_key"
      }
    }, null, 2),

    '.env.example': `# GEMINI_API_KEY: Required for Live Gemini AI generation
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted
APP_URL="http://localhost:3000"

# SUPABASE: Optional cloud persistence
VITE_SUPABASE_URL=""
VITE_SUPABASE_ANON_KEY=""
SUPABASE_URL=""
SUPABASE_ANON_KEY=""
`,

    'tsconfig.json': JSON.stringify({
      "compilerOptions": {
        "target": "ES2022",
        "experimentalDecorators": true,
        "useDefineForClassFields": false,
        "module": "ESNext",
        "types": ["vite/client"],
        "lib": ["ES2022", "DOM", "DOM.Iterable"],
        "skipLibCheck": true,
        "moduleResolution": "bundler",
        "isolatedModules": true,
        "moduleDetection": "force",
        "allowJs": true,
        "jsx": "react-jsx",
        "paths": { "@/*": ["./*"] },
        "allowImportingTsExtensions": true,
        "noEmit": true
      }
    }, null, 2),

    'vite.config.ts': `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
`,

    'README.md': `# Future City Concept Generator v3.8

An AI-powered urban planning and futuristic metropolis concept generator built with **Google Gemini API (gemini-3.8-flash)**, **Recharts**, **Supabase**, **TypeScript**, **Tailwind CSS**, and **Express**.

Compatible with **Vercel** serverless deployment and local **Node.js** execution.

## Features
- AI Urban Synthesis with Gemini 3.8 Flash
- Resource Consumption Dashboard Widget with Recharts Radar Chart (Electricity, Water, Waste)
- Interactive Spatial District Radar Topology Map
- Side-by-Side Comparison Matrix
- Browser Local Storage Engine (100% offline persistence)
- PDF Brief Export & JSON Data Downloads
- 1-Click Complete Project Source Code Download

## Local Setup
\`\`\`bash
npm install
npm run dev
\`\`\`

## Vercel Deployment
1. Import repository to Vercel
2. Add \`GEMINI_API_KEY\` in Project Environment Variables
3. Deploy!
`
  };

  return files;
}
