import { useState, type ReactNode } from 'react';
import { GitCompareArrows, Box as BoxIcon, Code2, LineChart as LineIcon } from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, ReferenceLine,
} from 'recharts';
import { SectionHeading, Card, ChartFrame, Pill } from './ui';
import { CodeBlock } from './CodeBlock';
import { edaSnippets, correlationMatrix, orderDistribution, boxPlotData } from '../data/eda';

const tooltipStyle = {
  backgroundColor: '#141826',
  border: '1px solid #2c3349',
  borderRadius: '8px',
  color: '#e8ebf2',
  fontSize: '12px',
};

function corrColor(v: number): string {
  const t = (v + 1) / 2;
  const hue = 200 - t * 200;
  return `hsl(${hue}, 65%, 42%)`;
}

function CorrelationHeatmap() {
  const { labels, values } = correlationMatrix;
  const cells: ReactNode[] = [];
  labels.forEach((row, i) => {
    cells.push(
      <div key={`r${i}`} className="text-[10px] text-ink-400 font-medium self-center pr-2 text-right">{row}</div>
    );
    labels.forEach((_, j) => {
      const v = values[i][j];
      cells.push(
        <div
          key={`c${i}-${j}`}
          className="aspect-square rounded flex items-center justify-center text-[11px] font-mono font-semibold tabular transition-transform hover:scale-105"
          style={{ backgroundColor: corrColor(v), color: Math.abs(v) > 0.5 ? '#fff' : '#e8ebf2' }}
          title={`${labels[i]} vs ${labels[j]}: ${v.toFixed(2)}`}
        >
          {v.toFixed(2)}
        </div>
      );
    });
  });
  return (
    <div className="overflow-x-auto scrollbar-thin">
      <div className="inline-grid gap-1" style={{ gridTemplateColumns: `120px repeat(${labels.length}, 1fr)` }}>
        <div />
        {labels.map((l) => (
          <div key={l} className="text-[10px] text-ink-400 text-center font-medium pb-1 px-1">{l}</div>
        ))}
        {cells}
      </div>
      <div className="flex items-center gap-3 mt-3 text-[10px] text-ink-400">
        <span>−1.0</span>
        <div className="h-2 w-32 rounded-full" style={{ background: 'linear-gradient(90deg, hsl(200,65%,42%), hsl(150,65%,42%), hsl(100,65%,42%), hsl(50,65%,42%), hsl(0,65%,42%))' }} />
        <span>+1.0</span>
      </div>
    </div>
  );
}

function DistributionChart() {
  const mean = 178;
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={orderDistribution} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="distFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2dd4b7" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#2dd4b7" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#222840" vertical={false} />
        <XAxis dataKey="bin" tick={{ fill: '#8a92ad', fontSize: 11 }} axisLine={{ stroke: '#2c3349' }} tickLine={false} />
        <YAxis tick={{ fill: '#8a92ad', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: '#2dd4b7', strokeDasharray: '4 4' }} />
        <Area type="monotone" dataKey="count" name="Orders" stroke="#2dd4b7" strokeWidth={2} fill="url(#distFill)" />
        <ReferenceLine x="151-200" stroke="#fbbf24" strokeDasharray="5 4" label={{ value: `Mean $${mean}`, fill: '#fbbf24', fontSize: 11, position: 'top' }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Custom SVG box plot — clearer than faking it with stacked bars.
function BoxPlotChart() {
  const W = 460, H = 240, pad = { l: 36, r: 16, t: 12, b: 28 };
  const cats = boxPlotData.categories;
  const all = boxPlotData.stats.flatMap((s) => [s.min, ...s.outliers, s.max]);
  const yMax = Math.ceil(Math.max(...all) / 50) * 50;
  const yMin = 0;
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;
  const y = (v: number) => pad.t + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
  const slot = plotW / cats.length;
  const cx = (i: number) => pad.l + slot * i + slot / 2;
  const boxW = slot * 0.42;
  const colors = ['#2dd4b7', '#fbbf24', '#60a5fa'];
  const yTicks = [0, 100, 200, 300, 400, 500];

  return (
    <div className="overflow-x-auto scrollbar-thin">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ minWidth: 420 }}>
        {/* gridlines */}
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={pad.l} y1={y(t)} x2={W - pad.r} y2={y(t)} stroke="#222840" strokeDasharray="3 3" />
            <text x={pad.l - 6} y={y(t) + 3} fill="#8a92ad" fontSize="10" textAnchor="end">${t}</text>
          </g>
        ))}
        {/* boxes */}
        {boxPlotData.stats.map((s, i) => {
          const x = cx(i) - boxW / 2;
          const med = y(s.median);
          return (
            <g key={cats[i]}>
              {/* whisker */}
              <line x1={cx(i)} y1={y(s.min)} x2={cx(i)} y2={y(s.q1)} stroke={colors[i]} strokeWidth="1.5" />
              <line x1={cx(i)} y1={y(s.q3)} x2={cx(i)} y2={y(s.max)} stroke={colors[i]} strokeWidth="1.5" />
              <line x1={cx(i) - boxW / 4} y1={y(s.min)} x2={cx(i) + boxW / 4} y2={y(s.min)} stroke={colors[i]} strokeWidth="1.5" />
              <line x1={cx(i) - boxW / 4} y1={y(s.max)} x2={cx(i) + boxW / 4} y2={y(s.max)} stroke={colors[i]} strokeWidth="1.5" />
              {/* IQR box */}
              <rect x={x} y={y(s.q3)} width={boxW} height={Math.max(2, y(s.q1) - y(s.q3))} rx="3" fill={colors[i]} fillOpacity="0.18" stroke={colors[i]} strokeWidth="1.5" />
              {/* median */}
              <line x1={x} y1={med} x2={x + boxW} y2={med} stroke={colors[i]} strokeWidth="2.5" />
              {/* outliers */}
              {s.outliers.map((o, k) => (
                <circle key={k} cx={cx(i)} cy={y(o)} r="3.5" fill="#fb7185" stroke="#0c0e14" strokeWidth="1" />
              ))}
              {/* label */}
              <text x={cx(i)} y={H - 8} fill="#8a92ad" fontSize="11" textAnchor="middle">{cats[i]}</text>
            </g>
          );
        })}
      </svg>
      <div className="flex items-center gap-4 mt-2 text-[10px] text-ink-400 px-2">
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: colors[0] + '30', border: `1px solid ${colors[0]}` }} />IQR box</span>
        <span className="flex items-center gap-1"><span className="inline-block h-0.5 w-3" style={{ background: '#2dd4b7' }} />Median</span>
        <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" />Outlier (&gt; 1.5×IQR)</span>
      </div>
    </div>
  );
}

