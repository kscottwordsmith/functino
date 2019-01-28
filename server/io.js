import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(socket){
    socket.join('default')
    // socket.join('general')
    // socket.join('random')

    socket.on('new message', (message) => {
      io.to(message.roomname).emit('new message', message)
    })

    socket.on('new channel', (channel) => {
      socket.join(channel)
      socket.emit('new channel', channel)
    })

    socket.on('leave channel', (channel) => {
      socket.leave(channel)
      socket.emit('leave channel', channel)
    })

    console.log('User has connected to socket server')
  })
}