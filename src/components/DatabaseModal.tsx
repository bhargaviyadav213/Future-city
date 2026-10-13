import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  Copy,
  ExternalLink,
  Shield,
  RotateCcw,
  Key,
  Server,
  Layers,
  Terminal,
  Cpu,
  HardDrive,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useToast } from './Toast';
import {
  exportFullBackup,
  importFullBackup,
  getStorageStats,
  STORAGE_KEYS
} from '../lib/storage';

interface DatabaseModalProps {
  systemStatus: {
    gemini?: { active: boolean; model: string; mode: string };
    supabase?: { configured: boolean; mode: string };
  };
  onResetSampleData: () => void;
  onRefreshFromStorage: () => void;
}

const SQL_SCHEMA_SNIPPET = `-- FUTURE CITY CONCEPT GENERATOR - SUPABASE SCHEMA
-- Run this in the Supabase SQL Editor (supabase.com -> SQL Editor -> New Query)

create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  role text default 'Urban Planner',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PROJECTS TABLE
create table if not exists public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  tags text[] default array[]::text[],
  status text default 'Active',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CITY CONCEPTS TABLE
create table if not exists public.city_concepts (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  tagline text,
  location text not null,
  terrain text not null,
  population bigint not null default 500000,
  land_area_sqkm numeric not null default 120,
  target_year integer not null default 2075,
  status text not null default 'Completed',
  themes text[] not null default array['Smart City']::text[],
  overview jsonb not null default '{}'::jsonb,
  infrastructure jsonb not null default '{}'::jsonb,
  energy jsonb not null default '{}'::jsonb,
  transportation jsonb not null default '{}'::jsonb,
  water_waste jsonb not null default '{}'::jsonb,
  budget_approximation jsonb not null default '{}'::jsonb,
  phased_roadmap jsonb not null default '[]'::jsonb,
  spatial_layout jsonb not null default '{}'::jsonb,
  eco_score integer default 85,
  innovation_index integer default 90,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ACTIVITY LOGS TABLE
create table if not exists public.activity_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  concept_id uuid references public.city_concepts(id) on delete set null,
  action_type text not null,
  title text not null,
  details text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.projects enable row level security;
alter table public.city_concepts enable row level security;
alter table public.activity_logs enable row level security;

create policy "Users can manage own profile" on public.profiles for all using (auth.uid() = id);
create policy "Users can manage own projects" on public.projects for all using (auth.uid() = user_id);
create policy "Users can manage own concepts" on public.city_concepts for all using (auth.uid() = user_id);
create policy "Users can manage own logs" on public.activity_logs for all using (auth.uid() = user_id);
`;

