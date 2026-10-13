import React, { useState, useEffect, useCallback } from 'react';
import { FutureCityConcept, Project, ActivityItem, UserProfile } from './types';
import { ToastProvider, useToast } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ConceptGenerator } from './components/ConceptGenerator';
import { ConceptsLibrary } from './components/ConceptsLibrary';
import { ConceptDetail } from './components/ConceptDetail';
import { ConceptComparison } from './components/ConceptComparison';
import { ProjectsManager } from './components/ProjectsManager';
import { DatabaseModal } from './components/DatabaseModal';
import { ConceptEditModal } from './components/ConceptEditModal';
import { SourceCodeModal } from './components/SourceCodeModal';
import {
  getStoredConcepts,
  addStoredConcept,
  updateStoredConcept,
  deleteStoredConcept,
  getStoredProjects,
  addStoredProject,
  deleteStoredProject,
  getStoredActivity,
  getStoredProfile,
  saveStoredProfile,
  getStoredComparisonIds,
  saveStoredComparisonIds,
  resetToDefaultSeeds,
} from './lib/storage';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [concepts, setConcepts] = useState<FutureCityConcept[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>({
    gemini: { active: false, model: 'gemini-3.8-flash', mode: 'simulation' },
    supabase: { configured: false, mode: 'local' }
  });

  const [selectedConcept, setSelectedConcept] = useState<FutureCityConcept | null>(null);
  const [comparisonList, setComparisonList] = useState<FutureCityConcept[]>([]);
  const [editingConcept, setEditingConcept] = useState<FutureCityConcept | null>(null);
  const [showSourceModal, setShowSourceModal] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserProfile>(getStoredProfile());

  // Reload state directly from browser Local Storage
  const loadFromLocalStorage = useCallback(() => {
    const loadedConcepts = getStoredConcepts();
    const loadedProjects = getStoredProjects();
    const loadedActivities = getStoredActivity();
    const loadedProfile = getStoredProfile();
    const comparisonIds = getStoredComparisonIds();

    setConcepts(loadedConcepts);
    setProjects(loadedProjects);
    setActivities(loadedActivities);
    setCurrentUser(loadedProfile);

    // Resolve comparison list from stored IDs
    const matchedComparisons = loadedConcepts.filter((c) => comparisonIds.includes(c.id));
    setComparisonList(matchedComparisons);
  }, []);

  // Fetch server status (e.g. Gemini availability) and load local storage
  useEffect(() => {
    loadFromLocalStorage();

    fetch('/api/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((s) => {
        if (s) setSystemStatus(s);
      })
      .catch((err) => console.warn('Could not reach /api/status:', err))
      .finally(() => setLoadingInitial(false));
  }, [loadFromLocalStorage]);

  // Sync Dark Mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Concept Handlers with immediate Local Storage synchronization
  const handleConceptGenerated = (newConcept: FutureCityConcept) => {
    addStoredConcept(newConcept);
    loadFromLocalStorage();
    setSelectedConcept(newConcept);
    setActiveTab('concepts');
  };

  const handleEditConcept = (updated: FutureCityConcept) => {
    updateStoredConcept(updated);
    loadFromLocalStorage();
    if (selectedConcept?.id === updated.id) {
      setSelectedConcept(updated);
    }
  };

  const handleDeleteConcept = (id: string) => {
    deleteStoredConcept(id);
    loadFromLocalStorage();
    if (selectedConcept?.id === id) {
      setSelectedConcept(null);
    }
    toast('info', 'Concept Deleted', 'Removed from local storage.');
  };

  const handleToggleArchive = (concept: FutureCityConcept) => {
    const updatedStatus = concept.status === 'Archived' ? 'Completed' : 'Archived';
    const updated = { ...concept, status: updatedStatus as any };
    handleEditConcept(updated);
    toast(
      'info',
      updatedStatus === 'Archived' ? 'Concept Archived' : 'Concept Restored',
      `${concept.name} marked as ${updatedStatus} in local storage.`
    );
  };

  const handleAddToCompare = (concept: FutureCityConcept) => {
    const exists = comparisonList.some((c) => c.id === concept.id);
    let updatedList: FutureCityConcept[];

    if (exists) {
      updatedList = comparisonList.filter((c) => c.id !== concept.id);
      toast('info', 'Removed from Comparison', `${concept.name} excluded from matrix.`);
    } else {
      if (comparisonList.length >= 4) {
        toast('warning', 'Comparison Limit', 'You can compare up to 4 concepts simultaneously.');
        return;
      }
      updatedList = [...comparisonList, concept];
      toast('success', 'Added to Comparison', `${concept.name} added to comparison matrix.`);
    }

    setComparisonList(updatedList);
    saveStoredComparisonIds(updatedList.map((c) => c.id));
  };

  const handleClearCompare = () => {
    setComparisonList([]);
    saveStoredComparisonIds([]);
    toast('info', 'Comparison Cleared', 'Matrix reset in local storage.');
  };

  const handleCreateProject = (projData: Partial<Project>) => {
    const newProj: Project = {
      id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: projData.title || 'Untitled Project',
      description: projData.description || '',
      tags: projData.tags || ['Urban Planning'],
      status: projData.status || 'Active',
      conceptCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addStoredProject(newProj);
    loadFromLocalStorage();
  };

  const handleDeleteProject = (id: string) => {
    deleteStoredProject(id);
    loadFromLocalStorage();
    toast('info', 'Project Deleted', 'Removed from local storage.');
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    setCurrentUser(profile);
    saveStoredProfile(profile);
  };

  const handleResetSampleData = () => {
    resetToDefaultSeeds();
    loadFromLocalStorage();
    toast('success', 'Local Storage Reset', 'Restored default architectural seeds into browser storage.');
  };

  if (loadingInitial) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-cyan-400 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
        <p className="font-heading font-semibold text-sm tracking-widest uppercase text-slate-300">
          Loading Local Storage Concept Studio...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar
        activeTab={selectedConcept ? 'concepts' : activeTab}
        setActiveTab={(tab) => {
          setSelectedConcept(null);
          setActiveTab(tab);
        }}
        currentUser={currentUser}
        setCurrentUser={handleUpdateProfile}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        systemStatus={systemStatus}
        comparisonCount={comparisonList.length}
        onOpenSourceModal={() => setShowSourceModal(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {selectedConcept ? (
          <ConceptDetail
            concept={selectedConcept}
            onBack={() => setSelectedConcept(null)}
            onEdit={(concept) => setEditingConcept(concept)}
            onDelete={handleDeleteConcept}
            onToggleArchive={handleToggleArchive}
            onAddToCompare={handleAddToCompare}
            isCompared={comparisonList.some((c) => c.id === selectedConcept.id)}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                concepts={concepts}
                projects={projects}
                activities={activities}
                currentUser={currentUser}
                onSelectConcept={(c) => setSelectedConcept(c)}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onAddToCompare={handleAddToCompare}
                comparisonList={comparisonList}
                onOpenSourceModal={() => setShowSourceModal(true)}
              />
            )}

            {activeTab === 'generator' && (
              <ConceptGenerator
                projects={projects}
                onConceptGenerated={handleConceptGenerated}
                systemStatus={systemStatus}
              />
            )}

            {activeTab === 'concepts' && (
              <ConceptsLibrary
                concepts={concepts}
                projects={projects}
                onSelectConcept={(c) => setSelectedConcept(c)}
                onEditConcept={(c) => setEditingConcept(c)}
                onDeleteConcept={handleDeleteConcept}
                onToggleArchive={handleToggleArchive}
                onAddToCompare={handleAddToCompare}
                comparisonList={comparisonList}
                onNewConcept={() => setActiveTab('generator')}
              />
            )}

            {activeTab === 'compare' && (
              <ConceptComparison
                comparisonList={comparisonList}
                allConcepts={concepts}
                onRemoveFromCompare={(id) =>
                  setComparisonList((prev) => prev.filter((c) => c.id !== id))
                }
                onAddToCompare={handleAddToCompare}
                onClearCompare={handleClearCompare}
                onSelectConcept={(c) => setSelectedConcept(c)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsManager
                projects={projects}
                concepts={concepts}
                onCreateProject={handleCreateProject}
                onDeleteProject={handleDeleteProject}
                onFilterByProject={(projId) => {
                  setActiveTab('concepts');
                }}
              />
            )}

            {activeTab === 'database' && (
              <DatabaseModal
                systemStatus={systemStatus}
                onResetSampleData={handleResetSampleData}
                onRefreshFromStorage={loadFromLocalStorage}
              />
            )}
          </>
        )}
      </main>

      {/* Concept Edit Modal */}
      {editingConcept && (
        <ConceptEditModal
          concept={editingConcept}
          onClose={() => setEditingConcept(null)}
          onSave={handleEditConcept}
        />
      )}

      {/* Source Code Explorer & ZIP Downloader Modal */}
      {showSourceModal && (
        <SourceCodeModal onClose={() => setShowSourceModal(false)} />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-300">Future City Concept Generator</span>
            <span>·</span>
            <span className="text-cyan-400">Browser Local Storage Powered</span>
            <span>·</span>
            <span>Google Gemini 3.8 Flash</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Conceptual planning &amp; educational simulator · AI estimates are unverified approximations
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
