import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect('http://localhost:3001')
//const socket = io.connect('http://10.68.0.181:3001')

//sends emits to socket that the specified room name has a new message
export function addMessage(message) {
  socket.emit('new message', {
    roomname: message.roomname,
    message: message
  })
}

//uses a promise to more easily guarantee a successful dispatch to add a username
export function login(name) {
  var promise = new Promise((resolve, reject) => {
    store.dispatch({
      type: 'LOGIN_USER',
      payload: name
    })

    resolve()
  })

  return promise
}

//emits to socket that a new channel is to be added
export function addChannel(channel) {
  socket.emit('new channel', channel)
}

//emits to socket that a channel is to be removed
export function leaveChannel(channel) {
  socket.emit('leave channel', channel)
}

//we've received a new message, dispatches to add it to messages array
socket.on('new message', (message) => {
  store.dispatch({
    type: 'ADD_MESSAGE',
    payload: message
  })
})

//we've joined a new channel, dispatches to add it to channels array
socket.on('new channel', (channel) => {
  store.dispatch({
    type: "ADD_CHANNEL",
    payload: channel
  })
})

//we've left a channel, dispatches to remove it from channels array
socket.on('leave channel', (channel) => {
  store.dispatch({
    type: "LEAVE_CHANNEL",
    payload: channel
  })
})