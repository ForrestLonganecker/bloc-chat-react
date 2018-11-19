import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rooms: [],
            newRoomName: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) })
        });
    }

    componentWillUnmount() {
        this.roomsRef = null;
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newRoomName) { return }

        const newRoom = this.state.newRoomName;
        this.roomsRef.push({ name:newRoom });
        this.setState({ rooms: [...this.state.rooms, newRoom], newRoomName: ''});
    }

    render() {
        return (
            <section className='room-list'>
            {
                this.state.rooms.map( (room, index) =>
                <section className='room-details' key={index} >
                    <div>{room.name}</div>
                    <div>Room: {index + 1}</div>
                </section>
                )
            }
                <section className='creator-container'>
                    <form className='room-creator-form' onSubmit={ (e) => this.handleSubmit(e) }>
                        <h3>Create new room</h3>
                        <input className='new-room-name' type='text' value={this.state.newRoomName} onChange={ (e) => this.handleChange(e) } />
                        <input className='submit-new-room' type='submit' />
                    </form>
                </section>
            </section>

        );
    }
}

export default RoomList;