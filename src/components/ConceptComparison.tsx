import React from 'react';
import { FutureCityConcept } from '../types';
import {
  GitCompare,
  X,
  Printer,
  Download,
  Leaf,
  Sparkles,
  HeartPulse,
  ShieldCheck,
  DollarSign,
  Train,
  Zap,
  Droplets,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Plus
} from 'lucide-react';
import { useToast } from './Toast';

interface ConceptComparisonProps {
  comparisonList: FutureCityConcept[];
  allConcepts: FutureCityConcept[];
  onRemoveFromCompare: (id: string) => void;
  onAddToCompare: (concept: FutureCityConcept) => void;
  onClearCompare: () => void;
  onSelectConcept: (concept: FutureCityConcept) => void;
  onNavigateTab: (tab: string) => void;
}

export const ConceptComparison: React.FC<ConceptComparisonProps> = ({
  comparisonList,
  allConcepts,
  onRemoveFromCompare,
  onAddToCompare,
  onClearCompare,
  onSelectConcept,
  onNavigateTab,
}) => {
  const { toast } = useToast();

  const handlePrintReport = () => {
    toast('info', 'Preparing Comparison Report', 'Opening printable comparison matrix...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(comparisonList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `future-cities-comparison-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast('success', 'Exported Comparison Data', 'JSON report downloaded successfully.');
  };

  if (comparisonList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <GitCompare className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-heading font-extrabold text-2xl text-slate-100">
            Side-by-Side Concept Comparison
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Select 2 or more future city concepts from your library to evaluate demographic models, renewable energy mixes, transit networks, and economic approximations head-to-head.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('concepts')}
          className="px-5 py-2.5 rounded-xl font-heading font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
        >
          Select Concepts in Library
        </button>

        {/* Quick select suggestions */}
        {allConcepts.length > 0 && (
          <div className="pt-8 border-t border-slate-800/80 max-w-xl mx-auto text-left">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-3">
              Quick Add to Comparison
            </span>
            <div className="space-y-2">
              {allConcepts.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <div>
                    <div className="font-heading font-bold text-xs text-slate-200">{c.name}</div>
                    <div className="text-[11px] text-slate-400">{c.location} · {c.targetYear}</div>
                  </div>
                  <button
                    onClick={() => onAddToCompare(c)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Compare</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 no-print">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-50 flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-cyan-400" />
            Concept Comparison Report
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluating {comparisonList.length} urban models across sustainability, infrastructure, and economics
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON Matrix</span>
          </button>

          <button
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onClearCompare}
            className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-rose-400 border border-slate-800 hover:bg-slate-900 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Disclaimer Banner */}
      <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Comparative Benchmark Notice:</strong> Metrics and budgets across compared models reflect AI simulated estimates for spatial envisioning. Direct parity requires normalized geographic cost surveys.
        </span>
      </div>

      {/* Comparison Matrix Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60">
              <th className="p-4 w-48 text-slate-400 uppercase text-[10px] tracking-wider shrink-0">
                Metric / Domain
              </th>
              {comparisonList.map((concept) => (
                <th key={concept.id} className="p-4 min-w-[260px] align-top">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold">
                        {concept.targetYear}
                      </span>
                      <h3
                        onClick={() => onSelectConcept(concept)}
                        className="font-heading font-bold text-sm text-slate-100 hover:text-cyan-300 cursor-pointer transition-colors mt-1"
                      >
                        {concept.name}
                      </h3>
                      <div className="text-[11px] text-slate-400 mt-0.5">{concept.location}</div>
                    </div>
                    <button
                      onClick={() => onRemoveFromCompare(concept.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors no-print"
                      title="Remove from comparison"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80">
            {/* 1. Quantitative Ratings */}
            <tr className="bg-slate-950/40">
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Leaf className="w-4 h-4" />
                  <span>Eco Score</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <span className="text-base font-bold text-emerald-400 font-heading">{c.ecoScore}</span>
                  <span className="text-slate-500 text-[10px]"> / 100</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Innovation Index</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <span className="text-base font-bold text-cyan-300 font-heading">{c.innovationIndex}</span>
                  <span className="text-slate-500 text-[10px]"> / 100</span>
                </td>
              ))}
            </tr>

            <tr className="bg-slate-950/40">
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-indigo-400">
                  <HeartPulse className="w-4 h-4" />
                  <span>Livability Rating</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <span className="text-base font-bold text-indigo-300 font-heading">{c.livabilityRating}</span>
                  <span className="text-slate-500 text-[10px]"> / 100</span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Climate Resilience</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <span className="text-base font-bold text-amber-300 font-heading">{c.resilienceScore}</span>
                  <span className="text-slate-500 text-[10px]"> / 100</span>
                </td>
              ))}
            </tr>

            {/* 2. Demographics & Scale */}
            <tr className="bg-slate-950/40">
              <td className="p-4 font-semibold text-slate-300">Population & Density</td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <div className="font-mono font-bold text-slate-100">{c.population.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {c.landAreaSqKm} sq km (~{Math.round(c.population / c.landAreaSqKm)}/km²)
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-semibold text-slate-300">Terrain Context</td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4 text-slate-300 font-medium">{c.terrain}</td>
              ))}
            </tr>

            {/* 3. Financial Approximations */}
            <tr className="bg-slate-950/40">
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <DollarSign className="w-4 h-4" />
                  <span>Projected CAPEX Budget</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <div className="text-base font-mono font-bold text-cyan-400">
                    ${c.budgetApproximation?.totalCapexBillions || 0}B*
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Payback: {c.budgetApproximation?.estimatedPaybackYears} years
                  </div>
                </td>
              ))}
            </tr>

            {/* 4. Energy Strategy */}
            <tr>
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Zap className="w-4 h-4" />
                  <span>Clean Energy Mix</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400">
                    {c.energy.cleanEnergyShare}% Clean Baseload
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1">
                    {c.energy.primarySources.map((s, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{s.name}</span>
                        <span className="font-mono text-amber-400">{s.percentage}%</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 5. Autonomous Mobility */}
            <tr className="bg-slate-950/40">
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Train className="w-4 h-4" />
                  <span>Transit & Pedestrian</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4 space-y-1">
                  <div className="font-bold text-cyan-300">
                    {c.transportation.pedestrianZonePercentage}% Pedestrian Realm
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    {c.transportation.modes.map((m) => m.name).join(', ')}
                  </p>
                </td>
              ))}
            </tr>

            {/* 6. Water & Waste */}
            <tr>
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Droplets className="w-4 h-4" />
                  <span>Water & Circularity</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <div className="font-bold text-cyan-300">
                    {c.waterWaste.closedLoopRecyclingRate}% Water Recycled
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Circularity Index: {c.sustainabilityStrategy?.circularEconomyIndex || 95}%
                  </div>
                </td>
              ))}
            </tr>

            {/* 7. Construction Timeline */}
            <tr className="bg-slate-950/40">
              <td className="p-4 font-semibold text-slate-300">
                <div className="flex items-center gap-1.5 text-indigo-400">
                  <Calendar className="w-4 h-4" />
                  <span>Phase 1 Rollout</span>
                </div>
              </td>
              {comparisonList.map((c) => (
                <td key={c.id} className="p-4">
                  <div className="font-semibold text-slate-200">
                    {c.phasedRoadmap?.[0]?.title || 'Foundation & Spine'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {c.phasedRoadmap?.[0]?.years} · Est. ${c.phasedRoadmap?.[0]?.estimatedCostBillions}B
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
