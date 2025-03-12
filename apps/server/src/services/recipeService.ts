import { config } from 'dotenv'
import OpenAI from 'openai'
import { z } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'

config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// const RecipeSchema = z.object({
//   recipeTitle: z.string(),
//   ingredients: z.array(z.string()),
//   mealType: z.string(),
//   diet: z.string(),
// })

const RecipeSchema = z.object({
  recipes: z.array(
    z.object({
      recipeTitle: z.string(),
      ingredients: z.array(z.string()),
      mealType: z.string(),
      diet: z.string(),
    })
  ),
})

const MethodSchema = z.object({
  method: z.string(),
})

// export async function completion(prompt: string) {
//   const stream = await openai.chat.completions.create({
//     model: 'gpt-4o-mini',
//     messages: [
//       {
//         role: 'user',
//         content: prompt,
//       },
//     ],
//     response_format: zodResponseFormat(RecipeSchema, 'recipes'),
//     stream: true,
//   })
//   for await (const chunk of stream) {
//     process.stdout.write(chunk.choices[0]?.delta?.content || '')
//   }
// }

export async function completion(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: zodResponseFormat(RecipeSchema, 'recipes'),
    })

    console.log('Raw OpenAI Response:', response.choices[0].message.content)

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return { recipes: [] }
  }
}

export async function recipeMethod(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: zodResponseFormat(MethodSchema, 'recipe'),
    })

    console.log('Raw OpenAI Response:', response.choices[0].message.content)

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
    return { method: [] }
  }
}
