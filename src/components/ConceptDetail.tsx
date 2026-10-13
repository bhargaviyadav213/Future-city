import React, { useState } from 'react';
import { FutureCityConcept } from '../types';
import { SpatialDistrictMap } from './SpatialDistrictMap';
import { ResourceEfficiencyRadar } from './ResourceEfficiencyRadar';
import {
  ArrowLeft,
  Printer,
  Download,
  GitCompare,
  Edit3,
  Archive,
  Trash2,
  AlertTriangle,
  Zap,
  Train,
  Droplets,
  HeartPulse,
  DollarSign,
  Leaf,
  Calendar,
  Building,
  ShieldCheck,
  CheckCircle2,
  Award,
  Sparkles,
  MapPin,
  Users,
  Compass
} from 'lucide-react';
import { useToast } from './Toast';

interface ConceptDetailProps {
  concept: FutureCityConcept;
  onBack: () => void;
  onEdit: (concept: FutureCityConcept) => void;
  onDelete: (id: string) => void;
  onToggleArchive: (concept: FutureCityConcept) => void;
  onAddToCompare: (concept: FutureCityConcept) => void;
  isCompared: boolean;
}

export const ConceptDetail: React.FC<ConceptDetailProps> = ({
  concept,
  onBack,
  onEdit,
  onDelete,
  onToggleArchive,
  onAddToCompare,
  isCompared,
}) => {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<'overview' | 'infrastructure' | 'energy' | 'transit' | 'water' | 'civic' | 'budget' | 'roadmap'>('overview');

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(concept, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${concept.name.toLowerCase().replace(/\s+/g, '-')}-future-concept.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast('success', 'Exported JSON', `${concept.name} data downloaded successfully.`);
  };

  const handlePrintPDF = () => {
    toast('info', 'Preparing Print & PDF View', 'Opening system print preview...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Top Navigation & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors w-fit group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onAddToCompare(concept)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isCompared
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>{isCompared ? 'In Comparison' : 'Add to Compare'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800 transition-all"
            title="Download structured JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>JSON</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export / Print PDF</span>
          </button>

          <button
            onClick={() => onEdit(concept)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-slate-800 transition-colors"
            title="Edit Concept"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleArchive(concept)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-900 border border-slate-800 transition-colors"
            title={concept.status === 'Archived' ? 'Unarchive' : 'Archive'}
          >
            <Archive className="w-4 h-4" />
          </button>

          <button
            onClick={() => onDelete(concept.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-slate-800 transition-colors"
            title="Delete Concept"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Concept Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                  concept.status === 'Completed'
                    ? 'bg-emerald-950/70 text-emerald-400 border-emerald-500/30'
                    : concept.status === 'Archived'
                    ? 'bg-slate-800 text-slate-400 border-slate-700'
                    : 'bg-amber-950/70 text-amber-400 border-amber-500/30'
                }`}
              >
                ● {concept.status}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-950/70 text-indigo-300 border border-indigo-500/30">
                Target Year: {concept.targetYear}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {concept.location}
              </span>
              {concept.generationModel && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-400 border border-cyan-500/20">
                  {concept.generationModel}
                </span>
              )}
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-50 tracking-tight">
              {concept.name}
            </h1>
            <p className="text-sm sm:text-base text-cyan-200/90 font-medium leading-relaxed">
              {concept.tagline}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {concept.themes.map((theme, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-900/90 border border-cyan-500/30 text-cyan-300"
                >
                  #{theme}
                </span>
              ))}
            </div>
          </div>

          {/* Quantitative Indices Quadrant */}
          <div className="grid grid-cols-2 gap-3 sm:w-80 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Eco Score</span>
                <Leaf className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-emerald-300 mt-2">
                {concept.ecoScore}<span className="text-xs text-emerald-500">/100</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${concept.ecoScore}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Innovation</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-cyan-300 mt-2">
                {concept.innovationIndex}<span className="text-xs text-cyan-500">/100</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${concept.innovationIndex}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-indigo-500/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Livability</span>
                <HeartPulse className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-indigo-300 mt-2">
                {concept.livabilityRating}<span className="text-xs text-indigo-500">/100</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${concept.livabilityRating}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-amber-500/30 flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Resilience</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-heading text-amber-300 mt-2">
                {concept.resilienceScore}<span className="text-xs text-amber-500">/100</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${concept.resilienceScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Vital stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
          <div>
            <div className="text-slate-500 uppercase text-[10px] font-semibold">Planned Population</div>
            <div className="font-bold text-slate-100 text-sm mt-0.5">
              {concept.population.toLocaleString()} citizens
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px] font-semibold">Land / Spatial Area</div>
            <div className="font-bold text-slate-100 text-sm mt-0.5">
              {concept.landAreaSqKm} sq km
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px] font-semibold">Terrain Context</div>
            <div className="font-bold text-slate-100 text-sm mt-0.5">
              {concept.terrain}
            </div>
          </div>
          <div>
            <div className="text-slate-500 uppercase text-[10px] font-semibold">Projected CAPEX Budget</div>
            <div className="font-bold text-cyan-400 text-sm mt-0.5">
              ${concept.budgetApproximation?.totalCapexBillions || 0} Billion USD*
            </div>
          </div>
        </div>
      </div>

      {/* Prominent AI Approximation Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold uppercase tracking-wider text-amber-300 mr-2">
            AI Estimation Notice:
          </span>
          All quantitative indicators, financial allocations, material requirements, and engineering benchmarks are AI-synthesized conceptual models intended for early-stage visioning and academic study. They represent unverified approximations and must be validated through formal municipal feasibility surveys.
        </div>
      </div>

      {/* Interactive Spatial District Zoning Map */}
      {concept.spatialLayout?.districts && concept.spatialLayout.districts.length > 0 && (
        <SpatialDistrictMap
          districts={concept.spatialLayout.districts}
          mapStyle={concept.spatialLayout.mapStyle}
          urbanDiameterKm={concept.spatialLayout.urbanDiameterKm}
          cityName={concept.name}
        />
      )}

      {/* Resource Consumption Dashboard Widget (Recharts Radar Chart) */}
      <ResourceEfficiencyRadar concept={concept} />

      {/* Navigation Sub-Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-800 pb-2 no-print">
        {[
          { id: 'overview', label: 'Overview & Philosophy', icon: Compass },
          { id: 'infrastructure', label: 'Infrastructure & Materials', icon: Building },
          { id: 'energy', label: 'Clean Energy Grid', icon: Zap },
          { id: 'transit', label: 'Autonomous Mobility', icon: Train },
          { id: 'water', label: 'Water & Circular Waste', icon: Droplets },
          { id: 'civic', label: 'Civic Health & Safety', icon: HeartPulse },
          { id: 'budget', label: 'Budget Approximations', icon: DollarSign },
          { id: 'roadmap', label: 'Phased 4-Stage Roadmap', icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION CONTENT BLOCKS */}
      <div className="space-y-6">
        {/* 1. OVERVIEW & PHILOSOPHY */}
        {activeSection === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
                <Compass className="w-5 h-5 text-cyan-400" />
                Executive Blueprint Summary
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {concept.overview.summary}
              </p>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Core Architectural Philosophy
                </h4>
                <p className="text-sm text-cyan-300/90 font-medium mt-1 italic">
                  "{concept.overview.corePhilosophy}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">
                  Key Breakthrough Innovations
                </h4>
                <ul className="space-y-2">
                  {concept.overview.primaryInnovations.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-4 space-y-6">
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
                <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  Climate Adaptation Strategy
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {concept.overview.climateStrategy}
                </p>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs">
                  <div className="text-[10px] uppercase font-bold text-emerald-400">Net Zero Target</div>
                  <div className="text-lg font-bold text-emerald-200 mt-0.5">
                    Year {concept.sustainabilityStrategy?.netZeroYear || concept.targetYear - 10}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Annual Carbon Absorption: {(concept.sustainabilityStrategy?.carbonAbsorptionTonsYr || 350000).toLocaleString()} tons/yr
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
                <h3 className="font-heading font-bold text-sm text-slate-100">
                  Target Development Goals
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {concept.developmentGoals.map((goal, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-[11px] bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. INFRASTRUCTURE & MATERIALS */}
        {activeSection === 'infrastructure' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-400" />
                Urban Topology & Vertical Zoning
              </h3>
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-slate-200">Topology:</span> {concept.infrastructure.urbanTopology}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs uppercase font-bold text-slate-400">Vertical Strata Layers</div>
                {concept.infrastructure.verticalZoning.map((stratum, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-cyan-950 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{stratum}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" />
                Materials & Subterranean Logistics
              </h3>

              <div>
                <div className="text-xs uppercase font-bold text-slate-400 mb-1.5">Advanced Structural Materials</div>
                <div className="flex flex-wrap gap-1.5">
                  {concept.infrastructure.structuralMaterials.map((mat, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Skybridge Network</div>
                <p className="text-xs text-slate-300 leading-relaxed">{concept.infrastructure.skybridgeNetwork}</p>
              </div>

              <div className="pt-2">
                <div className="text-xs uppercase font-bold text-slate-400 mb-1">Subterranean Systems</div>
                <p className="text-xs text-slate-300 leading-relaxed">{concept.infrastructure.subterraneanSystems}</p>
              </div>
            </div>
          </div>
        )}

        {/* 3. CLEAN ENERGY GRID */}
        {activeSection === 'energy' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Primary Renewable Energy Generation
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-300">
                  {concept.energy.cleanEnergyShare}% Clean
                </span>
              </div>

              <div className="space-y-3">
                {concept.energy.primarySources.map((source, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-100">{source.name}</span>
                      <span className="text-amber-400 font-mono">{source.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full" style={{ width: `${source.percentage}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">{source.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-400">Energy Storage Technology</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{concept.energy.storageTechnology}</p>
              </div>

              <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
                <h4 className="text-xs uppercase font-bold text-slate-400">Grid Resilience & Islanding</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{concept.energy.gridResilience}</p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Annual Output Capacity:</span>
                  <span className="font-mono text-amber-300 font-bold">{concept.energy.annualOutputTWh} TWh/yr</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. AUTONOMOUS MOBILITY */}
        {activeSection === 'transit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {concept.transportation.modes.map((mode, idx) => (
                <div key={idx} className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 uppercase">{mode.type}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                      {mode.speedKmh}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-slate-100 text-sm">{mode.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{mode.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Pedestrian Realm Share</div>
                <div className="text-2xl font-bold font-heading text-cyan-400 mt-1">
                  {concept.transportation.pedestrianZonePercentage}%
                </div>
                <p className="text-xs text-slate-400 mt-2">Surface streets dedicated exclusively to walking, active wheels, and biophilic corridors.</p>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Congestion Management</div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{concept.transportation.congestionManagement}</p>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">eVTOL & Airspace Corridors</div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{concept.transportation.evTolNetwork}</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. WATER & WASTE */}
        {activeSection === 'water' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-cyan-400" />
                  Water Generation & Closed-Loop
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  {concept.waterWaste.closedLoopRecyclingRate}% Recycled
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{concept.waterWaste.waterGeneration}</p>
              <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs">
                <div className="font-semibold text-cyan-300">Stormwater & Sponge Infrastructure</div>
                <p className="text-slate-300 mt-1">{concept.waterWaste.stormwaterAndFloodDefense}</p>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Zero-Waste & Circular Conversion
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">{concept.waterWaste.wasteToEnergy}</p>
              <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs">
                <div className="font-semibold text-indigo-300">Circular Economy Rating</div>
                <div className="text-2xl font-bold font-heading text-indigo-200 mt-1">
                  {concept.sustainabilityStrategy?.circularEconomyIndex || 95}% Circularity
                </div>
                <p className="text-slate-400 mt-1">Zero landfill output; all municipal and commercial effluents converted to bio-feedstocks or clean energy.</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. CIVIC HEALTH, EDUCATION & SAFETY */}
        {activeSection === 'civic' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-400" />
                Healthcare Ecosystem
              </h3>
              <div className="text-xs text-slate-300 space-y-2">
                <div>
                  <span className="font-semibold text-slate-200">Triage:</span> {concept.healthcareEducationSafety.healthcare.triageSystem}
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Preventive Care:</span> {concept.healthcareEducationSafety.healthcare.preventiveTech}
                </div>
                <div className="pt-2 text-rose-300 font-mono font-bold">
                  {concept.healthcareEducationSafety.healthcare.facilitiesCount} Integrated Wellness Clinics
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" />
                Lifelong Education
              </h3>
              <div className="text-xs text-slate-300 space-y-2">
                <div>
                  <span className="font-semibold text-slate-200">Paradigm:</span> {concept.healthcareEducationSafety.education.paradigm}
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Learning Hubs:</span> {concept.healthcareEducationSafety.education.lifelongLearningHubs}
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Civic Safety & Ethics
              </h3>
              <div className="text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Response Speed:</span>
                  <span className="font-mono text-cyan-400 font-bold">{concept.healthcareEducationSafety.civicSafety.emergencyResponseMinutes} min average</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-200">Hazards:</span> {concept.healthcareEducationSafety.civicSafety.hazardMitigation}
                </div>
                <div>
                  <span className="font-semibold text-slate-200">AI Privacy:</span> {concept.healthcareEducationSafety.civicSafety.civicAiEthics}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. BUDGET APPROXIMATIONS */}
        {activeSection === 'budget' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Capital Expenditure (CAPEX)</div>
                <div className="text-3xl font-bold font-heading text-cyan-400 mt-1">
                  ${concept.budgetApproximation.totalCapexBillions} B
                </div>
                <div className="text-xs text-slate-400 mt-1">Simulated full-lifecycle development cost</div>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Annual Operational (OPEX)</div>
                <div className="text-3xl font-bold font-heading text-indigo-400 mt-1">
                  ${concept.budgetApproximation.annualOpexBillions} B/yr
                </div>
                <div className="text-xs text-slate-400 mt-1">Maintenance, AI orchestration & energy upkeep</div>
              </div>

              <div className="glass-panel rounded-2xl p-5 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Economic Payback Timeline</div>
                <div className="text-3xl font-bold font-heading text-emerald-400 mt-1">
                  {concept.budgetApproximation.estimatedPaybackYears} Years
                </div>
                <div className="text-xs text-slate-400 mt-1">Via carbon credits, surplus power & municipal tariffs</div>
              </div>
            </div>

            {/* Sector allocations */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-100">
                Sector Budget Allocation Breakdown
              </h3>
              <div className="space-y-4">
                {concept.budgetApproximation.sectorAllocations.map((alloc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-100">{alloc.sector}</span>
                      <span className="font-mono text-cyan-300">
                        ${alloc.amountBillions} B ({alloc.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full" style={{ width: `${alloc.percentage}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">{alloc.justification}</p>
                  </div>
                ))}
              </div>

              {/* Funding Mechanisms */}
              <div className="pt-4 border-t border-slate-800">
                <div className="text-xs uppercase font-bold text-slate-400 mb-2">Simulated Funding Mechanisms</div>
                <div className="flex flex-wrap gap-2">
                  {concept.budgetApproximation.fundingMechanism.map((mech, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg text-xs bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-medium">
                      {mech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Prominent disclaimer inside budget */}
              <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                {concept.budgetApproximation.disclaimer}
              </div>
            </div>
          </div>
        )}

        {/* 8. PHASED 4-STAGE ROADMAP */}
        {activeSection === 'roadmap' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {concept.phasedRoadmap.map((phase) => (
                <div key={phase.phaseNumber} className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center justify-center">
                        {phase.phaseNumber}
                      </span>
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {phase.years}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-slate-100 text-sm mt-3">
                      {phase.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {phase.focus}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-800/80">
                    <div className="text-[10px] uppercase font-bold text-slate-500">Key Milestones</div>
                    <ul className="space-y-1.5">
                      {phase.keyMilestones.map((m, idx) => (
                        <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                          <span className="text-cyan-400">▹</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Estimated Cost:</span>
                    <span className="font-mono text-cyan-300 font-bold">${phase.estimatedCostBillions} B</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
