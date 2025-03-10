import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import usersController from './controllers/userController'
import fridgeController from './controllers/fridgeController'
import recipeController from './controllers/recipeController'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.post('/user', usersController.createUser)
app.get('/user/:userId', usersController.getUser)

app.get('/fridge/:userId', fridgeController.getFridge)
app.post('/fridge/:userId/ingredient', fridgeController.addIngredient)
app.delete('/fridge/:userId/ingredient', fridgeController.removeIngredient)

app.get('/recipes/:id?', recipeController.getSavedRecipes)
app.post('/recipes', recipeController.saveRecipe)
app.delete('/recipes/:id', recipeController.removeRecipe)

const PORT = 8080
app.listen(PORT, () => {
  console.log(`🔥 Server is running at <http://localhost>:${PORT}`)
})
