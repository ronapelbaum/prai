# PRAI Fastify + OpenAI Server

## Prerequisites
- Node.js 18+

## Setup
```bash
cp .env.example .env
# Edit .env and set OPENAI_API_KEY
npm install
```

## Development
```bash
npm run dev
```
- Server starts on `http://localhost:3000`
- Health check: `GET /health`
- Chat: `POST /chat`

### Example request
```bash
curl -s http://localhost:3000/chat \
  -H 'Content-Type: application/json' \
  -d '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Say hello in one sentence"}
    ]
  }' | jq .
```

## Build & Run
```bash
npm run build
npm start
```
