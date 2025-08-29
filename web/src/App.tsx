import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Prayer from './components/prayer'
import LanguageToggle from './components/LanguageToggle'
import type { Lang } from './components/LanguageToggle'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<Lang>('he')
  const [isLoading, setIsLoading] = useState(false)

  const serverBaseUrl = useMemo(() => {
    return import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'
  }, [])

  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await fetch(`${serverBaseUrl}/server-info`)
        if (!res.ok) throw new Error(`Server check failed: ${res.status}`)
        setLoading(false)
      } catch (e: any) {
        setError(e.message || 'Failed to connect to server')
        setLoading(false)
      }
    }
    checkServer()
  }, [serverBaseUrl])

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }, [lang]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f8ff 50%, #f5f5f5 100%)',
        color: '#2c3e50',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Loading...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f8ff 50%, #f5f5f5 100%)',
        color: '#2c3e50',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#e74c3c', marginBottom: '10px' }}>Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f8ff 50%, #f5f5f5 100%)',
      color: '#2c3e50',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '800px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        border: '1px solid rgba(200,200,200,0.3)',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '30px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '30px', 
          width: '100%',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '28px', 
            fontWeight: 300,
            color: '#34495e',
            letterSpacing: '0.5px'
          }}>
            {lang === 'he' ? 'תפילה' : 'Prayer'}
          </h1>
          {!isLoading && <LanguageToggle value={lang} onChange={setLang} size="sm" />}
        </div>

        {!loading && !error && (
          <div style={{ marginTop: 0, width: '100%' }}>
            <Prayer lang={lang} onLoadingChange={setIsLoading} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
