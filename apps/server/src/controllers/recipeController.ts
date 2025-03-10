import { Request, Response } from 'express'
import recipeModel from '../models/recipeModel'

const recipeController = {
  async getSavedRecipes(req: Request, res: Response): Promise<void> {
    try {
      const recipeId = req.params.id || null // Get the recipeId from URL params, default to null for all recipes
      const recipes = await recipeModel.get(recipeId)

      if (!recipes) {
        res.status(404).json({ message: 'No recipes found' })
        return
      }

      res.status(200).json(recipes)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while fetching the recipes.' })
    }
  },

  async saveRecipe(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        title,
        ingredients,
        method,
        mealType,
        dietaryRequirements,
      } = req.body

      if (!userId || !title || !ingredients || !method) {
        res.status(400).json({ error: 'Missing required fields' })
        return
      }

      const newRecipe = await recipeModel.post({
        userId,
        title,
        ingredients,
        method,
        mealType,
        dietaryRequirements,
      })

      res.status(201).json(newRecipe)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while creating the recipe.' })
    }
  },

  async removeRecipe(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const deletedRecipe = await recipeModel.delete(id)

      if (!deletedRecipe) {
        res.status(404).json({ message: 'Recipe not found' })
        return
      }

      res
        .status(200)
        .json({ message: 'Recipe deleted successfully', deletedRecipe })
    } catch (error) {
      console.error('Error in deleteRecipe:', error)
      res
        .status(500)
        .json({ message: 'An error occurred while deleting the recipe.' })
    }
  },
}

export default recipeController
