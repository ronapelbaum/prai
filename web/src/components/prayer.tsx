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
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        {!loading && [1, 2, 3, 4].map((step) => (
          <button
            key={step}
            onClick={() => fetchPrayer(step)}
            style={{
              padding: '12px 20px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              background: '#ffffff',
              color: '#374151',
              fontWeight: 500,
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              minWidth: '80px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb'
              e.currentTarget.style.borderColor = '#9ca3af'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
          >
            {t(`Step ${step}`, `צעד ${step}`)}
          </button>
        ))}
      </div>
      
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px',
          color: '#6b7280',
          fontSize: '16px'
        }}>
          {t('Loading prayer...', 'טוען תפילה...')}
        </div>
      )}
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px',
          color: '#dc2626',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}
      
      {!loading && !error && text && (
        <div style={{
          padding: '25px',
          borderRadius: '6px',
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            lineHeight: 1.7,
            color: '#1f2937',
            fontSize: '16px',
            textAlign: lang === 'he' ? 'right' : 'left',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            maxWidth: '100%'
          }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}


