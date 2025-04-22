import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './data-source'
import routes from './routes'
import errorHandlerMiddleware from './middlewares/errors'

const app = express()
const corsOptions = {
    origin: 'http://localhost:3002', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies
  };
  app.use(cors(corsOptions));
app.use(express.json())

app.use('/api/v1', routes)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3001

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
        if (err.message.includes('connection is insecure')) {
            console.error('Please ensure DATABASE_SSL is set to "true" in your .env file')
        }
    })
