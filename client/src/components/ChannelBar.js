import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/channelBar.css'

class ChannelBar extends Component {
    render() {
        return (
            <div id="channelBarContainer">
                <h3 id="channelBarHeader">functino</h3>
                <ul id="channelBar">
                    <li className="channel"><Link to="/default">default</Link></li>
                    <li className="channel"><Link to="/general">general</Link></li>
                    <li className="channel"><Link to="/random">random</Link></li>
                </ul>
            </div>
        )
    }
}

export default ChannelBar