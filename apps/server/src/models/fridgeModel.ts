import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fridgeModel = {
  async get(userId: string) {
    try {
      return prisma.fridge.findUnique({
        where: { userId },
        include: { ingredients: true },
      })
    } catch (error) {
      throw new Error('Error fetching fridge')
    }
  },

  async post(
    userId: string,
    ingredientName: string,
    amount: string,
    expDate: Date
  ) {
    try {
      // check if ingredient exists by name
      let ingredient = await prisma.ingredient.findUnique({
        where: { name: ingredientName },
      })

      // if not, create the ingredient
      if (!ingredient) {
        ingredient = await prisma.ingredient.create({
          data: { name: ingredientName, amount: amount, expDate: expDate },
        })
      }

      //check if the user has a fridge.
      let fridge = await prisma.fridge.findUnique({
        where: { userId },
      })

      //if no fridge, create one
      if (!fridge) {
        fridge = await prisma.fridge.create({
          data: {
            userId, //fridge is linked to this user.
            ingredients: {
              connect: { id: ingredient.id }, //connect the ingredient to the fridge
            },
          },
        })
      } else {
        await prisma.fridge.update({
          where: { userId },
          data: {
            ingredients: {
              connect: { id: ingredient.id },
            },
          },
        })
      }
      return ingredient
    } catch (error) {
      throw new Error('Error adding ingredient to fridge')
    }
  },

  async delete(userId: string, ingredientId: string) {
    try {
      // First, check if the fridge exists
      const fridge = await prisma.fridge.findUnique({
        where: { userId },
      })

      if (!fridge) {
        throw new Error('Fridge not found for user')
      }

      // Remove ingredient from fridge by disconnecting it
      await prisma.fridge.update({
        where: { userId },
        data: {
          ingredients: {
            disconnect: { id: ingredientId },
          },
        },
      })

      // Delete the ingredient from the database
      await prisma.ingredient.delete({
        where: { id: ingredientId },
      })

      return {
        message: 'Ingredient removed from fridge and deleted from db',
      }
    } catch (error) {
      throw new Error(
        'Error removing ingredient from fridge and deleting it from database'
      )
    }
  },
}

export default fridgeModel
