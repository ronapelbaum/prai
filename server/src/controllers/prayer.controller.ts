import { FastifyReply, FastifyRequest } from 'fastify';
import { OpenAIService } from '../services/openapi.service';
import { Prompts, SA_PRAYER_KEYPOINTS, SA_STEP_CITATIONS } from '../models/prompt.model';

type PrayerQuery = {
  lang?: 'en' | 'he'
  step?: number
}

export class PrayerController {
  private readonly openai: OpenAIService;

  constructor(openai?: OpenAIService) {
    this.openai = openai ?? new OpenAIService();
  }

  async handleGetPrayer(request: FastifyRequest<{ Querystring: PrayerQuery }>, reply: FastifyReply) {
    try {
      const lang = request.query?.lang || 'en';
      const step = request.query?.step || 1;
      const response = await this.openai.chatCompletion({
        messages: [
          { role: 'system', content: Prompts.sa_prayer + `\n\nHere are the keypoints for step ${step}: ${SA_PRAYER_KEYPOINTS[step].join('\n')}` + (lang === 'he' ? ' Respond in Hebrew.' : '') },
          { role: 'user', content: `Please provide the prayer for step ${step}.` }
        ],
        temperature: 0.9
      });
      return reply.send({ text: response.text, raw: response.raw, citation: SA_STEP_CITATIONS[lang][step - 1] });
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'Failed to generate prayer' });
    }
  }
}


