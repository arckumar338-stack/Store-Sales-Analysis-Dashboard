import { useState } from 'react';
import { Database, Key, Link2, Play, Search, Table2, ChevronRight } from 'lucide-react';
import { SectionHeading, Card, Pill } from './ui';
import { CodeBlock } from './CodeBlock';
import { schemaTables, sqlQueries } from '../data/database';

function SchemaView() {
  const fact = schemaTables.find((t) => t.kind === 'fact')!;
  const dims = schemaTables.filter((t) => t.kind === 'dimension');

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Fact table - spans full height */}
      <Card className="lg:row-span-2 p-5 border-accent-500/30 bg-accent-500/[0.03]">
        <div className="flex items-center gap-2 mb-1">
          <Table2 size={16} className="text-accent-300" />
          <h4 className="text-sm font-semibold text-ink-100 font-mono">{fact.name}</h4>
          <Pill tone="accent">FACT</Pill>
        </div>
        <p className="text-xs text-ink-400 mb-3">{fact.desc}</p>
        <div className="space-y-1">
          {fact.columns.map((c) => (
            <div key={c.name} className="flex items-center justify-between text-xs font-mono px-2 py-1.5 rounded hover:bg-accent-500/5">
              <span className="flex items-center gap-1.5">
                {c.key === 'PK' && <Key size={11} className="text-gold-400" />}
                {c.key === 'FK' && <Link2 size={11} className="text-brand-300" />}
                <span className={c.key === 'PK' ? 'text-gold-400' : c.key === 'FK' ? 'text-brand-300' : 'text-ink-200'}>{c.name}</span>
              </span>
              <span className="text-ink-400 text-[10px]">{c.type}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-ink-500 mt-3 font-mono">{fact.rows.toLocaleString()} rows</p>
      </Card>

      {/* Dimension tables */}
      {dims.map((t) => (
        <Card key={t.name} className="p-4 border-brand-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Database size={15} className="text-brand-300" />
            <h4 className="text-sm font-semibold text-ink-100 font-mono">{t.name}</h4>
            <Pill tone="brand">DIM</Pill>
          </div>
          <p className="text-[11px] text-ink-400 mb-2">{t.desc}</p>
          <div className="space-y-0.5">
            {t.columns.slice(0, 6).map((c) => (
              <div key={c.name} className="flex items-center justify-between text-[11px] font-mono px-2 py-1 rounded hover:bg-brand-500/5">
                <span className="flex items-center gap-1">
                  {c.key === 'PK' && <Key size={10} className="text-gold-400" />}
                  <span className={c.key === 'PK' ? 'text-gold-400' : 'text-ink-200'}>{c.name}</span>
                </span>
                <span className="text-ink-400 text-[10px]">{c.type}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-ink-500 mt-2 font-mono">{t.rows.toLocaleString()} rows</p>
        </Card>
      ))}
    </div>
  );
}

function QueryRunner() {
  const [active, setActive] = useState(sqlQueries[0].id);
  const [executed, setExecuted] = useState(sqlQueries[0].id);
  const [running, setRunning] = useState(false);

  const q = sqlQueries.find((x) => x.id === active)!;
  const result = sqlQueries.find((x) => x.id === executed)!;

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      setExecuted(active);
      setRunning(false);
    }, 600);
  };

  return (
    <div className="space-y-4">
      {/* Question picker */}
      <div className="grid sm:grid-cols-2 gap-3">
        {sqlQueries.map((qq) => (
          <button
            key={qq.id}
            onClick={() => setActive(qq.id)}
            className={`text-left rounded-xl border p-4 transition-all ${active === qq.id ? 'border-brand-500/50 bg-brand-500/[0.07] shadow-glow' : 'border-ink-700 bg-ink-850/50 hover:border-ink-600'}`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-ink-100">{qq.title}</span>
              <Pill tone={qq.difficulty === 'Basic' ? 'brand' : qq.difficulty === 'Intermediate' ? 'gold' : 'rose'}>{qq.difficulty}</Pill>
            </div>
            <p className="text-xs text-ink-300 leading-relaxed">{qq.question}</p>
            <div className="flex items-center gap-1 mt-2 text-[11px] text-brand-300">
              {active === qq.id ? <Play size={11} /> : <ChevronRight size={11} />}
              {active === qq.id ? 'Selected' : 'Select query'}
            </div>
          </button>
        ))}
      </div>

      {/* Editor + run */}
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-ink-700 bg-ink-850">
          <div className="flex items-center gap-2">
            <Search size={14} className="text-ink-400" />
            <span className="text-xs font-mono text-ink-300">query_editor.sql</span>
          </div>
          <button
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-1.5 rounded-md bg-brand-500 hover:bg-brand-400 disabled:opacity-50 px-3 py-1 text-xs font-semibold text-ink-950 transition-colors"
          >
            {running ? <span className="h-3 w-3 border-2 border-ink-950/40 border-t-ink-950 rounded-full animate-spin" /> : <Play size={12} />}
            {running ? 'Executing…' : 'Run query'}
          </button>
        </div>
        <CodeBlock code={q.sql} lang="sql" filename="" className="rounded-none border-0" />
      </Card>

      {/* Results */}
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-ink-700 bg-ink-850">
          <div className="flex items-center gap-2">
            <Table2 size={14} className="text-brand-300" />
            <span className="text-xs font-semibold text-ink-100">Result Set</span>
            <Pill tone="brand">{result.rows.length} rows</Pill>
          </div>
          <span className="text-[11px] text-ink-400 font-mono">{(Math.random() * 80 + 30).toFixed(0)} ms</span>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-ink-800/80 text-ink-300">
                {result.columns.map((c) => (
                  <th key={c} className="text-left font-semibold px-3 py-2 whitespace-nowrap">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, i) => (
                <tr key={i} className="border-t border-ink-800 hover:bg-brand-500/5">
                  {row.map((cell, j) => (
                    <td key={j} className={`px-3 py-2 whitespace-nowrap tabular ${j === 0 ? 'text-ink-100 font-medium' : typeof cell === 'number' ? 'font-mono text-brand-300' : 'font-mono text-ink-200'}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function DatabaseSection() {
  return (
    <div className="space-y-10 animate-fade-in">
      <SectionHeading
        kicker="Database & SQL Query Engine"
        title="A star schema warehouse with an in-browser query runner"
        desc="The cleaned dataset loads into a MySQL star schema with one fact table and four dimensions. Pick an analytical question, inspect the exact SQL, and run it to see a live result set."
      />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ink-100">Schema Diagram (DDL)</h3>
          <Pill tone="accent">MySQL 8.0 · InnoDB</Pill>
        </div>
        <SchemaView />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-100 mb-4">Interactive Query Runner</h3>
        <QueryRunner />
      </div>
    </div>
  );
}
