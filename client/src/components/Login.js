import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/chat'
import '../styles/login.css'

class Login extends Component {
    //state for form changes
    state = {
        username: ''
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
        login(this.state.username).then(() => {
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
                        id="loginInput"
                        placeholder="Enter a username"
                    />
                    <button type="submit" id="loginSubmit"><i className="fa fa-chevron-right"></i></button>
                </form>
                <p id="loginWelcomeBottom">functino()</p>
            </div>
        )
    }
}

function mapStateToProps(appState) {
    return {
        username: appState.chatReducer.username
    }
}
  
  export default connect(mapStateToProps)(Login)