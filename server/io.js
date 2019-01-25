import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(socket){
    socket.on('new message', (message) => {
      io.emit('new message', message)
    })

    console.log('User has connected to socket server')
  })
}