export const DatabaseModal: React.FC<DatabaseModalProps> = ({
  systemStatus,
  onResetSampleData,
  onRefreshFromStorage,
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);

  const stats = getStorageStats();

  const handleCopySQL = () => {
    navigator.clipboard.writeText(SQL_SCHEMA_SNIPPET);
    setCopied(true);
    toast('success', 'SQL Schema Copied', 'Paste into your Supabase SQL Editor.');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleExportBackup = () => {
    const backupStr = exportFullBackup();
    const blob = new Blob([backupStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `future-city-localstorage-backup-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('success', 'Backup Exported', 'Downloaded complete localStorage state JSON.');
  };

  const handleImportBackup = () => {
    if (!importText.trim()) {
      toast('error', 'Import Failed', 'Please paste valid backup JSON.');
      return;
    }
    const success = importFullBackup(importText);
    if (success) {
      toast('success', 'Backup Restored', 'Successfully loaded data into local storage.');
      setImportText('');
      setShowImport(false);
      onRefreshFromStorage();
    } else {
      toast('error', 'Invalid Format', 'JSON parsing failed. Ensure valid backup structure.');
    }
  };

  const isSupabaseConfigured = systemStatus.supabase?.configured;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-50 tracking-tight flex items-center gap-2">
          <HardDrive className="w-7 h-7 text-cyan-400" />
          Local Storage &amp; Persistence Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          The Future City Concept Generator uses browser <strong>Local Storage</strong> for instant, zero-latency persistence of all your concepts, projects, and activities across browser sessions, with optional Supabase cloud synchronization.
        </p>
      </div>

      {/* Primary Local Storage Status Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 relative overflow-hidden space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-lg text-slate-100">
                  Browser Local Storage
                </h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Primary Storage Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Saved locally on your device in real-time · No external login required
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-colors shadow-sm"
              title="Download full JSON backup of all stored concepts"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>

            <button
              onClick={() => setShowImport(!showImport)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Import Backup</span>
            </button>
          </div>
        </div>

        {/* Storage footprint statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-500">Storage Used</div>
            <div className="text-base font-bold font-mono text-cyan-300 mt-0.5">{stats.totalKb} KB</div>
            <div className="text-[10px] text-slate-500">Browser quota: ~5,000 KB</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-500">Stored Concepts</div>
            <div className="text-base font-bold font-mono text-slate-100 mt-0.5">{stats.conceptsCount}</div>
            <div className="text-[10px] text-slate-500">Key: {STORAGE_KEYS.CONCEPTS}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-500">Stored Projects</div>
            <div className="text-base font-bold font-mono text-slate-100 mt-0.5">{stats.projectsCount}</div>
            <div className="text-[10px] text-slate-500">Key: {STORAGE_KEYS.PROJECTS}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-500">Sync Status</div>
            <div className="text-base font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> 100% Synced
            </div>
            <div className="text-[10px] text-slate-500">Instant offline read/write</div>
          </div>
        </div>

        {/* Import JSON drawer */}
        {showImport && (
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-3 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="w-4 h-4" />
                Paste JSON Backup To Restore
              </span>
              <button
                onClick={() => setShowImport(false)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
            </div>
            <textarea
              rows={4}
              placeholder="Paste exported backup JSON here..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-100 focus:border-indigo-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleImportBackup}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white transition-colors"
              >
                Restore Backup to Local Storage
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cloud & AI Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Supabase Status */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-100">
                  Supabase Cloud (Optional)
                </h3>
                <span className="text-[11px] text-slate-400">PostgreSQL Cloud Persistence</span>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                isSupabaseConfigured
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              {isSupabaseConfigured ? '● Cloud Connected' : '○ Standalone Local Mode'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isSupabaseConfigured
              ? 'Supabase Cloud credentials detected. Remote replication active alongside your browser local storage.'
              : 'All data is stored in your browser Local Storage. If you want multi-device cloud synchronization or team collaboration, you can connect a Supabase project at any time.'}
          </p>

          <div className="pt-2 border-t border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span>Cloud Sync Env:</span>
              <span className="font-mono text-cyan-400">VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY</span>
            </div>
          </div>
        </div>

        {/* Gemini AI Status */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-slate-100">
                  Google Gemini AI Engine
                </h3>
                <span className="text-[11px] text-slate-400">Model: gemini-3.8-flash</span>
              </div>
            </div>

            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                systemStatus.gemini?.active
                  ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                  : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30'
              }`}
            >
              {systemStatus.gemini?.active ? '● Live Server Engine' : '● Simulation Engine'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Gemini synthesizes future urban blueprints server-side with <code className="text-indigo-300 bg-slate-900 px-1 py-0.5 rounded">@google/genai</code>. Once generated, blueprints are immediately committed and persisted in your browser's local storage.
          </p>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">API Key Privacy:</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> 100% Server Protected
            </span>
          </div>
        </div>
      </div>

      {/* SQL Schema Preview & Copy Bar */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              PostgreSQL Schema (supabase/schema.sql)
            </h3>
            <p className="text-xs text-slate-400">
              Optional cloud table definitions for profiles, projects, concepts, and activity logs
            </p>
          </div>

          <button
            onClick={handleCopySQL}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20 shrink-0 self-start sm:self-auto"
          >
            {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Schema Copied!' : 'Copy SQL Schema'}</span>
          </button>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 font-mono text-[11px] text-slate-300 max-h-56 overflow-y-auto">
          <pre>{SQL_SCHEMA_SNIPPET}</pre>
        </div>
      </div>

      {/* Reset Local Storage */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-heading font-bold text-sm text-slate-200 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            Reset Local Storage to Default Seeds
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Restores initial pre-loaded architectural seeds (Neo-Kyoto Solarpunk and Aegis Oceanic) to your browser's local storage.
          </p>
        </div>

        <button
          onClick={onResetSampleData}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shrink-0"
        >
          Reset to Default Seeds
        </button>
      </div>
    </div>
  );
};
