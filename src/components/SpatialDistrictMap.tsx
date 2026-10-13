import React, { useState } from 'react';
import { SpatialNode } from '../types';
import {
  Layers,
  Zap,
  Train,
  TreePine,
  Building2,
  Atom,
  Info,
  Maximize2
} from 'lucide-react';

interface SpatialDistrictMapProps {
  districts: SpatialNode[];
  mapStyle?: string;
  urbanDiameterKm?: number;
  cityName: string;
}

export const SpatialDistrictMap: React.FC<SpatialDistrictMapProps> = ({
  districts,
  mapStyle = 'radial',
  urbanDiameterKm = 16.0,
  cityName
}) => {
  const [selectedNode, setSelectedNode] = useState<SpatialNode | null>(districts[0] || null);
  const [filterType, setFilterType] = useState<string>('all');

  const getNodeColor = (type: SpatialNode['type']) => {
    switch (type) {
      case 'civic':
        return { bg: 'bg-indigo-500', stroke: '#6366f1', glow: 'shadow-indigo-500/50', text: 'text-indigo-400' };
      case 'energy':
        return { bg: 'bg-amber-400', stroke: '#f59e0b', glow: 'shadow-amber-400/50', text: 'text-amber-400' };
      case 'transport':
        return { bg: 'bg-cyan-400', stroke: '#06b6d4', glow: 'shadow-cyan-400/50', text: 'text-cyan-400' };
      case 'nature':
        return { bg: 'bg-emerald-400', stroke: '#10b981', glow: 'shadow-emerald-400/50', text: 'text-emerald-400' };
      case 'residential':
        return { bg: 'bg-sky-400', stroke: '#38bdf8', glow: 'shadow-sky-400/50', text: 'text-sky-400' };
      case 'research':
        return { bg: 'bg-fuchsia-400', stroke: '#d946ef', glow: 'shadow-fuchsia-400/50', text: 'text-fuchsia-400' };
      default:
        return { bg: 'bg-slate-400', stroke: '#94a3b8', glow: 'shadow-slate-400/50', text: 'text-slate-400' };
    }
  };

  const getNodeIcon = (type: SpatialNode['type']) => {
    switch (type) {
      case 'civic':
        return <Building2 className="w-3.5 h-3.5 text-indigo-300" />;
      case 'energy':
        return <Zap className="w-3.5 h-3.5 text-amber-300" />;
      case 'transport':
        return <Train className="w-3.5 h-3.5 text-cyan-300" />;
      case 'nature':
        return <TreePine className="w-3.5 h-3.5 text-emerald-300" />;
      case 'residential':
        return <Layers className="w-3.5 h-3.5 text-sky-300" />;
      case 'research':
        return <Atom className="w-3.5 h-3.5 text-fuchsia-300" />;
    }
  };

  const filteredDistricts = districts.filter(
    (d) => filterType === 'all' || d.type === filterType
  );

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              Spatial Zoning & District Topology
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
              {mapStyle}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive metropolitan nodes · Approx diameter: {urbanDiameterKm} km
          </p>
        </div>

        {/* District Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          {['all', 'civic', 'energy', 'transport', 'nature', 'residential', 'research'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                filterType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Interactive Holographic Radar Map */}
        <div className="lg:col-span-7 bg-slate-950/90 rounded-xl border border-cyan-950/80 p-4 relative aspect-square sm:aspect-[4/3] flex items-center justify-center overflow-hidden shadow-inner">
          {/* Futuristic Background Grid Lines */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), radial-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px',
            }}
          />

          {/* Concentric Radar Rings */}
          <div className="absolute inset-4 rounded-full border border-cyan-500/10 pointer-events-none" />
          <div className="absolute inset-16 rounded-full border border-cyan-500/15 pointer-events-none" />
          <div className="absolute inset-28 rounded-full border border-cyan-500/20 pointer-events-none" />
          <div className="absolute inset-40 rounded-full border border-dashed border-cyan-500/25 pointer-events-none" />

          {/* Crosshair coordinate axes */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/15 pointer-events-none" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/15 pointer-events-none" />

          {/* SVG Transit Guideways linking nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="transitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Draw connecting lines between consecutive nodes */}
            {districts.map((node, i) => {
              const nextNode = districts[(i + 1) % districts.length];
              return (
                <line
                  key={`line-${i}`}
                  x1={`${node.coordinates.x}%`}
                  y1={`${node.coordinates.y}%`}
                  x2={`${nextNode.coordinates.x}%`}
                  y2={`${nextNode.coordinates.y}%`}
                  stroke="url(#transitGlow)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              );
            })}
          </svg>

          {/* Plotted District Nodes */}
          {filteredDistricts.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const colors = getNodeColor(node.type);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{
                  left: `${node.coordinates.x}%`,
                  top: `${node.coordinates.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 cursor-pointer group"
              >
                {/* Ping wave around active */}
                {isSelected && (
                  <span
                    className="absolute -inset-2 rounded-full opacity-75 animate-ping"
                    style={{ backgroundColor: colors.stroke }}
                  />
                )}

                {/* Node marker bubble */}
                <div
                  className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-lg ${
                    isSelected
                      ? `scale-125 border-white bg-slate-900 ${colors.glow}`
                      : 'border-slate-700 bg-slate-900 hover:scale-110 hover:border-cyan-400'
                  }`}
                  style={{ borderColor: isSelected ? '#ffffff' : colors.stroke }}
                >
                  {getNodeIcon(node.type)}
                </div>

                {/* Node Label Tooltip */}
                <div
                  className={`absolute left-1/2 -bottom-6 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-800 group-hover:text-white'
                  }`}
                >
                  {node.name.length > 20 ? `${node.name.substring(0, 18)}...` : node.name}
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-2 right-3 text-[10px] font-mono text-cyan-400/60 pointer-events-none">
            GRID // LAT 0.00° LNG 0.00° · DIA {urbanDiameterKm}KM
          </div>
        </div>

        {/* Selected Node Details Holographic Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        getNodeColor(selectedNode.type).text
                      } bg-slate-950 border-slate-800`}
                    >
                      {selectedNode.type} District
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Elev. {selectedNode.elevationMeters > 0 ? `+${selectedNode.elevationMeters}` : selectedNode.elevationMeters}m
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-100 mt-1">
                    {selectedNode.name}
                  </h4>
                </div>
                <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
                  {getNodeIcon(selectedNode.type)}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedNode.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-medium uppercase">Design Capacity</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">
                    {selectedNode.capacityOrSize}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="text-[10px] text-slate-400 font-medium uppercase">Highlight Metric</div>
                  <div className="text-xs font-bold text-cyan-400 mt-0.5">
                    {selectedNode.highlightMetric}
                  </div>
                </div>
              </div>

              {/* Coordinates & Elevation details */}
              <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs flex items-center justify-between">
                <span className="text-slate-400">Spatial Vector:</span>
                <span className="font-mono text-cyan-300 font-semibold">
                  [{selectedNode.coordinates.x}%, {selectedNode.coordinates.y}%] · H:{selectedNode.elevationMeters}m
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Info className="w-8 h-8 text-cyan-500/40 mb-2" />
              <p className="text-xs">Select any district node on the radar grid to inspect topological specifications.</p>
            </div>
          )}

          {/* Quick instructions footer */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>{filteredDistricts.length} districts mapped</span>
            <span className="text-cyan-400">Click node to inspect</span>
          </div>
        </div>
      </div>
    </div>
  );
};
