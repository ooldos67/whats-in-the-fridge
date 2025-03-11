import { config } from 'dotenv'
import OpenAI from 'openai'

config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function completion(prompt: string) {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    stream: true,
  })
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}
