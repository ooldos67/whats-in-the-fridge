import { Request, Response } from 'express'
import fridgeModel from '../models/fridgeModel'

const fridgeController = {
  async getFridge(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params

      const fridge = await fridgeModel.get(userId)

      if (!fridge) {
        res.status(404).json({ message: 'Fridge not found for user' })
        return
      }
      res.status(200).json(fridge)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching fridge' })
    }
  },

  async addIngredient(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params
      const { ingredientName, amount, expDate } = req.body

      const fridge = await fridgeModel.post(
        userId,
        ingredientName,
        amount,
        expDate
      )
      res.status(201).json(fridge)
    } catch (error) {
      res.status(500).json({ message: 'Error adding ingredient to fridge' })
    }
  },

  async removeIngredient(req: Request, res: Response): Promise<void> {
    const { userId } = req.params
    const { ingredientId } = req.body

    try {
      const result = await fridgeModel.delete(userId, ingredientId)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({ message: 'Error removing ingredient from fridge' })
    }
  },
}

export default fridgeController
