// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { text } = await generateText({
    model: openai('gpt-4'), // or 'gpt-3.5-turbo'
    prompt: 'What is 2+2',
  });

  return new Response(text);
}
