import { useState } from 'react'

export type Lang = 'en' | 'he'

export default function LanguageToggle({
  value,
  onChange,
  size = 'sm'
}: {
  value?: Lang
  onChange?: (lang: Lang) => void
  size?: 'sm' | 'md'
}) {
  const [lang, setLang] = useState<Lang>(value || 'en')

  const set = (l: Lang) => {
    setLang(l)
    onChange?.(l)
  }

  const padding = size === 'sm' ? '4px 8px' : '6px 10px'
  const fontSize = size === 'sm' ? 12 : 14

  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      <button
        onClick={() => set('en')}
        style={{
          padding,
          fontSize,
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.2)',
          background: lang === 'en' ? '#22c55e' : 'transparent',
          color: lang === 'en' ? '#0b1220' : 'white',
          cursor: 'pointer'
        }}
      >
        🇺🇸 English
      </button>
      <button
        onClick={() => set('he')}
        style={{
          padding,
          fontSize,
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.2)',
          background: lang === 'he' ? '#22c55e' : 'transparent',
          color: lang === 'he' ? '#0b1220' : 'white',
          cursor: 'pointer'
        }}
      >
        🇮🇱 עברית
      </button>
    </div>
  )
}


