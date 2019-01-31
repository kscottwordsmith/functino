import socketio from 'socket.io'

export default function(server) {
  const io = socketio(server)

  io.on('connection', function(socket){
    //always joins default channel
    socket.join('default')

    //when we receive a new message object
    socket.on('new message', (message) => {
      //send it to its roomname
      io.to(message.roomname).emit('new message', message)
    })

    //when we join a new channel
    socket.on('new channel', (channel) => {
      socket.join(channel)
      socket.emit('new channel', channel)
    })

    //when we leave a channel
    socket.on('leave channel', (channel) => {
      socket.leave(channel)
      socket.emit('leave channel', channel)
    })

    console.log('User has connected to socket server')  
  })
}