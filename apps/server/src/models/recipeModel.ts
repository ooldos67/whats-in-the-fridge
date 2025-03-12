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

  async put(recipeId: string, updatedData: { method?: string }) {
    try {
      console.log('Updating recipe with ID:', recipeId)
      console.log('New method:', updatedData.method)

      if (!recipeId) {
        throw new Error('Recipe ID is missing')
      }

      const recipeExists = await prisma.savedRecipe.findUnique({
        where: { id: recipeId },
      })

      if (!recipeExists) {
        console.error('Recipe not found:', recipeId)
        throw new Error('Recipe not found.')
      }

      const updatedRecipe = await prisma.savedRecipe.update({
        where: { id: recipeId },
        data: updatedData,
      })
      return updatedRecipe
    } catch (error: any) {
      console.error('Error updating recipe:', error)
      throw new Error(error.message)
    }
  },
}

export default recipeModel
