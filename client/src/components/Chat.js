import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/chat'
import '../styles/chatRoom.css'
//ChannelBar is the bar on the left side containing channels joined and the form to add channels
import ChannelBar from './ChannelBar'

class Chat extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
    if(!this.props.username) {
      this.props.history.push("/")
    }
  }

  componentWillUpdate() {
    //checks to see if the ref at messages has been scrolled all the way to the bottom
    var node = this.refs.messages
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight
  }

  componentDidUpdate() {
    //if we're already at the bottom, scroll to the bottom, otherwise, don't
    //preserves where the user is currently scrolled to
    if (this.shouldScrollBottom) {
      var node = this.refs.messages
      node.scrollTop = node.scrollHeight
    }
  }

  //changes state of the message as user types
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //starts the Chain Of Message Updating(tm) on submit
  handleSubmit = (e) => {
    e.preventDefault()
    //sets the timestamp for the exact time that the submit occurred
    //will set it to 'us-EN' by default because that's where I am currently
    //you're not my dad
    let timestamp = new Date(Date.now())
    if(this.state.message !== "" && this.state.message !== " ") {
      addMessage({
        message: this.state.message,
        roomname: this.props.match.params.roomname,
        timestamp: timestamp.toLocaleTimeString('us-EN')
      })
    } else {
      addMessage({
        message: '*tries to send a blank message, lol*',
        roomname: this.props.match.params.roomname,
        timestamp: timestamp.toLocaleTimeString('us-EN')
      })
    }
    
    //since we autofocus back on the input, change the value of message to be blank
    //saves literally hundreds of seconds in the long term
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <div id="roomContainer">
        <ChannelBar />
        <div id="roomAndFormWrap">
          {/* wrap is necessary for styling and scrolling purposes */}
          <div className="roomwrap">
            {/* the ref goes on the room itself */}
            <div id="room" ref="messages">
              {this.props.messages.map((message, i) => (
                <p key={`message ${i}`}>
                  {/* displays the username, the message, then the timestamp of the message */}
                  <span className="roomUsername">{this.props.username}</span>: {message.message} <span className="chatTime">{message.timestamp}</span>
                </p>
              ))}
            </div>
          </div>
          {/* I hate autocomplete. */}
          <form onSubmit={this.handleSubmit} autoComplete="off" id="chatForm">
              {/* the input's value matches the state's message value */}
            <input type="text" name="message" value={this.state.message} onChange={this.handleChange} id="chatInput"/>
            <button type="submit" id="chatSubmit"><i className="fa fa-chevron-right"></i></button>
          </form>
        </div>
      </div>
        
    )
  }
}

function mapStateToProps(appState, ownProps) {
  const roomname = ownProps.match.params.roomname
  return {
    messages: appState.chatReducer.messages.filter(message => message.roomname === roomname),
    username: appState.chatReducer.username,
    history: ownProps.history
  }
}

export default connect(mapStateToProps)(Chat)