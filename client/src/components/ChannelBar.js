import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/channelBar.css'
import AddChannel from './AddChannel'
import { leaveChannel as leaveChan } from '../actions/chat'

class ChannelBar extends Component {

    //when you leave a channel, it boots you back to default
    handleLeave = (chan) => {
        leaveChan(chan)
        this.props.history.push('/default')
    }

    render() {
        //maps all the channel names as links
        var channelLinks = this.props.channels.map((chan, i) => {
            if(chan !== 'default') {
                return (
                    <li className="channel" key={`channel-${chan}-${i}`}>
                        <Link to={`/${chan}`}>#{chan}ino</Link>
                        {/* leaves channel based on channel name */}
                        <button onClick={() => this.handleLeave(chan)} className="leaveButton">-</button>
                    </li>
                )
            } else {
                return (
                    <li className="channel" key={`channel-${chan}-${i}`}>
                        <Link to={`/${chan}`}>#{chan}ino</Link>
                    </li>
                )
            }
            
        })
        return (
            <div id="leftBarWrap">
                <div id="channelBarContainer">
                    <h3 id="channelBarHeader">functino()</h3>
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
        channels: appState.chatReducer.channels,
        currentRoom: appState.chatReducer.currentRoom,
    }
}

export default connect(mapStateToProps)(ChannelBar)