const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(express.json())

const PORT = 3003
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
