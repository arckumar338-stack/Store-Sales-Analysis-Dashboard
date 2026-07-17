import { useMemo, useState } from 'react';
import {
  Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';
import {
  DollarSign, ShoppingCart, Receipt, Percent, SlidersHorizontal, Map as MapIcon,
  Package, TrendingUp, Filter,
} from 'lucide-react';
import { SectionHeading, Card, KpiCard, ChartFrame, Pill } from './ui';
import {
  fullTrend, categories, regions, topProducts, monthlyByRegion, regionCategoryMatrix,
} from '../data/dashboard';

const REGIONS = ['All', 'North', 'South', 'East', 'West'] as const;
const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Home'] as const;
const PERIODS = ['YTD 2023', 'Q4 2023', 'Last 6 mo', 'Last 30d'] as const;

const tooltipStyle = {
  backgroundColor: '#141826',
  border: '1px solid #2c3349',
  borderRadius: '8px',
  color: '#e8ebf2',
  fontSize: '12px',
};

const CAT_COLORS: Record<string, string> = {
  Electronics: '#2dd4b7',
  Apparel: '#fbbf24',
  Home: '#60a5fa',
};
const fmtCur = (n: number) => '$' + n.toLocaleString('en-US');
const fmtK = (n: number) => '$' + (n / 1000).toFixed(1) + 'K';

function FilterBar({ region, setRegion, category, setCategory, period, setPeriod }: {
  region: string; setRegion: (v: string) => void;
  category: string; setCategory: (v: string) => void;
  period: string; setPeriod: (v: string) => void;
}) {
  return (
    <Card className="p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex items-center gap-2 text-ink-300 shrink-0">
          <SlidersHorizontal size={16} className="text-brand-300" />
          <span className="text-sm font-semibold">Filters</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          <FilterGroup label="Region" value={region} options={[...REGIONS]} onChange={setRegion} />
          <FilterGroup label="Category" value={category} options={[...CATEGORIES]} onChange={setCategory} />
          <FilterGroup label="Time Period" value={period} options={[...PERIODS]} onChange={setPeriod} />
        </div>
      </div>
    </Card>
  );
}

function FilterGroup({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-ink-400 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${value === o ? 'bg-brand-500 text-ink-950' : 'bg-ink-800 text-ink-300 hover:bg-ink-700'}`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Dashboard() {
  const [region, setRegion] = useState('All');
  const [category, setCategory] = useState('All');
  const [period, setPeriod] = useState('YTD 2023');

  // Derive KPIs from the selected filters
  const kpis = useMemo(() => {
    const matrixKey = `${region}-${category}`;
    const base = regionCategoryMatrix[matrixKey] ?? regionCategoryMatrix['All-All'];
    // scale by category selection if region is All
    let factor = 1;
    if (region === 'All' && category !== 'All') {
      factor = base.sales / regionCategoryMatrix['All-All'].sales;
    }
    const revenue = Math.round(base.sales * factor);
    const orders = Math.round(base.orders * factor);
    const profit = Math.round(base.profit * factor);
    const aov = orders ? revenue / orders : 0;
    const margin = revenue ? (profit / revenue) * 100 : 0;
    return { revenue, orders, profit, aov, margin };
  }, [region, category]);

  const trend = useMemo(() => {
    const t = monthlyByRegion[region] ?? fullTrend;
    const slice: Record<string, number> = { 'YTD 2023': 12, 'Q4 2023': 3, 'Last 6 mo': 6, 'Last 30d': 12 };
    const n = slice[period] ?? 12;
    let arr = t.slice(-n);
    if (category !== 'All') {
      const catShare = categories.find((c) => c.name === category)!.value / categories.reduce((a, c) => a + c.value, 0);
      arr = arr.map((p) => ({ ...p, sales: Math.round(p.sales * catShare), profit: Math.round(p.profit * catShare), orders: Math.round(p.orders * catShare) }));
    }
    return arr;
  }, [region, period, category]);

  const catData = useMemo(() => {
    if (category !== 'All') return categories.filter((c) => c.name === category);
    if (region !== 'All') {
      const share = regions.find((r) => r.region === region)!.sales / regionCategoryMatrix['All-All'].sales;
      return categories.map((c) => ({ ...c, value: Math.round(c.value * share), profit: Math.round(c.profit * share) }));
    }
    return categories;
  }, [region, category]);

  const regionData = useMemo(() => {
    if (region !== 'All') return regions.filter((r) => r.region === region);
    return regions;
  }, [region]);

  const products = useMemo(() => {
    let p = topProducts;
    if (category !== 'All') p = p.filter((x) => x.category === category);
    if (region !== 'All') {
      const share = regions.find((r) => r.region === region)!.sales / regionCategoryMatrix['All-All'].sales;
      p = p.map((x) => ({ ...x, revenue: Math.round(x.revenue * share), target: x.target }));
    }
    return p.slice(0, 6);
  }, [region, category]);

  return (
    <div className="space-y-6 animate-fade-in">
      <SectionHeading
        kicker="Interactive Dashboard"
        title="Executive analytics surface, Power BI style"
        desc="Filter the whole view by region, category and time period. KPIs, trends and breakdowns recompute live from the underlying fact table."
      />

      <FilterBar region={region} setRegion={setRegion} category={category} setCategory={setCategory} period={period} setPeriod={setPeriod} />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Revenue" value={fmtCur(kpis.revenue)} delta={13.6} deltaLabel="vs prev period" icon={<DollarSign size={18} />} accent="brand" />
        <KpiCard label="Total Orders" value={kpis.orders.toLocaleString()} delta={9.4} deltaLabel="vs prev period" icon={<ShoppingCart size={18} />} accent="accent" />
        <KpiCard label="Avg Order Value" value={fmtCur(kpis.aov)} delta={3.8} deltaLabel="vs prev period" icon={<Receipt size={18} />} accent="gold" />
        <KpiCard label="Net Profit Margin" value={kpis.margin.toFixed(1) + '%'} delta={1.2} deltaLabel="vs prev period" icon={<Percent size={18} />} accent="rose" />
      </div>

      {/* Trends + donut */}
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartFrame
          className="lg:col-span-2"
          title="Sales & Profit Trend"
          subtitle={period}
          right={<Pill tone="brand"><TrendingUp size={11} /> Net</Pill>}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={trend} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4b7" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#2dd4b7" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#222840" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#8a92ad', fontSize: 11 }} axisLine={{ stroke: '#2c3349' }} tickLine={false} />
              <YAxis tickFormatter={fmtK} tick={{ fill: '#8a92ad', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtCur(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8a92ad' }} />
              <Area type="monotone" dataKey="sales" name="Sales" stroke="#2dd4b7" strokeWidth={2.5} fill="url(#salesFill)" />
              <Area type="monotone" dataKey="profit" name="Profit" stroke="#60a5fa" strokeWidth={2} fill="url(#profitFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartFrame>

        <ChartFrame title="Category Mix" subtitle="Revenue share" right={<Pill>Donut</Pill>}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={catData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                stroke="#0c0e14"
                strokeWidth={2}
              >
                {catData.map((c) => (
                  <Cell key={c.name} fill={CAT_COLORS[c.name]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => fmtCur(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8a92ad' }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartFrame>
      </div>

      {/* Regional + top products */}
      <div className="grid lg:grid-cols-3 gap-4">
        <ChartFrame
          className="lg:col-span-2"
          title="Regional Sales Distribution"
          subtitle="Revenue & profit by region"
          right={<Pill tone="accent"><MapIcon size={11} /> Map</Pill>}
        >
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={regionData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222840" vertical={false} />
              <XAxis dataKey="region" tick={{ fill: '#8a92ad', fontSize: 11 }} axisLine={{ stroke: '#2c3349' }} tickLine={false} />
              <YAxis tickFormatter={fmtK} tick={{ fill: '#8a92ad', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(45,212,183,0.05)' }} formatter={(v) => fmtCur(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 12, color: '#8a92ad' }} />
              <Bar dataKey="sales" name="Sales" radius={[4, 4, 0, 0]} fill="#2dd4b7" />
              <Bar dataKey="profit" name="Profit" radius={[4, 4, 0, 0]} fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </ChartFrame>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package size={16} className="text-brand-300" />
              <h4 className="text-sm font-semibold text-ink-100">Top Products</h4>
            </div>
            <Pill tone="brand">{products.length}</Pill>
          </div>
          <div className="space-y-3.5">
            {products.map((p) => {
              const pct = Math.min(100, Math.round((p.revenue / p.target) * 100));
              return (
                <div key={p.name}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-ink-200 truncate pr-2">{p.name}</span>
                    <span className="font-mono tabular text-ink-100 shrink-0">{fmtCur(p.revenue)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-ink-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: CAT_COLORS[p.category] }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-ink-400 mt-1">
                    <span>{p.category}</span>
                    <span>{pct}% of target</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Active filter footer */}
      <div className="flex items-center gap-2 text-xs text-ink-400">
        <Filter size={12} />
        Active:
        <Pill tone="brand">{region}</Pill>
        <Pill tone="gold">{category}</Pill>
        <Pill tone="accent">{period}</Pill>
      </div>
    </div>
  );
}
