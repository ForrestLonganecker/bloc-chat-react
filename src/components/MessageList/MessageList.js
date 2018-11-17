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
                    <secion className='message-details' key={index} >
                        <div className='message-username'>{this.state.message.username}</div>
                        <div className='message-content'>{this.state.message.content}</div>
                        <div className='message-sent-at'>{this.state.message.sentAt}</div>
                    </secion>
                    )
                }
            </section>
        );
    }
}

export default MessageList;