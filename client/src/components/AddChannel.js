import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addChannel } from '../actions/chat'
import '../styles/addChannel.css'

class AddChannel extends Component {
    //state for form changes
    state = {
        chan: ''
    }

    //sets state based on what's currently in the form
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        //if the channels list does not contain what the user tries to input
        if(!this.props.channels.includes(this.state.chan)) {
            //if it includes a space, it's invalid, don't add it
            if(this.state.chan.includes(" ")) {
                this.setState({
                    chan: ''
                })
            } else if (this.state.chan.length > 12) {
                //if it's longer than 12 characters, I don't want it
                this.setState({
                    chan: ''
                })
            } else {
                //add the channel then reset the field
                addChannel(this.state.chan)
                this.setState({
                    chan: ''
                })
            }
        } else {
            //if the channel already exists, reset the field but do not add the channel
            this.setState({
                chan: ''
            })
        }
    }

    //renders a form and a button
    render() {
        return (
            <Fragment>
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
                <p id="addChanText">Channel must have 12 or fewer characters</p>
            </Fragment>
        )
    }
}

//requires channels as props to check whether an added channel exists already
function mapStateToProps(appState) {
    return {
        channels: appState.chatReducer.channels
    }
}

export default connect(mapStateToProps)(AddChannel)