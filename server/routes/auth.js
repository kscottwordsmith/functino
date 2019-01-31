import express from 'express'
import conn from '../utils/db'
import sha512 from 'js-sha512'
import jwt from 'jsonwebtoken'
import config from 'config'

const Router = express.Router()

Router.post('/login', (req, res, next) => {
    const sql = 'SELECT count(1) as count FROM users WHERE username = ? && password = ?'
    conn.query(sql, [req.body.username, sha512(req.body.password)], (err, results, fields) => {
        const valid = results[0].count > 0

        if ( valid ) {
            const token = jwt.sign({username: req.body.username}, config.get('jwtsecret'))
            
            res.json({
                message: 'Successful login',
                token: token
            })
        } else {
            res.status(401).json({
                message: 'Bad username and/or password'
            })
        }
    })
})

Router.post('/register', (req, res, next) => {
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)'

    if(!req.body.username || !req.body.password) {
        res.json({
            message: 'Both username and password fields are required'
        })
    } else {
        conn.query(sql, [req.body.username, sha512(req.body.password)], (err, results, fields) => {
            const token = jwt.sign({username: req.body.username}, config.get('jwtsecret'))
            res.json({
                message: 'User registered successfully',
                token: token
            })
        }) 
    }
})

export default Router