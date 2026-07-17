import { useState, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';

type Lang = 'python' | 'sql' | 'excel';

const PALETTE = {
  keyword: 'text-brand-300',
  string:  'text-gold-400',
  number:  'text-accent-400',
  comment: 'text-ink-400 italic',
  func:    'text-accent-300',
  punct:   'text-ink-300',
  ident:   'text-ink-100',
};

const PY_KEYWORDS = new Set([
  'import','as','from','def','return','for','in','if','else','elif','with',
  'try','except','finally','lambda','None','True','False','np','pd','sns',
  'plt','df','groupby','agg','transform','fillna','round','abs','drop_duplicates',
  'to_datetime','astype','str','zfill','add','apply','replace','read_csv',
  'to_csv','print','len','figure','title','xlabel','ylabel','legend','tight_layout',
  'show','heatmap','annot','cmap','histplot','kde','boxplot','subplots',
]);

const SQL_KEYWORDS = new Set([
  'SELECT','FROM','WHERE','JOIN','ON','GROUP','BY','ORDER','LIMIT','AS','AND',
  'OR','NOT','IN','CASE','WHEN','THEN','ELSE','END','WITH','UNION','HAVING',
  'INNER','LEFT','RIGHT','OUTER','FULL','OVER','PARTITION','ROW','ROWS',
  'BETWEEN','LIKE','IS','NULL','DISTINCT','ROUND','SUM','COUNT','AVG','MIN',
  'MAX','LAG','LEAD','DATEDIFF','CURRENT_DATE','DATE','DESC','ASC','TINYINT',
]);

function classify(word: string, lang: Lang): keyof typeof PALETTE {
  if (lang === 'python') {
    if (PY_KEYWORDS.has(word)) return 'keyword';
    if (/^\d+\.?\d*$/.test(word)) return 'number';
    return 'ident';
  }
  if (lang === 'sql') {
    const up = word.toUpperCase();
    if (SQL_KEYWORDS.has(up)) return 'keyword';
    if (/^\d+\.?\d*$/.test(word)) return 'number';
    if (word.startsWith('"') || word.startsWith("'")) return 'string';
    return 'ident';
  }
  return 'ident';
}

function tokenizeLine(line: string, lang: Lang): ReactNode[] {
  const out: ReactNode[] = [];
  // comment handling
  if (lang === 'python' && line.trim().startsWith('#')) {
    return [<span key="c" className={PALETTE.comment}>{line}</span>];
  }
  if (lang === 'sql' && line.trim().startsWith('--')) {
    return [<span key="c" className={PALETTE.comment}>{line}</span>];
  }
  // split strings and the rest
  const parts = line.split(/("[^"]*"|'[^']*')/g).filter(Boolean);
  let k = 0;
  for (const part of parts) {
    if (/^("[^"]*"|'[^']*')$/.test(part)) {
      out.push(<span key={k++} className={PALETTE.string}>{part}</span>);
      continue;
    }
    // tokenize words / numbers / punctuation
    const sub = part.split(/(\b\w+\b|\s+|[(),;.:=*+\-/<>])/g).filter(Boolean);
    for (const tok of sub) {
      if (/^\s+$/.test(tok)) {
        out.push(tok);
        continue;
      }
      if (/^[(),;.:=*+\-\/<>]+$/.test(tok)) {
        out.push(<span key={k++} className={PALETTE.punct}>{tok}</span>);
        continue;
      }
      const cls = classify(tok, lang);
      out.push(<span key={k++} className={PALETTE[cls]}>{tok}</span>);
    }
  }
  return out;
}

export function CodeBlock({
  code,
  lang = 'python',
  filename,
  className = '',
}: {
  code: string;
  lang?: Lang;
  filename?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const lines = code.split('\n');

  const copy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className={`rounded-xl border border-ink-700 bg-ink-900/80 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-ink-700 bg-ink-850">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500/70" />
          {filename && (
            <span className="ml-3 text-xs font-mono text-ink-300">{filename}</span>
          )}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-ink-300 hover:text-brand-300 transition-colors"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <pre className="text-[13px] leading-relaxed font-mono py-3">
          {lines.map((line, i) => (
            <div key={i} className="flex px-4 hover:bg-ink-850/60">
              <span className="select-none text-ink-500 w-7 shrink-0 text-right pr-3">
                {i + 1}
              </span>
              <code className="whitespace-pre text-ink-100 tabular">
                {line === '' ? ' ' : tokenizeLine(line, lang)}
              </code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
