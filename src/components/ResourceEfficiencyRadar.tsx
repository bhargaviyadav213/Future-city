import React, { useState } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { FutureCityConcept } from '../types';
import {
  Zap,
  Droplets,
  Recycle,
  Activity,
  Layers,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';

interface ResourceEfficiencyRadarProps {
  concept: FutureCityConcept;
}

export const ResourceEfficiencyRadar: React.FC<ResourceEfficiencyRadarProps> = ({ concept }) => {
  const [showBaseline, setShowBaseline] = useState<boolean>(true);

  // Extract core metrics with resilient fallbacks
  const electricityScore = concept.energy.cleanEnergyShare || 100;
  const waterScore = Math.min(100, Math.round(concept.waterWaste.closedLoopRecyclingRate || 98));
  const wasteScore = Math.min(100, Math.round(concept.sustainabilityStrategy?.circularEconomyIndex || 95));
  const transitScore = Math.min(100, Math.round(concept.transportation.pedestrianZonePercentage || 85));
  const resilienceScore = concept.resilienceScore || 92;
  const ecoScore = concept.ecoScore || 94;

  // Radar chart data comparing Electricity, Water, Waste (and extended ecological dimensions)
  const radarData = [
    {
      subject: 'Electricity Efficiency',
      dimension: 'Clean Power',
      cityScore: electricityScore,
      baselineScore: 28, // Conventional 2026 city baseline
      unit: '% Clean Baseload',
      description: 'Zero-emission solar, fusion & geothermal share'
    },
    {
      subject: 'Water Closed-Loop',
      dimension: 'Hydrology',
      cityScore: waterScore,
      baselineScore: 18, // Conventional 2026 city baseline
      unit: '% Recycled Loop',
      description: 'Atmospheric harvest & 98%+ closed-loop recovery'
    },
    {
      subject: 'Waste Circularity',
      dimension: 'Zero Waste',
      cityScore: wasteScore,
      baselineScore: 14, // Conventional 2026 city baseline
      unit: '% Diverted/Converted',
      description: 'Plasma gasification & bio-enzymatic synthesis'
    },
    {
      subject: 'Transit Decarb',
      dimension: 'Mobility',
      cityScore: transitScore,
      baselineScore: 22,
      unit: '% Active & Transit',
      description: 'Pedestrianized realm & autonomous electric pods'
    },
    {
      subject: 'Grid Resilience',
      dimension: 'Islanding',
      cityScore: resilienceScore,
      baselineScore: 45,
      unit: '/100 Index',
      description: 'Fractal self-healing microgrid autonomy'
    },
    {
      subject: 'Carbon Neutrality',
      dimension: 'Ecology',
      cityScore: ecoScore,
      baselineScore: 32,
      unit: '/100 Score',
      description: 'Net-zero timeline & bio-sequestration sinks'
    }
  ];

  // Composite Resource Efficiency Average across Electricity, Water, and Waste
  const coreResourceAvg = Math.round((electricityScore + waterScore + wasteScore) / 3);

  // Custom Recharts Tooltip for dark futuristic theme
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-950/95 border border-cyan-500/40 p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs space-y-1.5 z-50">
          <div className="font-heading font-bold text-slate-100 flex items-center justify-between gap-4">
            <span>{data.subject}</span>
            <span className="text-[10px] text-cyan-400 font-mono">[{data.dimension}]</span>
          </div>
          <p className="text-[11px] text-slate-400 max-w-xs">{data.description}</p>
          <div className="pt-1.5 border-t border-slate-800 space-y-1">
            <div className="flex items-center justify-between gap-4 text-cyan-300 font-bold">
              <span>{concept.name}:</span>
              <span className="font-mono text-sm">{data.cityScore}{data.unit.includes('%') ? '%' : '/100'}</span>
            </div>
            {showBaseline && (
              <div className="flex items-center justify-between gap-4 text-slate-500 font-medium">
                <span>2026 Conventional Baseline:</span>
                <span className="font-mono">{data.baselineScore}{data.unit.includes('%') ? '%' : '/100'}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border border-cyan-500/25 relative overflow-hidden space-y-6">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Resource Consumption &amp; Efficiency Radar
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
              Recharts Multi-Axis
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Tri-pillar ecological analysis evaluating Electricity, Water Closed-Loop, and Waste Circularity performance
          </p>
        </div>

        {/* Baseline toggle & composite score */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowBaseline(!showBaseline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
              showBaseline
                ? 'bg-slate-900 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{showBaseline ? '✓ Baseline Overlay' : '+ 2026 Baseline'}</span>
          </button>

          <div className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-xs">
            <span className="text-slate-400 text-[10px] block uppercase font-bold">Composite Index</span>
            <span className="font-heading font-extrabold text-sm text-cyan-300">
              {coreResourceAvg}%
            </span>
          </div>
        </div>
      </div>

      {/* Core Grid: Radar Chart + 3 Focus Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Radar Chart Visualizer (Recharts) */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl border border-slate-800/80 p-4 relative aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Subtle grid backdrop */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#1e293b" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'Space Grotesk' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#475569', fontSize: 9 }}
                stroke="#1e293b"
              />

              {/* 2026 Baseline Radar (Muted Slate / Reddish-Gray) */}
              {showBaseline && (
                <Radar
                  name="2026 Conventional City Baseline"
                  dataKey="baselineScore"
                  stroke="#64748b"
                  fill="#475569"
                  fillOpacity={0.25}
                  strokeDasharray="4 4"
                />
              )}

              {/* Future City Concept Radar (Vibrant Cyan / Purple Glow) */}
              <Radar
                name={concept.name}
                dataKey="cityScore"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="#06b6d4"
                fillOpacity={0.45}
              />

              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{
                  paddingTop: '10px',
                  fontSize: '11px',
                  fontFamily: 'Plus Jakarta Sans',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Tri-Pillar Breakdown Cards (Electricity, Water, Waste) */}
        <div className="lg:col-span-5 space-y-3">
          {/* 1. Electricity Pillar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 hover:border-amber-400/50 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-100 uppercase tracking-wider">
                    Electricity Efficiency
                  </h4>
                  <span className="text-[10px] text-slate-400">Zero-Carbon Generation</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-heading font-extrabold text-amber-300">
                  {electricityScore}%
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold block flex items-center justify-end gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> +{electricityScore - 28}% vs 2026
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full" style={{ width: `${electricityScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Powered by {concept.energy.primarySources.map((s) => s.name).slice(0, 2).join(' & ')} with {concept.energy.annualOutputTWh} TWh/yr capacity.
            </p>
          </div>

          {/* 2. Water Pillar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400/50 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                  <Droplets className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-100 uppercase tracking-wider">
                    Water Closed-Loop
                  </h4>
                  <span className="text-[10px] text-slate-400">Atmospheric &amp; Nanofiltration</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-heading font-extrabold text-cyan-300">
                  {waterScore}%
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold block flex items-center justify-end gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> +{waterScore - 18}% vs 2026
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${waterScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Closed-loop greywater reclamation paired with {concept.waterWaste.waterGeneration.slice(0, 75)}...
            </p>
          </div>

          {/* 3. Waste Circularity Pillar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400/50 transition-all space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                  <Recycle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs text-slate-100 uppercase tracking-wider">
                    Waste Circularity Index
                  </h4>
                  <span className="text-[10px] text-slate-400">Zero Landfill Effluent</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base font-heading font-extrabold text-emerald-300">
                  {wasteScore}%
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold block flex items-center justify-end gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> +{wasteScore - 14}% vs 2026
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${wasteScore}%` }} />
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Full circular conversion: organic matter into biomethane &amp; solid effluents into inert construction geopolymers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
