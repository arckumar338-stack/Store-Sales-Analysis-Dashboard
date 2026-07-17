import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Play, RotateCcw, Sparkles, FileSpreadsheet, Code2 } from 'lucide-react';
import { SectionHeading, Card, Pill } from './ui';
import { CodeBlock } from './CodeBlock';
import { rawSales, cleanedSales, cleaningSteps, pandasScript, excelFormulas } from '../data/cleaning';

function rawCellClass(value: string, header: string): string {
  if (value === '' || value === null) return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
  if (header === 'salesAmount' && value.startsWith('-')) return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
  if (header === 'orderDate' && !/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'bg-gold-500/15 text-gold-400 border border-gold-500/30';
  return 'text-ink-200';
}

function RawTable() {
  const cols: { key: keyof typeof rawSales[0]; label: string }[] = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'orderDate', label: 'Order Date' },
    { key: 'customerName', label: 'Customer' },
    { key: 'customerAge', label: 'Age' },
    { key: 'category', label: 'Category' },
    { key: 'productName', label: 'Product' },
    { key: 'quantity', label: 'Qty' },
    { key: 'unitPrice', label: 'Price' },
    { key: 'salesAmount', label: 'Sales' },
    { key: 'discount', label: 'Disc%' },
  ];
  return (
    <div className="overflow-x-auto scrollbar-thin rounded-lg border border-ink-700">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="bg-ink-800/80 text-ink-300">
            {cols.map((c) => (
              <th key={c.key} className="text-left font-semibold px-2.5 py-2 whitespace-nowrap">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rawSales.map((r, i) => {
            const isDup = i === 5; // ORD-1006 duplicate of ORD-1001
            return (
              <tr key={r.id} className={`border-t border-ink-800 ${isDup ? 'bg-rose-500/5' : ''}`}>
                {cols.map((c) => (
                  <td key={c.key} className={`px-2.5 py-1.5 whitespace-nowrap font-mono tabular rounded ${rawCellClass(r[c.key], c.key)}`}>
                    {r[c.key] === '' ? '—' : r[c.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function CleanTable() {
  const fmt = (n: number, d = 2) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  return (
    <div className="overflow-x-auto scrollbar-thin rounded-lg border border-brand-500/30">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="bg-brand-500/10 text-brand-200">
            {['Order ID','Date','Cust ID','Customer','Age','Category','Product','Qty','Price','Sales','Disc%','Profit'].map((h) => (
              <th key={h} className="text-left font-semibold px-2.5 py-2 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cleanedSales.map((r) => (
            <tr key={r.orderId} className="border-t border-ink-800 hover:bg-brand-500/5">
              <td className="px-2.5 py-1.5 font-mono text-ink-200">{r.orderId}</td>
              <td className="px-2.5 py-1.5 font-mono text-brand-300">{r.orderDate}</td>
              <td className="px-2.5 py-1.5 font-mono text-accent-300">{r.customerId}</td>
              <td className="px-2.5 py-1.5 text-ink-100">{r.customerName}</td>
              <td className="px-2.5 py-1.5 font-mono tabular text-ink-200">{r.customerAge}</td>
              <td className="px-2.5 py-1.5 text-ink-200">{r.category}</td>
              <td className="px-2.5 py-1.5 text-ink-100">{r.productName}</td>
              <td className="px-2.5 py-1.5 font-mono tabular text-ink-200">{r.quantity}</td>
              <td className="px-2.5 py-1.5 font-mono tabular text-ink-200">{fmt(r.unitPrice)}</td>
              <td className="px-2.5 py-1.5 font-mono tabular text-brand-300 font-semibold">{fmt(r.salesAmount)}</td>
              <td className="px-2.5 py-1.5 font-mono tabular text-ink-300">{r.discountPct}</td>
              <td className="px-2.5 py-1.5 font-mono tabular text-ink-200">{fmt(r.profit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CleaningLab() {
  const [cleaned, setCleaned] = useState(false);
  const [running, setRunning] = useState(false);
  const [tab, setTab] = useState<'python' | 'excel'>('python');

  const apply = () => {
    setRunning(true);
    setCleaned(false);
    setTimeout(() => {
      setRunning(false);
      setCleaned(true);
    }, 900);
  };
  const reset = () => { setCleaned(false); setRunning(false); };

  const issueCount = cleaningSteps.reduce((a, s) => a + s.count, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <SectionHeading
        kicker="Data Cleaning Lab"
        title="Fix the messy POS export, one rule at a time"
        desc="Raw data ships with missing ages, mixed date formats, a duplicate row and negative sales amounts. Run the cleaning script to watch every issue resolve in place."
      />

      {/* Issue chips + controls */}
      <Card className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {cleaningSteps.map((s) => (
              <Pill key={s.id} tone={s.severity === 'high' ? 'rose' : s.severity === 'medium' ? 'gold' : 'accent'}>
                <AlertTriangle size={11} /> {s.label} · {s.count}
              </Pill>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-400">{issueCount} issues detected</span>
            <button
              onClick={apply}
              disabled={running || cleaned}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 hover:bg-brand-400 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold text-ink-950 transition-colors"
            >
              {running ? <Sparkles size={15} className="animate-spin" /> : <Play size={15} />}
              {running ? 'Running…' : 'Apply Cleaning Script'}
            </button>
            <button
              onClick={reset}
              disabled={!cleaned && !running}
              className="inline-flex items-center gap-2 rounded-lg border border-ink-600 hover:border-ink-500 disabled:opacity-40 px-3 py-2 text-sm text-ink-200 transition-colors"
            >
              <RotateCcw size={15} /> Reset
            </button>
          </div>
        </div>
      </Card>

      {/* Split view */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileSpreadsheet size={16} className="text-rose-400" />
              <h3 className="text-sm font-semibold text-ink-100">Raw Data</h3>
            </div>
            <Pill tone="rose">{rawSales.length} rows</Pill>
          </div>
          <RawTable />
          <p className="text-[11px] text-ink-400 mt-3">
            Highlighted cells: missing values, malformed dates, negative sales, duplicate row.
          </p>
        </Card>

        <Card className={`p-5 transition-all duration-500 ${cleaned ? 'border-brand-500/40 shadow-glow' : 'opacity-60'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className={cleaned ? 'text-brand-400' : 'text-ink-500'} />
              <h3 className="text-sm font-semibold text-ink-100">Cleaned Data</h3>
            </div>
            {cleaned ? <Pill tone="brand">{cleanedSales.length} rows</Pill> : <Pill>Awaiting script</Pill>}
          </div>
          {cleaned ? (
            <CleanTable />
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center rounded-lg border border-dashed border-ink-700 text-center">
              {running ? (
                <>
                  <Sparkles size={28} className="text-brand-400 animate-pulse" />
                  <p className="mt-3 text-sm text-ink-300">Parsing dates, imputing ages, deduplicating…</p>
                </>
              ) : (
                <>
                  <Code2 size={28} className="text-ink-500" />
                  <p className="mt-3 text-sm text-ink-400">Click <span className="text-brand-300">Apply Cleaning Script</span> to transform.</p>
                </>
              )}
            </div>
          )}
        </Card>
      </div>

      {/* Code tabs */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setTab('python')}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${tab === 'python' ? 'border-brand-500/40 bg-brand-500/10 text-brand-300' : 'border-ink-700 text-ink-300 hover:text-ink-100'}`}
          >
            Python · pandas
          </button>
          <button
            onClick={() => setTab('excel')}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${tab === 'excel' ? 'border-brand-500/40 bg-brand-500/10 text-brand-300' : 'border-ink-700 text-ink-300 hover:text-ink-100'}`}
          >
            Excel formulas
          </button>
        </div>

        {tab === 'python' ? (
          <CodeBlock code={pandasScript} lang="python" filename="clean_store_sales.py" />
        ) : (
          <div className="rounded-xl border border-ink-700 bg-ink-900/80 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-ink-700 bg-ink-850">
              <span className="text-xs font-mono text-ink-300">store_sales_cleanup.xlsx</span>
              <span className="text-[11px] text-ink-400">Worksheet: RawData</span>
            </div>
            <div className="overflow-x-auto scrollbar-thin">
              <table className="min-w-full text-xs">
                <thead>
                  <tr className="bg-ink-800/80 text-ink-300">
                    {['Cell','Description','Formula'].map((h) => (
                      <th key={h} className="text-left font-semibold px-3 py-2">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelFormulas.map((f) => (
                    <tr key={f.cell} className="border-t border-ink-800">
                      <td className="px-3 py-2 font-mono text-gold-400 whitespace-nowrap">{f.cell}</td>
                      <td className="px-3 py-2 text-ink-200">{f.desc}</td>
                      <td className="px-3 py-2 font-mono text-brand-300 break-all">{f.formula}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
