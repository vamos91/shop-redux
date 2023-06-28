const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const port = process.env.PORT || 3001

app.use(express.json())

app.use(express.static(path.join(__dirname, 'client/build')))

const cartRouter = require('./router/cart')
const userRouter = require('./router/user')
app.use('/cart', cartRouter)
app.use('/users', userRouter)



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'), 'index.html')
})

app.listen(port, () => {
    console.log(__dirname)
    console.log('App listen on localhost:' + port)
})