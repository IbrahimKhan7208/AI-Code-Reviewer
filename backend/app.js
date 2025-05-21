require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const aiRoutes = require('./routes/ai.route')

app.get('/', (req, res)=>{
    res.send('Hello World')
})

app.use(cors())
app.use(express.json())
app.use('/ai', aiRoutes)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
})