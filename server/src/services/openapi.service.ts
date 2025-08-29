import OpenAI from 'openai';

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export class OpenAIService {
  private client: OpenAI;

  constructor(private readonly apiKey: string | undefined = process.env.OPENAI_API_KEY) {
    if (!apiKey) throw new Error('Missing OPENAI_API_KEY');
    this.client = new OpenAI({ apiKey });
  }

  async chatCompletion(params: {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
  }) {
    const { messages, model = 'gpt-4o-mini', temperature = 0.7 } = params;
    const response = await this.client.chat.completions.create({
      model,
      messages,
      temperature
    });
    const text = response.choices[0]?.message?.content ?? '';
    return { text, raw: response };
  }
}
