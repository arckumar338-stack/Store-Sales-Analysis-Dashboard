import { useState } from 'react';
import { LayoutDashboard, FlaskConical, Database, Sparkles, BarChart3, Github, ExternalLink } from 'lucide-react';
import { Overview } from './components/Overview';
import { CleaningLab } from './components/CleaningLab';
import { DatabaseSection } from './components/DatabaseSection';
import { EdaSection } from './components/EdaSection';
import { Dashboard } from './components/Dashboard';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, comp: Overview },
  { id: 'cleaning', label: 'Cleaning Lab', icon: Sparkles, comp: CleaningLab },
  { id: 'database', label: 'Database & SQL', icon: Database, comp: DatabaseSection },
  { id: 'eda', label: 'EDA', icon: FlaskConical, comp: EdaSection },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, comp: Dashboard },
] as const;

function App() {
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('overview');
  const ActiveComp = TABS.find((t) => t.id === active)!.comp;

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 grid-bg">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow shrink-0">
              <BarChart3 size={18} className="text-ink-950" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold tracking-tight truncate">Store Sales Analysis</h1>
              <p className="text-[11px] text-ink-400 truncate">Full data lifecycle portfolio</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1 rounded-xl border border-ink-800 bg-ink-900/60 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${active === t.id ? 'bg-brand-500 text-ink-950' : 'text-ink-300 hover:text-ink-100 hover:bg-ink-800'}`}
              >
                <t.icon size={15} />
                {t.label}
              </button>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-ink-400 hover:text-brand-300 transition-colors" aria-label="Source">
              <Github size={18} />
            </a>
            <a href="#" className="text-ink-400 hover:text-brand-300 transition-colors" aria-label="Live">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        {/* Mobile tab bar */}
        <div className="md:hidden border-t border-ink-800 overflow-x-auto scrollbar-thin">
          <div className="flex gap-1 px-4 py-2 min-w-max">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${active === t.id ? 'bg-brand-500 text-ink-950' : 'text-ink-300 bg-ink-900'}`}
              >
                <t.icon size={13} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Glow accent */}
      <div className="glow-radial h-32 w-full" />

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <ActiveComp />
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-800 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            Store Sales Analysis Dashboard — portfolio project covering cleaning, warehousing, EDA & BI.
          </p>
          <div className="flex items-center gap-4 text-xs text-ink-400">
            <span>React · Tailwind · Recharts</span>
            <span className="h-3 w-px bg-ink-700" />
            <span className="text-brand-400">v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
