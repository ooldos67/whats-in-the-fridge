import { config } from 'dotenv'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

config()

export async function completion() {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: 'Feeling stuck? Send a message to help@mycompany.com.',
      },
    ],
  })

  console.log(completion.choices[0].message.content)
}
