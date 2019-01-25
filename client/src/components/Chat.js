import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/chat'
import '../styles/chatRoom.css'

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
    addMessage({
      message: this.state.message,
      roomname: this.props.match.params.roomname
    })
    //since we autofocus back on the input, change the value of message to be blank
    //saves literally hundreds of seconds in the long term
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <div id="roomContainer">
        {/* wrap is necessary for styling and scrolling purposes */}
        <div className="roomwrap">
          {/* the ref goes on the room itself */}
          <div id="room" ref="messages">
            {this.props.messages.map((message, i) => (
              <p key={`message ${i}`}>
                <span className="roomUsername">{this.props.username}</span>: {message.message}
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