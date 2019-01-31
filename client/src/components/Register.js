import React, { Component } from 'react'
import { registerUser } from '../actions/chat'

import '../styles/register.css'

class Register extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        registerUser(this.state.username, this.state.password)
        //pushes to login page. for security reasons. yeah. security.
        this.props.history.push('/')
    }

    render() {
        return (
            <div id="registerContainer">
                <p id="registerTopLabel">Create a username and password:</p>
                <form onSubmit={this.handleSubmit} autoComplete="off" id="loginForm">
                    {/* the input's value matches the state's message value */}
                    <input 
                        type="text" 
                        name="username" 
                        value={this.state.username} 
                        onChange={this.handleChange} 
                        className="registerInput"
                        id="registerUser"
                        placeholder="Enter a username"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        className="registerInput"
                        id="registerPass"
                        placeholder="Enter a password"
                    />
                    <button type="submit" id="registerSubmit"><i className="fa fa-chevron-right"></i></button>
                </form>
            </div>
        )
    }
}

export default Register