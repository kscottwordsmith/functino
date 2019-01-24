import app from './app'
import io from './io'
import http from 'http'

const server = http.createServer(app)
//connects socket.io to http
io(server)

server.listen(3001, function(){
  console.log('Server listening on port 3001')
})