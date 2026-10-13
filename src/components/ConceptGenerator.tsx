import React, { useState } from 'react';
import { CityGenerateInput, Project, FutureCityConcept, TerrainType, CityTheme } from '../types';
import {
  Sparkles,
  MapPin,
  Users,
  Compass,
  DollarSign,
  Layers,
  Check,
  AlertTriangle,
  Loader2,
  Cpu,
  Globe,
  Sliders,
  ChevronRight,
  Zap,
  Leaf
} from 'lucide-react';
import { useToast } from './Toast';

interface ConceptGeneratorProps {
  projects: Project[];
  onConceptGenerated: (concept: FutureCityConcept) => void;
  systemStatus: {
    gemini?: { active: boolean; model: string; mode: string };
  };
}

const THEME_OPTIONS: CityTheme[] = [
  'Smart City',
  'Green City',
  'Eco City',
  'AI City',
  'Floating City',
  'Space City',
  'Circular City',
  'Solarpunk Haven',
  'Cyberpunk Oasis'
];

const TERRAIN_OPTIONS: TerrainType[] = [
  'Coastal & Delta',
  'Desert & Arid',
  'Archipelagic / Marine',
  'Alpine / Mountain',
  'Orbital / Low Gravity',
  'Subterranean',
  'Floating Oceanic Platform',
  'Forest Canopy / Boreal'
];

const COMMON_GOALS = [
  '100% Closed-Loop Clean Energy',
  'Zero Fossil Logistics & EV/Maglev',
  'Closed-Loop Water & Waste Recovery',
  'Universal Preventive Healthcare AI',
  'Climate-Resilient Biomaterials',
  'Affordable Biophilic Housing',
  'Ambient Algorithmic Triage',
  '15-Minute Hyper-Local Walking Radius'
];

const PRESETS: Partial<CityGenerateInput>[] = [
  {
    cityName: 'Helios Arcology 2080',
    location: 'Atacama Plateau, Chile',
    terrain: 'Desert & Arid',
    population: 620000,
    landAreaSqKm: 85,
    targetYear: 2080,
    budgetTargetBillions: 110,
    themes: ['Solarpunk Haven', 'Circular City', 'Smart City'],
    developmentGoals: ['100% Closed-Loop Clean Energy', 'Closed-Loop Water & Waste Recovery', 'Climate-Resilient Biomaterials']
  },
  {
    cityName: 'AeroVanguard Ring',
    location: 'Low-Earth Orbit Sun-Synchronous',
    terrain: 'Orbital / Low Gravity',
    population: 250000,
    landAreaSqKm: 45,
    targetYear: 2110,
    budgetTargetBillions: 340,
    themes: ['Space City', 'AI City', 'Circular City'],
    developmentGoals: ['100% Closed-Loop Clean Energy', 'Ambient Algorithmic Triage', 'Climate-Resilient Biomaterials']
  },
  {
    cityName: 'Biolume Canopy Megapolis',
    location: 'Nordic Boreal Shield, Norway',
    terrain: 'Forest Canopy / Boreal',
    population: 980000,
    landAreaSqKm: 140,
    targetYear: 2070,
    budgetTargetBillions: 135,
    themes: ['Green City', 'Eco City', 'Solarpunk Haven'],
    developmentGoals: ['Zero Fossil Logistics & EV/Maglev', '15-Minute Hyper-Local Walking Radius', 'Affordable Biophilic Housing']
  }
];

