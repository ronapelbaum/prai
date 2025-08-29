import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { OpenAIService, ChatMessage } from '../services/openapi.service';
import { Prompts, PromptKey } from '../models/prompt.model';

const chatBodySchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string()
    })
  ).optional(),
  promptKey: z.custom<PromptKey>((val) => typeof val === 'string' && val in Prompts).optional(),
  temperature: z.number().min(0).max(2).optional(),
  model: z.string().optional()
});

export class ChatController {
  private readonly openai: OpenAIService;

  constructor(openai?: OpenAIService) {
    this.openai = openai ?? new OpenAIService();
  }

  async handleChat(request: FastifyRequest, reply: FastifyReply) {
    const parsed = chatBodySchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: 'Invalid body', details: parsed.error.flatten() });
    }
    const { messages = [], promptKey = 'default', temperature, model } = parsed.data ?? {};

    try {
      const systemMessage: ChatMessage = { role: 'system', content: Prompts[promptKey] };
      const response = await this.openai.chatCompletion({
        messages: [systemMessage, ...messages],
        temperature,
        model
      });
      return reply.send(response);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'OpenAI request failed' });
    }
  }
}
