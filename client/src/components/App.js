import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import store from '../store'
import { Authentication, AuthRoute } from '../lib/auth'

import Chat from './Chat'
import Login from './Login'
import Register from './Register'

class App extends Component {
  render() {
    return (
      <Authentication redirectUrl="/">
        <Provider store={store}>
            <Router>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <AuthRoute path="/:roomname" component={Chat} />
              </Switch>
            </Router>
        </Provider>
      </Authentication>
    )
  }
}

export default App
