const express = require('express')
const router = express.Router()
const connection = require('../database/connection')

router.get('/', (req, res) => {
    connection.query('SELECT * FROM cart', (err, results, fields) => {
        if(!err){
            console.log(results)
            res.status(200).json(results)
        }else{
            console.log(err)
        }
    })
})

router.post('/:user_id', (req, res) => {
    console.log(req.body.productsId)
    console.log('user id:', req.params.user_id)
    // connection.query('TRUNCATE TABLE cart')
    // connection.query('INSERT INTO cart (product_id) values (?)', `[${req.body.productsId}]`, (err, results, fields) => {
    //     if(!err){
    //         console.log(results)
    //         res.status(200).json({message: 'ok'})
    //     }else{
    //         console.log(err)
    //         res.status(500).json({message: 'internal error'})
    //     }
    // })
})

module.exports = router;
