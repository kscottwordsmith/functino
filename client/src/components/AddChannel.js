import React, { Component } from 'react'
import { connect } from 'react-redux'
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
        if(!this.props.channels.includes(this.state.chan)) {
            addChannel(this.state.chan)
            this.setState({
                chan: ''
            })
        } else {
            this.setState({
                chan: ''
            })
        }
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

function mapStateToProps(appState) {
    return {
        channels: appState.chatReducer.channels
    }
}

export default connect(mapStateToProps)(AddChannel)