const initialState = {
  messages: [],
  username: 'Some Jerk'
}

export default function (state = initialState, action) {
  switch (action.type) {
    // add actions here
    case 'ADD_MESSAGE':
      return {...state, messages: [...state.messages, action.payload]}
    default:
      return state
  }
}