export const ConceptGenerator: React.FC<ConceptGeneratorProps> = ({
  projects,
  onConceptGenerated,
  systemStatus,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const [form, setForm] = useState<CityGenerateInput>({
    cityName: '',
    location: '',
    terrain: 'Coastal & Delta',
    population: 650000,
    landAreaSqKm: 110,
    targetYear: 2075,
    budgetTargetBillions: 120,
    themes: ['Smart City', 'Green City'],
    developmentGoals: ['100% Closed-Loop Clean Energy', 'Zero Fossil Logistics & EV/Maglev'],
    specialRequirements: '',
    projectId: projects[0]?.id || ''
  });

  const toggleTheme = (theme: string) => {
    setForm((prev) => {
      const exists = prev.themes.includes(theme);
      if (exists) {
        if (prev.themes.length <= 1) return prev; // keep at least 1
        return { ...prev, themes: prev.themes.filter((t) => t !== theme) };
      } else {
        return { ...prev, themes: [...prev.themes, theme] };
      }
    });
  };

  const toggleGoal = (goal: string) => {
    setForm((prev) => {
      const exists = prev.developmentGoals.includes(goal);
      if (exists) {
        return { ...prev, developmentGoals: prev.developmentGoals.filter((g) => g !== goal) };
      } else {
        return { ...prev, developmentGoals: [...prev.developmentGoals, goal] };
      }
    });
  };

  const applyPreset = (preset: Partial<CityGenerateInput>) => {
    setForm((prev) => ({
      ...prev,
      ...preset,
      themes: preset.themes || prev.themes,
      developmentGoals: preset.developmentGoals || prev.developmentGoals
    }));
    toast('info', 'Preset Applied', `Loaded blueprint defaults for ${preset.cityName}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.cityName.trim()) {
      toast('error', 'Missing Name', 'Please enter a name for your future city.');
      return;
    }
    if (!form.location.trim()) {
      toast('error', 'Missing Location', 'Please specify a geographical context or location.');
      return;
    }

    setLoading(true);
    setLoadingStep(1);

    const stepInterval = setInterval(() => {
      setLoadingStep((s) => (s < 4 ? s + 1 : s));
    }, 1200);

    try {
      const res = await fetch('/api/generate-concept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      clearInterval(stepInterval);

      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to generate concept');
      }

      toast(
        'success',
        'Future Concept Generated!',
        `Successfully synthesized ${json.data.name} using ${json.mode === 'gemini-live' ? 'Google Gemini 3.8 Flash' : 'Simulated Urban Engine'}.`
      );
      onConceptGenerated(json.data);
    } catch (err: any) {
      clearInterval(stepInterval);
      toast('error', 'Generation Error', err.message || 'An unexpected error occurred during synthesis.');
    } finally {
      setLoading(false);
      setLoadingStep(0);
    }
  };

  const loadingMessages = [
    'Synthesizing urban metabolism and site topology...',
    'Modeling closed-loop renewable energy & microgrid balances...',
    'Orchestrating autonomous transit & vertical spatial zoning...',
    'Calculating capital expenditures and economic approximations...',
    'Finalizing district radar topology & 4-stage roadmap...'
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-50 tracking-tight">
              AI City Concept Generator
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Synthesize full-spectrum futuristic urban designs with Gemini 3.8 Flash. Generates renewable grids, autonomous mobility, closed-loop waste, financial approximations, and topological zoning.
          </p>
        </div>

        {/* Engine status indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Engine:</span>
          <span className="font-semibold text-slate-200">
            {systemStatus.gemini?.active ? 'Gemini 3.8 Flash (Active)' : 'Urban Planning Simulator'}
          </span>
        </div>
      </div>

      {/* Quick Presets Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Quick Visionary Presets
          </span>
          <span className="text-[11px] text-slate-500">Click to prefill generator parameters</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="text-left p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all group"
            >
              <div className="font-heading font-semibold text-xs text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
                <span>{preset.cityName}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                {preset.location} · {preset.targetYear}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Generator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-8 space-y-6">
          {/* Section 1: Identity & Geography */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              1. City Identity & Geographical Context
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  City Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Neo-Kyoto Biomimetic Hub"
                  value={form.cityName}
                  onChange={(e) => setForm({ ...form, cityName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder:text-slate-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Geographic Context / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kansai Valley, Japan or Sea of Japan"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 placeholder:text-slate-600 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Terrain & Environmental Biome
                </label>
                <select
                  value={form.terrain}
                  onChange={(e) => setForm({ ...form, terrain: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 transition-all"
                >
                  {TERRAIN_OPTIONS.map((ter) => (
                    <option key={ter} value={ter}>
                      {ter}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Future Horizon
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="2040"
                    max="2150"
                    step="5"
                    value={form.targetYear}
                    onChange={(e) => setForm({ ...form, targetYear: parseInt(e.target.value, 10) })}
                    className="flex-1 accent-cyan-400"
                  />
                  <span className="font-mono text-sm font-bold text-cyan-400 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">
                    {form.targetYear}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Demographics & Scale */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              2. Demographics, Spatial Area & Budget Target
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Population
                </label>
                <input
                  type="number"
                  min="10000"
                  max="50000000"
                  step="25000"
                  value={form.population}
                  onChange={(e) => setForm({ ...form, population: parseInt(e.target.value, 10) || 500000 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 font-mono transition-all"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {(form.population || 0).toLocaleString()} citizens
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Urban Footprint (sq km)
                </label>
                <input
                  type="number"
                  min="5"
                  max="1500"
                  step="5"
                  value={form.landAreaSqKm}
                  onChange={(e) => setForm({ ...form, landAreaSqKm: parseInt(e.target.value, 10) || 100 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 font-mono transition-all"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Density: ~{Math.round((form.population || 1) / (form.landAreaSqKm || 1)).toLocaleString()} / km²
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Projected Budget ($B USD)
                </label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  step="5"
                  value={form.budgetTargetBillions || 100}
                  onChange={(e) => setForm({ ...form, budgetTargetBillions: parseInt(e.target.value, 10) || 100 })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-100 font-mono transition-all"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  ${form.budgetTargetBillions} Billion USD*
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Themes & Development Goals */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="font-heading font-bold text-base text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              3. Futuristic Themes & Development Goals
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Urban Themes (Select 1 to 4)
              </label>
              <div className="flex flex-wrap gap-2">
                {THEME_OPTIONS.map((theme) => {
                  const selected = form.themes.includes(theme);
                  return (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => toggleTheme(theme)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                        selected
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {selected && <Check className="w-3.5 h-3.5" />}
                      <span>{theme}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Target Development Goals
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COMMON_GOALS.map((goal) => {
                  const selected = form.developmentGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`text-left p-2.5 rounded-xl text-xs transition-all flex items-center gap-2 border ${
                        selected
                          ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center shrink-0 text-[10px] ${
                          selected ? 'bg-indigo-500 text-white font-bold' : 'border border-slate-700'
                        }`}
                      >
                        {selected ? '✓' : ''}
                      </span>
                      <span className="truncate">{goal}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Special Visionary Notes / Specific Technologies (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Prioritize hyper-dense vertical mycelium towers, acoustic wave dampeners for storms, and non-intrusive neural education hubs."
                value={form.specialRequirements}
                onChange={(e) => setForm({ ...form, specialRequirements: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-xs text-slate-100 placeholder:text-slate-600 transition-all"
              />
            </div>
          </div>

          {/* AI Estimate Disclaimer & Submit Button */}
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200/90">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Planning Disclaimer:</strong> All energy, budgetary, and population models generated by AI are conceptual approximations intended for academic and spatial research.
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-heading font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Synthesizing Concept Blueprint...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Future City Concept Blueprint</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live Blueprint Specification Preview Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel-glow rounded-2xl p-5 border border-cyan-500/20 sticky top-24 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Live Spec Preview
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                YEAR {form.targetYear}
              </span>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative flex items-center justify-center w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full border-2 border-t-cyan-400 border-indigo-500 animate-spin" />
                  <Sparkles className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-100">
                    Gemini AI Active
                  </h4>
                  <p className="text-xs text-cyan-300 mt-1 max-w-xs animate-pulse">
                    {loadingMessages[loadingStep] || loadingMessages[0]}
                  </p>
                </div>
                <div className="w-48 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-500"
                    style={{ width: `${(loadingStep + 1) * 20}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Designation</div>
                  <div className="font-heading font-bold text-base text-slate-100 mt-0.5">
                    {form.cityName || 'Untitled Concept'}
                  </div>
                  <div className="text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {form.location || 'Location Pending'}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Terrain</div>
                    <div className="font-bold text-slate-200 mt-0.5 text-xs">{form.terrain}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Est. Budget</div>
                    <div className="font-bold text-cyan-400 mt-0.5 text-xs">${form.budgetTargetBillions}B*</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Population Target</div>
                  <div className="font-bold text-slate-100 mt-0.5 text-sm font-mono">
                    {form.population.toLocaleString()} citizens
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Footprint: {form.landAreaSqKm} sq km
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">Selected Themes</div>
                  <div className="flex flex-wrap gap-1">
                    {form.themes.map((th) => (
                      <span key={th} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                        {th}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">Development Goals ({form.developmentGoals.length})</div>
                  <div className="space-y-1">
                    {form.developmentGoals.slice(0, 3).map((g) => (
                      <div key={g} className="text-[11px] text-slate-300 flex items-center gap-1.5 truncate">
                        <span className="text-cyan-400 text-xs">▹</span>
                        <span className="truncate">{g}</span>
                      </div>
                    ))}
                    {form.developmentGoals.length > 3 && (
                      <div className="text-[10px] text-slate-500 pl-3">
                        +{form.developmentGoals.length - 3} more goals targeted
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
