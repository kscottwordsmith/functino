import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect('http://localhost:3001')
//const socket = io.connect('http://10.68.0.181:3001')

export function addMessage(message) {
  socket.emit('new message', {
    roomname: message.roomname,
    message: message.message
  })
}

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

export function addChannel(channel) {
  socket.emit('new channel', channel)
}

export function leaveChannel(channel) {
  socket.emit('leave channel', channel)
}

socket.on('new message', (message) => {
  store.dispatch({
    type: 'ADD_MESSAGE',
    payload: message
  })
})

socket.on('new channel', (channel) => {
  store.dispatch({
    type: "ADD_CHANNEL",
    payload: channel
  })
})

socket.on('leave channel', (channel) => {
  store.dispatch({
    type: "LEAVE_CHANNEL",
    payload: channel
  })
})