import React, { useState } from 'react';
import { FutureCityConcept, ConceptStatus } from '../types';
import { X, Save, Edit3 } from 'lucide-react';
import { useToast } from './Toast';

interface ConceptEditModalProps {
  concept: FutureCityConcept;
  onClose: () => void;
  onSave: (updated: FutureCityConcept) => void;
}

export const ConceptEditModal: React.FC<ConceptEditModalProps> = ({
  concept,
  onClose,
  onSave,
}) => {
  const { toast } = useToast();
  const [form, setForm] = useState<FutureCityConcept>({ ...concept });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast('error', 'Validation Error', 'City name is required.');
      return;
    }
    onSave(form);
    toast('success', 'Concept Updated', `Saved modifications to ${form.name}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto no-print">
      <div className="glass-panel-glow rounded-3xl p-6 border border-cyan-500/30 max-w-2xl w-full my-8 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-lg text-slate-100">
              Edit City Concept Specifications
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">City Designation Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Geographic Context / Location</label>
              <input
                type="text"
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Visionary Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Target Horizon Year</label>
              <input
                type="number"
                value={form.targetYear}
                onChange={(e) => setForm({ ...form, targetYear: parseInt(e.target.value, 10) || 2075 })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Planned Population</label>
              <input
                type="number"
                value={form.population}
                onChange={(e) => setForm({ ...form, population: parseInt(e.target.value, 10) || 500000 })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ConceptStatus })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-cyan-500"
              >
                <option value="Draft">Draft</option>
                <option value="Generating">Generating</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Overview Summary</label>
            <textarea
              rows={4}
              value={form.overview.summary}
              onChange={(e) =>
                setForm({
                  ...form,
                  overview: { ...form.overview, summary: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:border-cyan-500 leading-relaxed"
            />
          </div>

          {/* Quantitative Indices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Eco Score (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.ecoScore}
                onChange={(e) => setForm({ ...form, ecoScore: parseInt(e.target.value, 10) || 85 })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Innovation Index</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.innovationIndex}
                onChange={(e) => setForm({ ...form, innovationIndex: parseInt(e.target.value, 10) || 90 })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Livability Rating</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.livabilityRating}
                onChange={(e) => setForm({ ...form, livabilityRating: parseInt(e.target.value, 10) || 88 })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-medium mb-1">Resilience Score</label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.resilienceScore}
                onChange={(e) => setForm({ ...form, resilienceScore: parseInt(e.target.value, 10) || 92 })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors shadow-md shadow-cyan-500/20"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
