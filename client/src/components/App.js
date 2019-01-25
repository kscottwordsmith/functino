import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import store from '../store'

import Chat from './Chat'
import Login from './Login'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={Login} />
            <Route path="/:roomname" component={Chat} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
