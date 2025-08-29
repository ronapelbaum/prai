import { useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatBox() {
  const [prompt, setPrompt] = useState('Say hi in 3 words')
  const [chatLoading, setChatLoading] = useState(false)
  const [chatError, setChatError] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string>('')

  const serverBaseUrl = useMemo(() => {
    return import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'
  }, [])

  const sendChat = async () => {
    if (!prompt.trim() || chatLoading) return
    setChatError(null)
    setAnswer('')
    setChatLoading(true)
    try {
      const res = await fetch(`${serverBaseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptKey: 'default',
          messages: [{ role: 'user', content: prompt }]
        })
      })
      if (!res.ok) throw new Error(`Chat failed: ${res.status}`)
      const data = await res.json()
      setAnswer(data.text || '')
    } catch (e: any) {
      setChatError(e.message || 'Chat failed')
    } finally {
      setChatLoading(false)
    }
  }

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#22c55e' }} />
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Chat</h1>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              sendChat()
            }
          }}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: '10px 12px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(0,0,0,0.2)',
            color: 'white'
          }}
        />
        <button
          onClick={sendChat}
          disabled={chatLoading || !prompt.trim()}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.15)',
            background: chatLoading ? 'rgba(255,255,255,0.2)' : '#22c55e',
            color: '#0b1220',
            fontWeight: 600,
            cursor: chatLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {chatLoading ? 'Sending…' : 'Chat'}
        </button>
      </div>
      {chatError && <p style={{ color: '#fda4af', marginTop: 8 }}>{chatError}</p>}
      {answer && (
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
          <div style={{ opacity: 0.8, marginBottom: 6, fontSize: 12 }}>Assistant</div>
          <div style={{ lineHeight: 1.6 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}


