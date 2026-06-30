interface CodeBlockProps {
  code: string
  language?: string
  caption?: string
}

/**
 * Minimal syntax-styled code block. Rather than pulling in a full syntax
 * highlighter (new dependency), this applies basic token coloring via a
 * lightweight regex pass — sufficient for a single illustrative snippet
 * and consistent with the "no new dependencies unless necessary" rule.
 */
export function CodeBlock({ code, language = 'python', caption }: CodeBlockProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-border-subtle bg-base">
      {/* Header bar */}
      <div className="flex items-center justify-between h-9 px-4 bg-base-card border-b border-border-subtle">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-critical-text/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-high-text/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/60" />
        </div>
        <span className="text-[11px] font-mono text-ink-tertiary uppercase tracking-wider">
          {language}
        </span>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-[12px] sm:text-[13px] leading-[1.7] font-mono">
        <code className="text-ink-secondary whitespace-pre">{highlight(code)}</code>
      </pre>

      {/* Caption */}
      {caption && (
        <p className="px-4 pb-4 text-xs text-ink-tertiary leading-relaxed border-t border-border-subtle pt-3 mt-0 bg-base-card">
          {caption}
        </p>
      )}
    </div>
  )
}

/**
 * Tokenises a Python snippet line-by-line for basic color highlighting.
 * Not a full parser — just enough visual distinction (keywords, strings,
 * comments) to read as "real code" rather than plain monospace text.
 */
function highlight(code: string) {
  const keywords = new Set([
    'import', 'from', 'def', 'class', 'return', 'if', 'else', 'elif',
    'for', 'while', 'with', 'as', 'pass', 'True', 'False', 'None',
  ])

  return code.split('\n').map((line, i) => {
    // Comment line
    if (line.trim().startsWith('#')) {
      return (
        <span key={i} className="block text-ink-tertiary italic">
          {line || '\u00A0'}
        </span>
      )
    }

    const tokens = line.split(/(\s+|\(|\)|\.|,|:)/)

    return (
      <span key={i} className="block">
        {tokens.map((token, j) => {
          if (keywords.has(token)) {
            return (
              <span key={j} className="text-[#7DD3FC]">
                {token}
              </span>
            )
          }
          if (/^["'].*["']$/.test(token)) {
            return (
              <span key={j} className="text-[#86EFAC]">
                {token}
              </span>
            )
          }
          return <span key={j}>{token}</span>
        })}
        {line === '' && '\u00A0'}
      </span>
    )
  })
}
