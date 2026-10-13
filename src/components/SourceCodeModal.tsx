import React, { useState } from 'react';
import {
  FileCode,
  Download,
  FolderArchive,
  CheckCircle2,
  Copy,
  ExternalLink,
  Terminal,
  Layers,
  X,
  Sparkles,
  Server,
  Cloud,
  Check
} from 'lucide-react';
import { useToast } from './Toast';
import { downloadProjectZip, PROJECT_FILES_LIST } from '../lib/sourceBundle';

interface SourceCodeModalProps {
  onClose: () => void;
}

export const SourceCodeModal: React.FC<SourceCodeModalProps> = ({ onClose }) => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);
  const [downloadStep, setDownloadStep] = useState('');
  const [activeTab, setActiveTab] = useState<'plan' | 'files' | 'vercel'>('plan');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const handleDownloadZip = async () => {
    setDownloading(true);
    setDownloadStep('Packaging source code...');
    try {
      await downloadProjectZip((msg) => setDownloadStep(msg));
      toast('success', 'Project Downloaded', 'future-city-concept-generator-v3.8-source.zip saved.');
    } catch (err: any) {
      toast('error', 'Download Failed', err.message || 'Could not generate ZIP archive.');
    } finally {
      setDownloading(false);
      setDownloadStep('');
    }
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedFile(path);
    toast('info', 'Path Copied', path);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto no-print">
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 max-w-4xl w-full my-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/20">
              <FolderArchive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-xl text-slate-100">
                  Future City v3.8 — Source Code &amp; Implementation
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  Vercel Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Full-stack architecture blueprint, complete file manifest, and 1-click project ZIP export
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Click Action Hero Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-indigo-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              Download Complete Project Source Code (.ZIP)
            </h4>
            <p className="text-xs text-slate-300">
              Includes all source files, configurations, Vercel serverless functions, PostgreSQL schema, and README.
            </p>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 shrink-0"
          >
            {downloading ? (
              <>
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>{downloadStep || 'Packaging...'}</span>
              </>
            ) : (
              <>
                <FolderArchive className="w-4 h-4" />
                <span>Download Complete Project (.ZIP)</span>
              </>
            )}
          </button>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 -mb-px ${
              activeTab === 'plan'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Implementation Plan &amp; Architecture
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 -mb-px ${
              activeTab === 'files'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Project Files Manifest ({PROJECT_FILES_LIST.length})
          </button>
          <button
            onClick={() => setActiveTab('vercel')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-b-2 -mb-px ${
              activeTab === 'vercel'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Vercel Deployment Guide
          </button>
        </div>

        {/* TAB 1: IMPLEMENTATION PLAN */}
        {activeTab === 'plan' && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 flex items-center justify-center text-[10px] border border-cyan-500/40">1</span>
                  <span>Full-Stack Foundation &amp; UI</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  React 19, TypeScript, Tailwind CSS v4, and Lucide icons. Express server on port 3000 hosting REST endpoints and mounting Vite middlewares for instant dev workflow.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  Files: server.ts, vite.config.ts, index.html, src/App.tsx
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-bold">
                  <span className="w-5 h-5 rounded-full bg-indigo-950 flex items-center justify-center text-[10px] border border-indigo-500/40">2</span>
                  <span>Server-Side Gemini 3.8 Flash AI</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Official @google/genai SDK initialized server-side with strict User-Agent telemetry headers. Structured JSON schema synthesizing renewable grids, transit, water, and budget approximations.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  Files: server.ts (/api/generate-concept), api/index.ts
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 flex items-center justify-center text-[10px] border border-emerald-500/40">3</span>
                  <span>Interactive Spatial &amp; Radar Visualizations</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Integrated Recharts multi-axis radar chart widget comparing electricity, water, and waste efficiency against 2026 baselines, plus an interactive holographic topological zoning map.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  Files: ResourceEfficiencyRadar.tsx, SpatialDistrictMap.tsx
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <span className="w-5 h-5 rounded-full bg-amber-950 flex items-center justify-center text-[10px] border border-amber-500/40">4</span>
                  <span>Local Storage Engine &amp; Supabase Cloud</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Zero-latency offline-first local storage for concepts, projects, activity logs, and comparisons, alongside complete PostgreSQL schema with Row Level Security (RLS) for cloud deployment.
                </p>
                <div className="text-[10px] font-mono text-slate-500 pt-1">
                  Files: src/lib/storage.ts, supabase/schema.sql
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FILES MANIFEST */}
        {activeTab === 'files' && (
          <div className="space-y-3">
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {PROJECT_FILES_LIST.map((item) => (
                <div
                  key={item.path}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-mono font-semibold text-slate-200 truncate">
                        {item.path}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {item.description}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyPath(item.path)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors shrink-0"
                    title="Copy path"
                  >
                    {copiedFile === item.path ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: VERCEL DEPLOYMENT */}
        {activeTab === 'vercel' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-2">
                <Cloud className="w-4 h-4 text-cyan-400" />
                Deploying to Vercel in 3 Steps
              </h4>

              <ol className="space-y-2 text-slate-300 list-decimal list-inside leading-relaxed">
                <li>
                  <strong>Push code to GitHub or GitLab:</strong> Extract the downloaded ZIP or push your workspace repository.
                </li>
                <li>
                  <strong>Import to Vercel:</strong> In your <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Vercel dashboard</a>, click <em>Add New &gt; Project</em> and select your repository. Vercel automatically detects the Vite framework and runs <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">npm run build</code>.
                </li>
                <li>
                  <strong>Configure Environment Variable:</strong> Add <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">GEMINI_API_KEY</code> in Project Settings &gt; Environment Variables.
                </li>
              </ol>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Included vercel.json configuration
                </span>
                <pre className="p-3 rounded-xl bg-slate-950 text-cyan-300 font-mono text-[11px] overflow-x-auto">
{`{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span>Future City Concept Generator v3.8 · Complete Production Bundle</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 hover:bg-slate-800 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
