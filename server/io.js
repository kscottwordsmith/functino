import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(socket){
    socket.join('default')
    socket.join('general')
    socket.join('random')

    socket.on('new message', (message) => {
      io.to(message.roomname).emit('new message', message)
    })

    console.log('User has connected to socket server')
  })
}