const charts: Record<string, { icon: typeof LineIcon; render: () => ReactNode }> = {
  corr: { icon: GitCompareArrows, render: () => <CorrelationHeatmap /> },
  dist: { icon: LineIcon,         render: () => <DistributionChart /> },
  box:  { icon: BoxIcon,          render: () => <BoxPlotChart /> },
};

export function EdaSection() {
  const [active, setActive] = useState(edaSnippets[0].id);
  const snip = edaSnippets.find((s) => s.id === active)!;

  return (
    <div className="space-y-10 animate-fade-in">
      <SectionHeading
        kicker="Exploratory Data Analysis"
        title="A simulated Jupyter notebook, rendered live"
        desc="Each tab shows the Python code that produces an EDA chart, then renders the interactive result — correlation matrix, order-value distribution, and category box plots for outlier detection."
      />

      <div className="flex flex-wrap gap-2">
        {edaSnippets.map((s) => {
          const Icon = charts[s.id].icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm transition-colors ${active === s.id ? 'border-brand-500/50 bg-brand-500/10 text-brand-300' : 'border-ink-700 text-ink-300 hover:text-ink-100 hover:border-ink-600'}`}
            >
              <Icon size={15} />
              {s.title}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <Code2 size={16} className="text-brand-300" />
            <h3 className="text-sm font-semibold text-ink-100">{snip.title}</h3>
          </div>
          <p className="text-xs text-ink-400 mb-3">{snip.desc}</p>
          <CodeBlock code={snip.code} lang="python" filename={`${snip.id}_analysis.py`} />
        </Card>

        <ChartFrame
          title={snip.title}
          subtitle={snip.desc}
          right={<Pill tone="brand">Interactive</Pill>}
        >
          {charts[active].render()}
        </ChartFrame>
      </div>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-ink-100 mb-4">Key Findings</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { k: 'Strongest correlation', v: 'Sales ↔ Profit (r = 0.78)', d: 'Revenue is a reliable profit driver; discount weakens it (−0.28).' },
            { k: 'Distribution shape', v: 'Right-skewed, mean $178', d: 'Most orders cluster $100–200 with a long high-value tail.' },
            { k: 'Outliers', v: '7 across categories', d: 'Two Electronics orders exceed 1.5×IQR — bulk corporate buys.' },
          ].map((f) => (
            <div key={f.k} className="rounded-lg border border-ink-700 bg-ink-900/50 p-4">
              <p className="text-[11px] uppercase tracking-wider text-ink-400">{f.k}</p>
              <p className="mt-1.5 text-sm font-semibold text-brand-300">{f.v}</p>
              <p className="mt-2 text-xs text-ink-300 leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
