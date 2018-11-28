import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMessage: {
                content: "",
            },
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

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newMessage) {return}
        const message = this.state.newMessage;
        this.setState({ messages: [...this.state.messages, message] });
        this.messagesRef.push( message );
        this.setState({ newMessage: {content: ''} });
    }

    convertTimestamp(inputTime) {
        let d = new Date(inputTime);
        let hour = d.getHours();
        let minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        let second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
        let ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        hour = hour ? hour : 12;
        let outputTime = hour + ':' + minute + ':' + second + ' ' + ampm;
        return outputTime;

    }

    handleChange(e) {
        this.setState({ newMessage: {content: e.target.value, roomId: this.props.activeRoom.key, username: this.props.user.displayName, sentAt: this.props.firebase.database.ServerValue.TIMESTAMP } });
    }

    handleDisplay() {

    }

render() {
        if (this.props.user) {
            return (
                <section className='message-area'>
                    <section className='message-list-area'>
                        {
                            this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map( (message, index) => 
                            <section className='message-details' key={index} >
                                <div className='message-username'>{message.username}</div>
                                <div className='message-content'>{message.content}</div>
                                <div className='message-sent-at'>{this.convertTimestamp(message.sentAt)}</div>
                            </section>
                            )
                        }
                    </section>
                    <section className='new-message-field'>
                        <form className='new-message-form' onSubmit={ (e) => this.handleSubmit(e)}>
                            <h3>Create new message</h3>
                            <input className='new-message-text-area' type='text-area' value={this.state.newMessage.content} onChange={ (e) => this.handleChange(e)}/>
                            <input className='new-message-button' type='submit' />
                        </form> 
                    </section>
                </section>
        );
        } else {
            return (
                <section className='message-area'>
                    <section className='message-list-area'>
                    {
                        this.state.messages.filter(message => message.roomId === this.props.activeRoom.key).map( (message, index) => 
                        <section className='message-details' key={index} >
                            <div className='message-username'>{message.username}</div>
                            <div className='message-content'>{message.content}</div>
                            <div className='message-sent-at'>{this.convertTimestamp(message.sentAt)}</div>
                        </section>
                        )
                    }
                    </section>
                </section>
            )
        }
    }
}

export default MessageList;