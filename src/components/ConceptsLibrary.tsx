import React, { useState } from 'react';
import { FutureCityConcept, Project, ConceptStatus } from '../types';
import {
  Search,
  Filter,
  Grid,
  List,
  PlusCircle,
  GitCompare,
  Edit3,
  Archive,
  Trash2,
  MapPin,
  Calendar,
  Leaf,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ConceptsLibraryProps {
  concepts: FutureCityConcept[];
  projects: Project[];
  onSelectConcept: (concept: FutureCityConcept) => void;
  onEditConcept: (concept: FutureCityConcept) => void;
  onDeleteConcept: (id: string) => void;
  onToggleArchive: (concept: FutureCityConcept) => void;
  onAddToCompare: (concept: FutureCityConcept) => void;
  comparisonList: FutureCityConcept[];
  onNewConcept: () => void;
}

export const ConceptsLibrary: React.FC<ConceptsLibraryProps> = ({
  concepts,
  projects,
  onSelectConcept,
  onEditConcept,
  onDeleteConcept,
  onToggleArchive,
  onAddToCompare,
  comparisonList,
  onNewConcept,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Collect all unique themes
  const allThemes = Array.from(new Set(concepts.flatMap((c) => c.themes)));

  // Filter logic
  const filteredConcepts = concepts.filter((concept) => {
    const matchesSearch =
      concept.name.toLowerCase().includes(search.toLowerCase()) ||
      concept.location.toLowerCase().includes(search.toLowerCase()) ||
      concept.tagline.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || concept.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesTheme =
      themeFilter === 'all' ||
      concept.themes.some((t) => t.toLowerCase() === themeFilter.toLowerCase());

    const matchesProject =
      projectFilter === 'all' || concept.projectId === projectFilter;

    return matchesSearch && matchesStatus && matchesTheme && matchesProject;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & New Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-50 tracking-tight">
            Future City Concepts Library
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Manage, filter, compare, and inspect futuristic urban blueprints ({filteredConcepts.length} shown)
          </p>
        </div>

        <button
          onClick={onNewConcept}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-cyan-500/20 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New City Concept</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts by city name, location, or tagline..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-xs text-slate-100 placeholder:text-slate-600 transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:border-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Theme Filter */}
          <select
            value={themeFilter}
            onChange={(e) => setThemeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:border-cyan-500"
          >
            <option value="all">All Themes</option>
            {allThemes.map((th) => (
              <option key={th} value={th}>
                {th}
              </option>
            ))}
          </select>

          {/* Project Filter */}
          {projects.length > 0 && (
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:border-cyan-500"
            >
              <option value="all">All Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          )}

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-xl bg-slate-950 border border-slate-800 p-0.5 self-end md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredConcepts.map((concept) => {
            const isCompared = comparisonList.some((c) => c.id === concept.id);
            return (
              <div
                key={concept.id}
                className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
                onClick={() => onSelectConcept(concept)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`uppercase text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                        concept.status === 'Completed'
                          ? 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
                          : concept.status === 'Archived'
                          ? 'bg-slate-800 text-slate-400 border-slate-700'
                          : 'bg-amber-950/70 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      ● {concept.status}
                    </span>
                    <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {concept.targetYear}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading font-bold text-base text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {concept.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {concept.tagline}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{concept.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>{(concept.population / 1000).toLocaleString()}k pop</span>
                    </div>
                  </div>

                  {/* Themes Tag List */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {concept.themes.map((th, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        #{th}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer with Quick Actions */}
                <div
                  className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <Leaf className="w-3.5 h-3.5" />
                      {concept.ecoScore}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[11px] font-mono text-cyan-300 font-bold">
                      ${concept.budgetApproximation?.totalCapexBillions || 0}B*
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onAddToCompare(concept)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isCompared
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                      }`}
                      title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onEditConcept(concept)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
                      title="Edit concept"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleArchive(concept)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-900 transition-colors"
                      title={concept.status === 'Archived' ? 'Unarchive' : 'Archive'}
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onDeleteConcept(concept.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                      title="Delete concept"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="px-4 py-3">City Concept</th>
                  <th className="px-4 py-3">Location & Terrain</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Population</th>
                  <th className="px-4 py-3">Eco Score</th>
                  <th className="px-4 py-3">Est. CAPEX</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredConcepts.map((concept) => {
                  const isCompared = comparisonList.some((c) => c.id === concept.id);
                  return (
                    <tr
                      key={concept.id}
                      className="hover:bg-slate-900/40 transition-colors cursor-pointer"
                      onClick={() => onSelectConcept(concept)}
                    >
                      <td className="px-4 py-3 font-medium text-slate-100">
                        <div className="font-heading font-bold">{concept.name}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{concept.tagline}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        <div>{concept.location}</div>
                        <div className="text-[11px] text-slate-500">{concept.terrain}</div>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-cyan-400">{concept.targetYear}</td>
                      <td className="px-4 py-3 font-mono text-slate-300">
                        {concept.population.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-bold text-emerald-400">{concept.ecoScore}/100</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-300">
                        ${concept.budgetApproximation?.totalCapexBillions || 0}B*
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                            concept.status === 'Completed'
                              ? 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
                              : concept.status === 'Archived'
                              ? 'bg-slate-800 text-slate-400 border-slate-700'
                              : 'bg-amber-950/70 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {concept.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onAddToCompare(concept)}
                            className={`p-1.5 rounded-lg ${
                              isCompared ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-slate-100'
                            }`}
                            title="Compare"
                          >
                            <GitCompare className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onEditConcept(concept)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300"
                            title="Edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteConcept(concept.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredConcepts.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800 space-y-4">
          <Compass className="w-12 h-12 text-slate-600 mx-auto" />
          <div>
            <h3 className="font-heading font-bold text-base text-slate-200">
              No matching city concepts found
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search query, status filters, or generate a fresh concept using the AI synthesizer.
            </p>
          </div>
          <button
            onClick={onNewConcept}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors"
          >
            Create New Concept
          </button>
        </div>
      )}
    </div>
  );
};
