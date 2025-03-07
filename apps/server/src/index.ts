import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import usersController from './controllers/userController'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.post('/user', usersController.createtUser)
app.get('/user/:id', usersController.getUser)

const PORT = 8080
app.listen(PORT, () => {
  console.log(`🔥 Server is running at <http://localhost>:${PORT}`)
})
