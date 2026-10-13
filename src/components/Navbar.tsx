import React from 'react';
import {
  Compass,
  Sparkles,
  Layers,
  GitCompare,
  FolderGit2,
  Database,
  PlusCircle,
  Sun,
  Moon,
  Cpu,
  UserCheck,
  Download
} from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  systemStatus: {
    gemini?: { active: boolean; model: string; mode: string };
    supabase?: { configured: boolean; mode: string };
  };
  comparisonCount: number;
  onOpenSourceModal?: () => void;
}

const USER_ROLES: UserProfile['role'][] = [
  'Urban Planner',
  'Architect',
  'Student',
  'Designer',
  'Municipal Lead',
  'Researcher'
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUser,
  isDarkMode,
  setIsDarkMode,
  systemStatus,
  comparisonCount,
  onOpenSourceModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-fuchsia-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
                  FUTURE CITY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                  v3.8
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium">Concept Generator & Urban Studio</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('generator')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'generator'
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Generator</span>
            </button>

            <button
              onClick={() => setActiveTab('concepts')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'concepts'
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Concepts</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
                activeTab === 'compare'
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span>Compare</span>
              {comparisonCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950">
                  {comparisonCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'projects'
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span>Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'database'
                  ? 'bg-slate-800/90 text-cyan-400 shadow-sm border border-cyan-500/30'
                  : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/60'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Storage &amp; DB</span>
            </button>
          </nav>

          {/* Right Actions & Status Indicators */}
          <div className="flex items-center gap-2.5">
            {/* Status Pills */}
            <div className="hidden lg:flex items-center gap-2 text-xs">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${
                  systemStatus.gemini?.active
                    ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                    : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300'
                }`}
                title="Gemini 3.8 Flash server integration status"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span className="font-medium">
                  {systemStatus.gemini?.active ? 'Gemini 3.8 Live' : 'AI Simulation'}
                </span>
              </div>

              <div
                onClick={() => setActiveTab('database')}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-cyan-950/80 border-cyan-500/40 text-cyan-300 cursor-pointer hover:bg-cyan-900/50 transition-colors"
                title="Browser Local Storage is active and persisting concepts in real-time"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-medium">Local Storage (Active)</span>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="relative group hidden sm:block">
              <button className="flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700">
                <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{currentUser.role}</span>
              </button>
              <div className="absolute right-0 mt-1 w-44 py-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-xl hidden group-hover:block z-50">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500">
                  Switch User Role
                </div>
                {USER_ROLES.map((role) => (
                  <button
                    key={role}
                    onClick={() => setCurrentUser({ ...currentUser, role })}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      currentUser.role === role ? 'text-cyan-400 bg-slate-800/80 font-medium' : 'text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{role}</span>
                    {currentUser.role === role && <span className="text-[10px]">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors"
              title={isDarkMode ? 'Toggle High-Contrast Mode' : 'Toggle Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Source Code Download & Architecture Action */}
            {onOpenSourceModal && (
              <button
                onClick={onOpenSourceModal}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
                title="Implementation Plan & Download Complete Source Code (.ZIP)"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">Source (.zip)</span>
              </button>
            )}

            {/* Quick Generate Action */}
            <button
              onClick={() => setActiveTab('generator')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New Concept</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-2 border-t border-slate-900 scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap ${
              activeTab === 'dashboard' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap ${
              activeTab === 'generator' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            AI Generator
          </button>
          <button
            onClick={() => setActiveTab('concepts')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap ${
              activeTab === 'concepts' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Concepts
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap ${
              activeTab === 'compare' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Compare ({comparisonCount})
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap ${
              activeTab === 'projects' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`px-3 py-1 rounded-md text-xs whitespace-nowrap ${
              activeTab === 'database' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Supabase
          </button>
        </div>
      </div>
    </header>
  );
};
