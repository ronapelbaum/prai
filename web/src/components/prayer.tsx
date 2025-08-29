import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Lang } from './LanguageToggle'

export default function Prayer({ lang, onLoadingChange }: { lang: Lang, onLoadingChange?: (v: boolean) => void }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const serverBaseUrl = useMemo(() => {
    return import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'
  }, [])

  const fetchPrayer = async (step = 1) => {
    setLoading(true)
    onLoadingChange?.(true)
    setError(null)
    console.log('fetching prayer for step', step)
    try {
      const res = await fetch(`${serverBaseUrl}/prayer?lang=${encodeURIComponent(lang)}&step=${step}`)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      const data = await res.json()
      setText(data.text || '')
    } catch (e: any) {
      setError(e.message || 'Failed to load prayer')
    } finally {
      setLoading(false)
      onLoadingChange?.(false)
    }
  }

  const t = (en: string, he: string) => (lang === 'he' ? he : en)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end' }}>
        {!loading && [1, 2, 3, 4].map((step) => (
          <button
            key={step}
            onClick={() => fetchPrayer(step)}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              width: 'auto',
              border: '1px solid rgba(255,255,255,0.15)',
              background: '#22c55e',
              color: '#0b1220',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {t(`Step ${step}`, `צעד ${step}`)}
            </button>
        ))}
      </div>
      {loading && <p style={{ opacity: 0.8, marginTop: 8 }}>Loading…</p>}
      {error && <p style={{ color: '#fda4af' }}>{error}</p>}
      {!loading && !error && text && (
        <div style={{
          marginTop: 12,
          padding: 14,
          borderRadius: 12,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: 560,
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{ lineHeight: 1.6 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}


