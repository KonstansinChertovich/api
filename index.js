require('dotenv').config()
const express = require('express')
const cors =require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')

const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "https://admin-project-psycholog.netlify.app",
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()