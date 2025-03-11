import { config } from 'dotenv'
import OpenAI from 'openai'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const RecipeSchema = z.object({
  recipeTitle: z.string(),
  ingredients: z.array(z.string()),
  mealType: z.string(),
  diet: z.string(),
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
    response_format: zodResponseFormat(RecipeSchema, 'recipes'),
    stream: true,
  })
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}
