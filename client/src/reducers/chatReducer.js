const initialState = {
  messages: [],
  username: ''
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'ADD_MESSAGE':
      return {...state, messages: [...state.messages, action.payload]}
    case 'LOGIN_USER':
      return {...state, username: action.payload}
    default:
      return state
  }
}