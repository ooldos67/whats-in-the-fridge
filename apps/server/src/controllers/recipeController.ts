import { Request, Response } from 'express'
import recipeModel from '../models/recipeModel'
import { completion, recipeMethod } from '../services/recipeService'

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

      if (!userId || !title || !ingredients) {
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

  async createRecipe(req: Request, res: Response): Promise<void> {
    try {
      const { prompt } = req.body

      if (!prompt) throw new Error('Missing prompt')

      const recipe = await completion(prompt)

      res.status(200).json({ recipe })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to generate recipe' })
    }
  },

  async createFullRecipe(req: Request, res: Response): Promise<void> {
    try {
      const { prompt } = req.body

      if (!prompt) throw new Error('Missing prompt')

      const method = await recipeMethod(prompt)

      res.status(200).json({ method })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to generate method' })
    }
  },

  async updateRecipe(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params
      const { method } = req.body

      console.log('Updating recipe ID:', id)
      console.log('New method:', method)

      if (!id) {
        res.status(400).json({ error: 'Recipe ID is required.' })
        return
      }

      if (!method) {
        res.status(400).json({ error: 'Method field is required for update.' })
        return
      }

      const updatedRecipe = await recipeModel.put(id, { method })
      res.json(updatedRecipe)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update recipe' })
    }
  },
}

export default recipeController
