import type { ReactNode } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-ink-700/80 bg-ink-850/60 backdrop-blur-sm shadow-card ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({ kicker, title, desc }: { kicker: string; title: string; desc: string }) {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
        <span className="h-1 w-6 rounded-full bg-brand-400" />
        {kicker}
      </span>
      <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-ink-100 tracking-tight">{title}</h2>
      <p className="mt-3 text-ink-300 text-sm sm:text-base leading-relaxed">{desc}</p>
    </div>
  );
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'brand' | 'gold' | 'rose' | 'accent' }) {
  const tones: Record<string, string> = {
    neutral: 'bg-ink-700/60 text-ink-200 border-ink-600',
    brand:   'bg-brand-500/10 text-brand-300 border-brand-500/30',
    gold:    'bg-gold-500/10 text-gold-400 border-gold-500/30',
    rose:    'bg-rose-500/10 text-rose-400 border-rose-500/30',
    accent:  'bg-accent-500/10 text-accent-300 border-accent-500/30',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function DeltaBadge({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const up = value >= 0;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold tabular ${
        up ? 'bg-brand-500/10 text-brand-300' : 'bg-rose-500/10 text-rose-400'
      }`}
    >
      {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      {up ? '+' : ''}{value}{suffix}
    </span>
  );
}

export function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  accent = 'brand',
}: {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon: ReactNode;
  accent?: 'brand' | 'gold' | 'accent' | 'rose';
}) {
  const ring: Record<string, string> = {
    brand:  'from-brand-500/20 to-brand-500/0 text-brand-300',
    gold:   'from-gold-500/20 to-gold-500/0 text-gold-400',
    accent: 'from-accent-500/20 to-accent-500/0 text-accent-300',
    rose:   'from-rose-500/20 to-rose-500/0 text-rose-400',
  };
  return (
    <Card className="p-5 relative overflow-hidden group">
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br ${ring[accent]} blur-xl opacity-70 group-hover:opacity-100 transition-opacity`} />
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-400">{label}</p>
          <p className="mt-2 text-2xl sm:text-[28px] font-bold text-ink-100 tabular leading-none">{value}</p>
        </div>
        <div className={`shrink-0 rounded-lg p-2 bg-ink-800/80 ${ring[accent].split(' ').pop()}`}>
          {icon}
        </div>
      </div>
      {(delta !== undefined || deltaLabel) && (
        <div className="mt-4 flex items-center gap-2">
          {delta !== undefined && <DeltaBadge value={delta} />}
          {deltaLabel && <span className="text-xs text-ink-400">{deltaLabel}</span>}
        </div>
      )}
    </Card>
  );
}

export function ChartFrame({ title, subtitle, right, children, className = '' }: { title: string; subtitle?: string; right?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-ink-100">{title}</h4>
          {subtitle && <p className="text-xs text-ink-400 mt-0.5">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </Card>
  );
}
