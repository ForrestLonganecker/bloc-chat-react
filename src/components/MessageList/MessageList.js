import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: {
                username: "",
                content: "",
                sentAt: "",
                roomId: ""
            },
            activeMessages: []
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        //this.activeMessages = this.state.messages.filter(message => message.roomId === this.props.activeRoom.key);
        console.log(this.activeMessages)
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
        this.setState({ activeMessages: this.state.messages.filter( message => message.roomId === this.props.activeRoom.key ) });
        console.log(this.state.activeMessages);
    }


    render() {
        return (
            <section className='message-list-area'>
                {
                    this.state.activeMessages.map( (message, index) => 
                    <section className='message-details' key={index} >
                        <div className='message-username'>{message.username}</div>
                        <div className='message-content'>{message.content}</div>
                        <div className='message-sent-at'>{message.sentAt}</div>
                    </section>
                    )
                }
            </section>
        );
    }
}

export default MessageList;