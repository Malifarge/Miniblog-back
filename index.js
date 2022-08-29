const express = require('express')
const app = express()
const cors = require('cors')
const morgan= require('morgan')
const port = 5000

const articlesRoutes = require('./Routes/Articles')
const categoriesRoutes = require('./Routes/Categories')


app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

app.use('/articles',articlesRoutes)
app.use('/categories',categoriesRoutes)


app.listen(port, ()=>{
    console.log(`Serveur running on port ${port}`);
})