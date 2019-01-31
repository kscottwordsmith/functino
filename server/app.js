import express from 'express'
import bodyParser from 'body-parser'
import Router from './routes/example'
import AuthRouter from './routes/auth'
import expressjwt from 'express-jwt'
import config from 'config'

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api', AuthRouter)
app.use('/api', expressjwt({secret: config.get('jwtsecret')}), Router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

export default app