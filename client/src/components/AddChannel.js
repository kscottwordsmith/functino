import React, { Component } from 'react'
import { addChannel } from '../actions/chat'
import '../styles/addChannel.css'

class AddChannel extends Component {
    state = {
        chan: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        addChannel(this.state.chan)
        this.setState({
            chan: ''
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} autoComplete="off" id="addChanForm">
                <input
                    type="text"
                    onChange={this.handleChange}
                    name="chan"
                    value={this.state.chan}
                    placeholder="add channel"
                    id="addChanInput"
                />
                <button type="submit" id="addChanButton">+</button>
            </form>
        )
    }
}

export default AddChannel