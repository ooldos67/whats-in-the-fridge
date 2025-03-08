import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const usersModel = {
  async post(username: string) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      })

      if (existingUser) {
        throw new Error('Username already exists')
      }

      const user = await prisma.user.create({
        data: {
          username,
        },
      })
      return user
    } catch (error) {
      console.error('error creating user:', error)
      throw new Error('Error creating user')
    }
  },

  async get(userId: string) {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
        include: {
          fridge: {
            include: {
              ingredients: true,
            },
          },
          savedRecipes: true,
        },
      })
    } catch (error) {
      console.error('Error fetching user:', error)
      throw new Error('Error fetching user')
    }
  },
}

export default usersModel
