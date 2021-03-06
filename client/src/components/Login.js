import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/login.css'
import { withAuth } from '../lib/auth'

class Login extends Component {
    //state for form changes
    state = {
        username: '',
        password: ''
    }

    //changes state based on current value of input
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    //logs in then pushes user to default channel
    handleSubmit = (e) => {
        e.preventDefault()

        this.props.signin(this.state.username, this.state.password).then(() => {
            this.props.history.push('/default')
        })
    }

    render() {
        return (
            <div id="loginContainer">
                <p id="loginWelcomeTop">Welcome to</p>
                <form onSubmit={this.handleSubmit} autoComplete="off" id="loginForm">
                    {/* the input's value matches the state's message value */}
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        className="loginInput"
                        placeholder="Enter a username"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        className="loginInput"
                        placeholder="Enter a password"
                    />
                    <button type="submit" id="loginSubmit"><i className="fa fa-chevron-right"></i></button>
                </form>
                <span id="regLink"><Link to="/register">Create Account</Link></span>
                <p id="loginWelcomeBottom">functino()</p>
            </div>
        )
    }
}
  
  export default withAuth(Login)