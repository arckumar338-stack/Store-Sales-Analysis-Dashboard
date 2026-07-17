import { Database, FileSpreadsheet, FlaskConical, LineChart, Table2, ArrowRight } from 'lucide-react';
import { SectionHeading, Card, Pill } from './ui';

const stages = [
  { n: '01', icon: FileSpreadsheet, title: 'Raw CSV', sub: 'Point-of-sale export', desc: '18,432 line items extracted from the store POS system with mixed date formats, blanks, duplicates and sign errors.', tags: ['CSV', '1.8M rows', '12 columns'], accent: 'text-ink-300' },
  { n: '02', icon: Table2, title: 'Python / Excel Cleaning', sub: 'Pandas + formulas', desc: 'Standardize dates, impute age by category median, drop duplicates, flip negatives, recompute net sales.', tags: ['pandas', 'numpy', 'Excel IFERROR'], accent: 'text-brand-300' },
  { n: '03', icon: Database, title: 'MySQL Warehouse', sub: 'Star schema', desc: 'Load into a dimensional model: Fact_Sales plus Dim_Customers, Dim_Products, Dim_Stores and Dim_Date.', tags: ['Star schema', 'InnoDB', 'Surrogate keys'], accent: 'text-accent-300' },
  { n: '04', icon: FlaskConical, title: 'Python EDA', sub: 'Jupyter notebook', desc: 'Correlation matrices, distribution plots and IQR outlier detection to validate assumptions before BI.', tags: ['Matplotlib', 'Seaborn', 'IQR'], accent: 'text-gold-400' },
  { n: '05', icon: LineChart, title: 'Interactive Dashboard', sub: 'Power BI style', desc: 'KPI cards, trend areas, category donut, regional bars and a top-products leaderboard with live filters.', tags: ['KPIs', 'Filters', 'Drill-down'], accent: 'text-rose-400' },
];

export function Overview() {
  return (
    <div className="space-y-12 animate-fade-in">
      <SectionHeading
        kicker="Overview & Architecture"
        title="From raw POS export to an executive-grade analytics surface"
        desc="This portfolio walks the complete data analytics lifecycle on a realistic retail store dataset — every stage is interactive, from running the cleaning script to executing analytical SQL and driving the dashboard filters."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Rows processed', value: '18,432' },
          { label: 'Cleanliness', value: '100%' },
          { label: 'Fact table size', value: '184K' },
          { label: 'KPIs surfaced', value: '12' },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-xs text-ink-400">{s.label}</p>
            <p className="mt-1 text-xl font-bold text-ink-100 tabular">{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Pipeline */}
      <Card className="p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-semibold text-ink-100">Data Movement Pipeline</h3>
            <p className="text-xs text-ink-400 mt-0.5">Five stages, left to right — hover any node for detail.</p>
          </div>
          <Pill tone="brand">ETL → EDA → BI</Pill>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {stages.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-xl border border-ink-700 bg-ink-900/60 p-5 h-full hover:border-brand-500/40 hover:bg-ink-850 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-ink-500">{s.n}</span>
                  <s.icon size={20} className={s.accent} />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-ink-100">{s.title}</h4>
                <p className="text-[11px] text-ink-400 mt-0.5">{s.sub}</p>
                <p className="text-xs text-ink-300 mt-3 leading-relaxed">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {s.tags.map((t) => (
                    <span key={t} className="text-[10px] rounded bg-ink-800 text-ink-300 px-1.5 py-0.5 font-mono">{t}</span>
                  ))}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <div className="rounded-full bg-ink-800 border border-ink-600 p-1 group-hover:border-brand-500/50">
                    <ArrowRight size={14} className="text-ink-400" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Flowing connector line */}
        <div className="hidden md:block mt-6 relative h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-400/60 to-transparent animate-pulse-soft" />
        </div>
      </Card>

      {/* Stack */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { t: 'Cleaning', d: 'Python 3.11 · pandas 2.x · NumPy', items: ['pd.to_datetime mixed-format parser', 'groupby + transform median impute', 'ABS() sign correction, dedup on order+product'] },
          { t: 'Storage', d: 'MySQL 8.0 · InnoDB · Star schema', items: ['Fact_Sales grain: one row per line item', 'SCD Type 2 on Dim_Customers', 'Bitmap index on is_returned flag'] },
          { t: 'Analysis', d: 'Jupyter · Seaborn · Recharts', items: ['Correlation heatmap of 5 numeric fields', 'KDE distribution of order values', 'IQR box-plot outlier fences per category'] },
        ].map((c) => (
          <Card key={c.t} className="p-5">
            <h4 className="text-sm font-semibold text-ink-100">{c.t}</h4>
            <p className="text-xs text-ink-400 mt-0.5">{c.d}</p>
            <ul className="mt-3 space-y-2">
              {c.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-xs text-ink-300">
                  <span className="mt-1 h-1 w-1 rounded-full bg-brand-400 shrink-0" />
                  {it}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
