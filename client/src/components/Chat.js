import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage, setCurrent } from '../actions/chat'
import '../styles/chatRoom.css'
//ChannelBar is the bar on the left side containing channels joined and the form to add channels
import ChannelBar from './ChannelBar'

class Chat extends Component {
  state = {
    message: '',
    bold: '',
    italic: '',
    underline: '',
    color: '#000000'
  }

  componentDidMount() {
    if(!this.props.username) {
      this.props.history.push("/")
    }
    setCurrent(this.props.match.params.roomname)
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

  //changes bold, italic, or underline
  //if it has it already, remove it, otherwise, add it
  changeBold = (e) => {
    e.preventDefault()
    if(this.state.bold === 'bold') {
      this.setState({
        bold: ''
      })
    } else {
      this.setState({
        bold: 'bold'
      })
    }
  }

  changeItalic = (e) => {
    e.preventDefault()
    if(this.state.italic === 'italic') {
      this.setState({
        italic: ''
      })
    } else {
      this.setState({
        italic: 'italic'
      })
    }
  }

  changeUnderline = (e) => {
    e.preventDefault()
    if(this.state.underline === 'underline') {
      this.setState({
        underline: ''
      })
    } else {
      this.setState({
        underline: 'underline'
      })
    }
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
        timestamp: timestamp.toLocaleTimeString('us-EN'),
        bold: this.state.bold,
        italic: this.state.italic,
        underline: this.state.underline,
        color: this.state.color
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
      message: '',
      bold: '',
      italic: '',
      underline: ''
    })
  }

  render() {
    return (
      <div id="roomContainer">
        <ChannelBar />
        <div id="roomAndFormWrap">
          <div id="nameWrap">
            <span id="roomName">
              (#{this.props.match.params.roomname})
            </span>
          </div>
          {/* wrap is necessary for styling and scrolling purposes */}
          <div className="roomwrap">
            {/* the ref goes on the room itself */}
            <div id="room" ref="messages">
              {this.props.messages.map((message, i) => (
                <p key={`message ${i}`}>
                  {/* displays the username, the message, then the timestamp of the message */}
                  <span className="roomUsername">{this.props.username}: </span> 
                  {/* if the message has bold, italic, or underline, add the relevant class */}
                  <span className={`${message.bold === 'bold' ? message.bold : undefined} 
                  ${message.italic === 'italic' ? message.italic : undefined}
                  ${message.underline === 'underline' ? message.underline : undefined}`}
                  style = {{color: message.color}}>
                    {message.message}
                  </span> 
                  <span className="chatTime"> {message.timestamp}</span>
                </p>
              ))}
            </div>
          </div>
          {/* buttons to add bold, italic, and underline
          does not have fine-tuned control yet */}
          <button onClick={this.changeBold} className="styleButton"><i className="fa fa-bold"></i></button>
          <button onClick={this.changeItalic} className="styleButton"><i className="fa fa-italic"></i></button>
          <button onClick={this.changeUnderline} className="styleButton"><i className="fa fa-underline"></i></button>
          <input type="color" onChange={this.handleChange} value={this.state.color} id="colorInput" name="color" />
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