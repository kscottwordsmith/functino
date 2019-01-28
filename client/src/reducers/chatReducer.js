const initialState = {
  messages: [],
  username: '',
  currentRoom: '',
  channels: ["default"]
}

//has default already in channels to allow the user to re-access default should they
//add a new channel then move to it

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      //returns the messages with the new message at bottom
      return {...state, messages: [...state.messages, action.payload.message]}
    case 'LOGIN_USER':
      //sets the username for use in Chat.js
      return {...state, username: action.payload}
    case 'SET_CURRENT':
      return {...state, currentRoom: action.payload}
    case 'ADD_CHANNEL':
      //returns the channels with the new channel at bottom
      return {...state, channels: [...state.channels, action.payload]}
    case 'LEAVE_CHANNEL':
      //filters through channels and takes only channels that do not share name with action.payload
      //then returns that filtered array
      let lessChans = state.channels.filter(chan => chan !== action.payload)
      return {...state, channels: lessChans}
    default:
      return state
  }
}