import { useEffect, useMemo, useState } from 'react'
import Prayer from './components/prayer'
import LanguageToggle, { type Lang } from './components/LanguageToggle'
import './App.css'

type ServerInfo = {
  name: string
  version: string
  environment: string
  host: string
  port: number
}

function App() {
  const [info, setInfo] = useState<ServerInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lang, setLang] = useState<Lang>('he')
  const [isLoading, setIsLoading] = useState(false)

  const serverBaseUrl = useMemo(() => {
    return import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'
  }, [])

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${serverBaseUrl}/server-info`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data: ServerInfo = await res.json()
        setInfo(data)
      } catch (e: any) {
        setError(e.message || 'Failed to load server info')
      } finally {
        setLoading(false)
      }
    }
    fetchInfo()
  }, [serverBaseUrl])

  useEffect(() => {
    // Switch document direction based on language
    document.documentElement.setAttribute('dir', lang === 'he' ? 'rtl' : 'ltr')
  }, [lang])

  // Chat logic moved to ChatBox component

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      color: 'white',
      padding: 24
    }}>
      <div style={{
        width: '80%',
        minWidth: '75vw',
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(8px)',
        padding: 24
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, width: '100%' }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{lang === 'he' ? 'תפילה' : 'Prayer'}</h1>
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

function Label({ children }: { children: React.ReactNode }) { return <div style={{ opacity: 0.8 }}>{children}</div> }
function Value({ children }: { children: React.ReactNode }) { return <div style={{ fontWeight: 600 }}>{children}</div> }

export default App
