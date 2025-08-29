export type Lang = 'en' | 'he'

type LanguageToggleProps = {
  value: Lang
  onChange: (lang: Lang) => void
  size?: 'sm' | 'md'
}

export default function LanguageToggle({ value, onChange, size = 'md' }: LanguageToggleProps) {
  const isSmall = size === 'sm'
  
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    }}>
      <button
        onClick={() => onChange('en')}
        style={{
          padding: isSmall ? '6px 10px' : '8px 12px',
          borderRadius: '4px',
          border: value === 'en' ? '1px solid #3b82f6' : '1px solid #d1d5db',
          background: value === 'en' ? '#3b82f6' : '#ffffff',
          color: value === 'en' ? '#ffffff' : '#374151',
          fontWeight: 500,
          cursor: 'pointer',
          fontSize: isSmall ? '12px' : '14px',
          transition: 'all 0.2s ease',
          minWidth: isSmall ? '40px' : '50px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          if (value !== 'en') {
            e.currentTarget.style.background = '#f9fafb'
            e.currentTarget.style.borderColor = '#9ca3af'
          }
        }}
        onMouseLeave={(e) => {
          if (value !== 'en') {
            e.currentTarget.style.background = '#ffffff'
            e.currentTarget.style.borderColor = '#d1d5db'
          }
        }}
      >
        🇺🇸
      </button>
      <button
        onClick={() => onChange('he')}
        style={{
          padding: isSmall ? '6px 10px' : '8px 12px',
          borderRadius: '4px',
          border: value === 'he' ? '1px solid #3b82f6' : '1px solid #d1d5db',
          background: value === 'he' ? '#3b82f6' : '#ffffff',
          color: value === 'he' ? '#ffffff' : '#374151',
          fontWeight: 500,
          cursor: 'pointer',
          fontSize: isSmall ? '12px' : '14px',
          transition: 'all 0.2s ease',
          minWidth: isSmall ? '40px' : '50px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          if (value !== 'he') {
            e.currentTarget.style.background = '#f9fafb'
            e.currentTarget.style.borderColor = '#9ca3af'
          }
        }}
        onMouseLeave={(e) => {
          if (value !== 'he') {
            e.currentTarget.style.background = '#ffffff'
            e.currentTarget.style.borderColor = '#d1d5db'
          }
        }}
      >
        🇮🇱
      </button>
    </div>
  )
}


