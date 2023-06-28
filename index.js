const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3001

app.use(express.json())

const cartRouter = require('./router/cart')
const userRouter = require('./router/user')
app.use('/cart', cartRouter)
app.use('/users', userRouter)



app.get('/', (req, res) => {
    res.send('hello from server')
})

app.listen(port, () => {
    console.log('App listen on localhost:' + port)
})