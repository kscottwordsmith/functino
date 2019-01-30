import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { decode } from 'jsonwebtoken'

class AuthService {
  constructor(config = {}) {
    this.domain = config.domain || '/api'
    this.authPath = config.authPath || 'login'
  }

  login = (username, password) => {
    return this.fetch(`${this.domain}/${this.authPath}`, {
      method: 'POST',
      body: JSON.stringify({
        username, password
      })
    }).then(res => {
      this.setToken(res.token)
      return Promise.resolve(res)
    })
  }

  logout = () => {
    localStorage.removeItem('authtoken')
  }

  loggedIn = () => {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  isTokenExpired = (token) => {
    try {
      const decoded = decode(token)
      return decoded.exp < Date.now() / 1000
    } catch (err) {
      return false
    }
  }

  setToken = (token) => {
    localStorage.setItem('authtoken', token)
  }

  getToken = () => {
    return localStorage.getItem('authtoken')
  }

  getProfile = () => {
    return decode(this.getToken())
  }

  get = (url) => {
    return this.fetch(url, {
      method: 'GET'
    })
    .then(resp => resp.json())
  }

  put = (url, data) => {
    return this.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
  } 

  post = (url, data) => {
    return this.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
  }

  patch = (url, data) => {
    return this.fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data)
    })
    .then(resp => resp.json())
  }

  delete = (url) => {
    return this.fetch(url, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
  }

  fetch = (url, options) => {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus)
    .then(response => response.json())
  }

  _checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}

export const api = new AuthService()

const AuthContext = React.createContext({
  isAuthenticated: false,
  redirectUrl: '/login',
  defaultRedirect: '/'
})

export class Authentication extends Component {
  state = {
    isAuthenticated: api.loggedIn()
  }

  static defaultProps = {
    redirectUrl: '/login',
    defaultRedirect: '/'
  }

  signin = (username, password) => {
    var promise = new Promise((resolve, reject) => {
      api.login(username, password)
      .then(data => {
        this.setState({
          isAuthenticated: true
        })
        resolve()
      }).catch(err => {
        console.log("Error!", err)
      })
    })

    return promise
  }

  signout = () => {
    var promise = new Promise((resolve, reject) => {
      api.logout()
      this.setState({ isAuthenticated: false })
      resolve()
    })

    return promise
  }

  render() {
    const value = {
      isAuthenticated: this.state.isAuthenticated,
      redirectUrl: this.props.redirectUrl,
      signin: this.signin,
      signout: this.signout
    }

    return (
      <AuthContext.Provider value={value}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const AuthRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    { ({ isAuthenticated, redirectUrl }) => (
      <Route {...rest} render={(props) => (
        isAuthenticated 
        ? <Component {...props} />
        : <Redirect to={{
            pathname: redirectUrl,
            state: { from: props.location }
          }}/>
        )
      }/>
    )}
  </AuthContext.Consumer>
)

export function withAuth(Component) {
  return props => (
    <AuthContext.Consumer>
      {context => (
        <Component {...context} {...props} />
      )}
    </AuthContext.Consumer>
  )
}