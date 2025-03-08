import usersModel from '../models/userModel'
import { Request, Response } from 'express'

const usersController = {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username } = req.body

      if (!username) {
        res.status(400).json({ message: 'Username is required!' })
        return
      }

      const user = await usersModel.post(username)

      if (!user) {
        res.status(500).json({ message: 'Failed to create user!' })
        return
      }

      res.status(201).json({ message: 'User created successfully', user: user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error creating user' })
    }
  },

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params

      const user = await usersModel.get(userId)

      if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
      }
      res.status(200).json({ user })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error fetching user' })
    }
  },
}

export default usersController
