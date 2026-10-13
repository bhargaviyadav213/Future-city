import React from 'react';
import { FutureCityConcept, Project, ActivityItem, UserProfile } from '../types';
import {
  Sparkles,
  Compass,
  Layers,
  FolderGit2,
  TrendingUp,
  Activity,
  ArrowRight,
  Leaf,
  Users,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  GitCompare,
  PlusCircle,
  FileText,
  Download
} from 'lucide-react';

interface DashboardProps {
  concepts: FutureCityConcept[];
  projects: Project[];
  activities: ActivityItem[];
  currentUser: UserProfile;
  onSelectConcept: (concept: FutureCityConcept) => void;
  onNavigateTab: (tab: string) => void;
  onAddToCompare: (concept: FutureCityConcept) => void;
  comparisonList: FutureCityConcept[];
  onOpenSourceModal?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  concepts,
  projects,
  activities,
  currentUser,
  onSelectConcept,
  onNavigateTab,
  onAddToCompare,
  comparisonList,
  onOpenSourceModal,
}) => {
  // Quantitative summaries
  const totalConcepts = concepts.length;
  const completedConcepts = concepts.filter((c) => c.status === 'Completed').length;
  const draftConcepts = concepts.filter((c) => c.status === 'Draft').length;
  const archivedConcepts = concepts.filter((c) => c.status === 'Archived').length;

  const avgEcoScore = totalConcepts > 0
    ? Math.round(concepts.reduce((acc, c) => acc + (c.ecoScore || 85), 0) / totalConcepts)
    : 92;

  const totalPopulation = concepts.reduce((acc, c) => acc + (c.population || 0), 0);

  // Theme distribution
  const themeCounts: Record<string, number> = {};
  concepts.forEach((c) => {
    c.themes.forEach((t) => {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    });
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Hero Welcome Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                Future City Design Studio
              </span>
              <span className="text-xs text-slate-400">
                Active as <strong className="text-slate-200">{currentUser.role}</strong>
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-50 tracking-tight">
              Design the Resilient Metropolises of Tomorrow
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Generate comprehensive AI-powered futuristic city blueprints with Google Gemini 3.8 Flash. Explore closed-loop energy, autonomous transit networks, circular water systems, and financial approximations.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('generator')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-heading font-bold text-sm bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Generator</span>
            </button>

            <button
              onClick={() => onNavigateTab('concepts')}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-heading font-semibold text-sm bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 transition-all"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Explore Library</span>
            </button>

            {onOpenSourceModal && (
              <button
                onClick={onOpenSourceModal}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-heading font-semibold text-sm bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800 transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Source Code (.zip)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4 Quantitative Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Concepts</span>
            <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30">
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold font-heading text-slate-100">{totalConcepts}</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="text-emerald-400 font-semibold">{completedConcepts} completed</span>
              <span>· {draftConcepts} drafts</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Projects</span>
            <div className="p-2 rounded-xl bg-indigo-950/60 border border-indigo-500/30">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold font-heading text-slate-100">{projects.length}</div>
            <div className="text-xs text-slate-400 mt-1">
              Urban planning workspaces
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Sustainability Score</span>
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30">
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold font-heading text-emerald-300">
              {avgEcoScore}<span className="text-sm text-emerald-500">/100</span>
            </div>
            <div className="text-xs text-emerald-400/90 mt-1">
              Net-zero & circular verified
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Simulated Population</span>
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30">
              <Users className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold font-heading text-slate-100 font-mono">
              {(totalPopulation / 1000000).toFixed(2)}M
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Future citizens accommodated
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Concept Showcase & Distribution Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Featured Recent Concepts */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                Featured City Concepts
              </h2>
              <p className="text-xs text-slate-400">Recently synthesized urban blueprints</p>
            </div>
            <button
              onClick={() => onNavigateTab('concepts')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 transition-colors"
            >
              <span>View all ({totalConcepts})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {concepts.slice(0, 4).map((concept) => {
              const isCompared = comparisonList.some((c) => c.id === concept.id);
              return (
                <div
                  key={concept.id}
                  className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-950/30 transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
                  onClick={() => onSelectConcept(concept)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold">
                        {concept.targetYear}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                        <Leaf className="w-3 h-3" />
                        Eco {concept.ecoScore}/100
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {concept.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {concept.tagline}
                    </p>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{concept.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {concept.themes.slice(0, 2).map((t, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onAddToCompare(concept)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          isCompared
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                        }`}
                        title={isCompared ? 'Remove from compare' : 'Add to compare'}
                      >
                        <GitCompare className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onSelectConcept(concept)}
                        className="p-1.5 rounded-lg text-xs text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
                        title="Inspect Concept"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Status Breakdown & Activity Stream */}
        <div className="lg:col-span-4 space-y-6">
          {/* Concept Status Distribution Bar */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Blueprint Status Distribution
            </h3>

            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-emerald-400">Completed ({completedConcepts})</span>
                  <span className="text-slate-400">
                    {totalConcepts > 0 ? Math.round((completedConcepts / totalConcepts) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${totalConcepts > 0 ? (completedConcepts / totalConcepts) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-amber-400">Drafts ({draftConcepts})</span>
                  <span className="text-slate-400">
                    {totalConcepts > 0 ? Math.round((draftConcepts / totalConcepts) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${totalConcepts > 0 ? (draftConcepts / totalConcepts) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Archived ({archivedConcepts})</span>
                  <span className="text-slate-400">
                    {totalConcepts > 0 ? Math.round((archivedConcepts / totalConcepts) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full mt-1 overflow-hidden">
                  <div
                    className="bg-slate-600 h-full rounded-full"
                    style={{ width: `${totalConcepts > 0 ? (archivedConcepts / totalConcepts) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Popular Themes Tag Cloud */}
            <div className="pt-3 border-t border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">
                Active Themes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(themeCounts).map(([theme, count]) => (
                  <span
                    key={theme}
                    className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {theme} <strong className="text-cyan-400">({count})</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Audit Stream */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-sm text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Recent Studio Activity
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {activities.length > 0 ? (
                activities.slice(0, 6).map((act) => (
                  <div key={act.id} className="text-xs p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                    <div className="flex items-center justify-between text-slate-300 font-medium">
                      <span className="truncate">{act.title}</span>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {act.details && (
                      <p className="text-[11px] text-slate-400 line-clamp-1 leading-normal">
                        {act.details}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs">
                  No activity recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
