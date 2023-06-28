const express = require('express')
const router = express.Router()
const connection = require('../database/connection')

router.get('/' ,(req, res) => {
    connection.query('SELECT * FROM USERS', (err, results, fields) => {
        if(!err){
            res.status(200).json({users: results})
        }else{
            res.status(500).json({message: err})
        }
    })
})

router.get('/:id', (req, res) => {
    connection.query('SELECT * FROM USERS where id= ?',[req.params.id], (err, results, fields) => {
        if(!err){
            res.status(200).json({user: results})
        }else{
            res.status(500).json({message: err})
        }
    })
})

router.post('/signin', (req, res) => {
    const {email} = req.body
    connection.query('SELECT * FROM USERS where email= ?',[email], (err, results, fields) => {
        if(!err && results.length !== 0){
            res.status(200).json({user: results})
        }else{
            res.status(500).json({message: err})
        }
    })
})

router.post('/signup', (req, res) => {
    connection.query('INSERT INTO users (lastName, firstName, email, created_at, updated_at, is_admin) value (?, ?, ?, ?, ?, ?)', [req.body.lastName, req.body.firstName, req.body.email, new Date(), new Date(), req.body.isAdmin], (err, results, fields) => {
        if(!err){
            res.status(200).json({resultat: results})
        }else{
            res.status(500).json({resultat: err})
        }
    })
})

router.put('/:id', (req, res) => {
    connection.query('UPDATE users SET is_admin=? where id=?', [1, req.params.id], (err, results, fields) => {
        if(!err){
            res.status(200).json({user: results})
        }else{
            res.status(500).json({message: err})
        }
    })
})

router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM users WHERE id=?', [req.params.id], (err, results, fields) => {
        if(!err){
            res.status(200).json({user: results})
        }else{
            res.status(500).json({message: err})
        }
    })
})

router.post('/:id/cart', (req, res) => {
    const {id} = req.params
    connection.query('SELECT * FROM USERS where id= ?',[id], (err, results, fields) => {
        if(!err && results.length !== 0){
            connection.query('DELETE FROM cart where user_id=?', [results[0].id],(err, resultatDelete, fields) => {
                if(!err){
                    console.log(resultatDelete)
                    connection.query('INSERT INTO cart (product_id, user_id) values (?, ?)', [ `[${req.body.productsId}]`, results[0].id], (err, results, fields) => {
                        if(!err){
                            console.log(results)
                            res.status(200).json({message: 'ok'})
                        }else{
                            console.log(err)
                            res.status(500).json({message: 'internal error'})
                        }
                     })
                }
            })
        }else{
            res.status(500).json({message: err})
        }
    })
})

router.post('/:id/products', (req, res) => {
    const productLiked = req.body
    const {id} = req.params
    console.log(productLiked)
   
    connection.query('SELECT * FROM USERS where id= ?',[id], (err, results_user, fields) => {
        if(!err && results_user.length !== 0){

            connection.query('SELECT * FROM ProductsLiked where products_id=? AND user_id=? ', [productLiked.id, results_user.id], (err, results, fields) => {
                console.log(results)
                if(results.length > 0){
                    console.log('je supprime')
                    // connection.query('DELETE FROM ProductsLiked where id=?', [results.id], (err, result, fields) => {
                    // res.status(200).json({message: 'like supprimé'})
                    //})
                }else{
                    console.log('jajoute')
                        // console.log(err)
                        // res.status(500).json({message: 'internal error'})
                        // connection.query('INSERT INTO ProductsLiked (products_id, user_id) VALUES (?, ?)', [ [productLiked.id], parseInt(id)], (err, results, fields) => {
                        //     if(!err){
                        //         console.log(results)
                        //         res.status(200).json({message: 'ok'})
                        //     }else{
                        //         console.log(err)
                        //         res.status(500).json({message: 'internal error'})
                        //     } 
                        // })
                    } 
            })
        }
    })
})


module.exports = router