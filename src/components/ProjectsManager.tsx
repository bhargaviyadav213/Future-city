import React, { useState } from 'react';
import { Project, FutureCityConcept } from '../types';
import {
  FolderGit2,
  PlusCircle,
  Trash2,
  Layers,
  Calendar,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useToast } from './Toast';

interface ProjectsManagerProps {
  projects: Project[];
  concepts: FutureCityConcept[];
  onCreateProject: (proj: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
  onFilterByProject: (projectId: string) => void;
}

export const ProjectsManager: React.FC<ProjectsManagerProps> = ({
  projects,
  concepts,
  onCreateProject,
  onDeleteProject,
  onFilterByProject,
}) => {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast('error', 'Project Title Required', 'Please enter a name for the project.');
      return;
    }

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onCreateProject({
      title,
      description,
      tags: tags.length > 0 ? tags : ['Urban Planning'],
      status: 'Active'
    });

    setTitle('');
    setDescription('');
    setTagInput('');
    setShowModal(false);
    toast('success', 'Project Created', `Project "${title}" established.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-50 tracking-tight">
            Urban Planning Projects
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Organize future city concepts into thematic research and municipal initiatives
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const associatedConcepts = concepts.filter((c) => c.projectId === project.id);
          return (
            <div
              key={project.id}
              className="glass-panel rounded-2xl p-5 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5" />
                    {project.status}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-slate-100">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {project.description || 'No description provided.'}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <button
                  onClick={() => onFilterByProject(project.id)}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{associatedConcepts.length} Concepts Linked</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onDeleteProject(project.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-panel-glow rounded-2xl p-6 border border-cyan-500/30 max-w-md w-full space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-100 flex items-center gap-2">
              <FolderGit2 className="w-5 h-5 text-cyan-400" />
              Create Urban Planning Project
            </h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Subterranean Arcologies 2090"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Goals and spatial criteria for this initiative..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Arcology, Geothermal, Zero-Carbon"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
