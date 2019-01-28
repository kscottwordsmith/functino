import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/channelBar.css'
import AddChannel from './AddChannel'
import { leaveChannel as leaveChan } from '../actions/chat'

class ChannelBar extends Component {
    leaveChannel = (chan) => {
        leaveChan(chan)
    }

    render() {
        var channelLinks = this.props.channels.map(chan => {
            return (
                <li className="channel">
                    <Link to={`/${chan}`}>{chan}</Link>
                    <button onClick={() => this.leaveChannel(chan)} className="leaveButton">-</button>
                </li>
            )
        })
        return (
            <div id="leftBarWrap">
                <div id="channelBarContainer">
                    <h3 id="channelBarHeader">functino</h3>
                    <ul id="channelBar">
                        {channelLinks}
                    </ul>
                </div>
                <AddChannel />
            </div>
        )
    }
}

function mapStateToProps(appState) {
    return {
        channels: appState.chatReducer.channels
    }
}

export default connect(mapStateToProps)(ChannelBar)