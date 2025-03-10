import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const recipeModel = {
  // Get all recipes or a specific one by ID
  async get(recipeId: string | null = null) {
    try {
      if (recipeId) {
        const recipe = await prisma.savedRecipe.findUnique({
          where: { id: recipeId },
        })
        if (!recipe) {
          throw new Error('Recipe not found')
        }
        return recipe
      }
      return await prisma.savedRecipe.findMany()
    } catch (error) {
      console.error('Error fetching recipes:', error)
      throw new Error('Error fetching recipes.')
    }
  },

  async post(data: {
    userId: string
    title: string
    ingredients: string[]
    method: string
    mealType: string
    dietaryRequirements: string
  }) {
    try {
      const newRecipe = await prisma.savedRecipe.create({
        data,
      })
      return newRecipe
    } catch (error) {
      console.error('Error creating recipe:', error)
      throw new Error('Error creating recipe.')
    }
  },

  async delete(recipeId: string) {
    try {
      const deletedRecipe = await prisma.savedRecipe.delete({
        where: { id: recipeId },
      })
      return deletedRecipe
    } catch (error) {
      console.error('Error deleting recipe:', error)
      throw new Error('Error deleting recipe.')
    }
  },
}

export default recipeModel
