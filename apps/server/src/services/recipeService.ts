import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateRecipe(
  ingredients: string[],
  mealType: string,
  dietaryRequirements: string
) {
  const prompt = `Create a recipe using the following ingredients: ${ingredients.join(', ')}. It should be a ${mealType} dish and suitable for a ${dietaryRequirements} diet.`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('Error generating recipe:', error)
    throw new Error('Failed to generate recipe')
  }
}
