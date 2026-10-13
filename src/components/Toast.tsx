import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (type: ToastType, title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((type: ToastType, title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-md w-full px-4 no-print">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-3 ${
              t.type === 'success'
                ? 'bg-slate-900/95 border-cyan-500/40 text-cyan-50 shadow-cyan-950/40'
                : t.type === 'error'
                ? 'bg-slate-900/95 border-rose-500/40 text-rose-50 shadow-rose-950/40'
                : t.type === 'warning'
                ? 'bg-slate-900/95 border-amber-500/40 text-amber-50 shadow-amber-950/40'
                : 'bg-slate-900/95 border-blue-500/40 text-blue-50 shadow-blue-950/40'
            }`}
          >
            <div className="mt-0.5">
              {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-cyan-400" />}
              {t.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
              {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {t.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">{t.title}</div>
              {t.message && <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">{t.message}</div>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-slate-100 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
