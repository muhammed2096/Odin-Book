import dotenv from 'dotenv'
dotenv.config({})
import express from 'express'
import { dbConnection } from './db/dbConnection.js'
import cors from 'cors'
import { bootstrap } from './src/modules/index.routes.js'

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
dbConnection()
bootstrap(app)


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})