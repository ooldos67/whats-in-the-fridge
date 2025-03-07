import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const usersModel = {
  async post(username: string) {
    try {
      return await prisma.user.create({
        data: {
          username,
        },
      })
    } catch (error) {
      throw new Error('Error creating user')
    }
  },

  async get(id: string) {
    try {
      return await prisma.user.findUnique({
        where: { id },
        include: {
          fridge: true,
          savedRecipes: true,
        },
      })
    } catch (error) {
      throw new Error('Error fetching user')
    }
  },
}

export default usersModel
