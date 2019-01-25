import axios from 'axios'
import store from '../store'
import io from 'socket.io-client'

axios.defaults.baseURL = '/api'

const socket = io.connect('http://localhost:3001')
//const socket = io.connect('http://10.68.0.181:3001')

export function addMessage(message) {
  const username = store.getState().chatReducer.username
  socket.emit('new message', {
    username: username,
    message: message
  })
}

socket.on('new message', (message) => {
  store.dispatch({
    type: 'ADD_MESSAGE',
    payload: message
  })
})