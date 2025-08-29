import { FastifyInstance } from 'fastify';
import { ChatController } from './controllers/chat.controller';
import { PrayerController } from './controllers/prayer.controller';
import { OpenAIService } from './services/openapi.service';
import { Prompts } from './models/prompt.model';

export async function registerRoutes(app: FastifyInstance) {
  app.get('/health', async () => ({ status: 'ok' }));

  const chat = new ChatController();
  app.post('/chat', chat.handleChat.bind(chat));

  const prayer = new PrayerController();
  app.get('/prayer', prayer.handleGetPrayer.bind(prayer));

  app.get('/server-info', async () => ({
    name: 'PRAI Fastify Server',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT || 3000)
  }));
}
