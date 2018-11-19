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
                roomId: "",
            }
        };

        this.activeMessages = this.props.activeRoom.messages;
        this.messagesRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) })
        });
    }


    render() {
        return (
            <section className='message-list-area'>
                {
                    this.state.messages.map( (message, index) => 
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