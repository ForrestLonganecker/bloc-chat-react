import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rooms: [],
            newRoomName: '',
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

    handleNewRoomNameChange(e) {
        this.setState({ newRoomName: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.newRoomName) { return }
        const newRoom = this.state.newRoomName;
        this.setState({ rooms: [...this.state.rooms, newRoom], newRoomName: ''});
        this.roomsRef.push({ name:newRoom });
    }

    /*
    moved to App.js
    selectActiveRoom(e) {
        this.setState({ activeRoom: e });
        console.log(this.state.activeRoom);
    }
    */

    render() {
        return (
            <section className='room-list'>
                <section className='creator-container'>
                    <form className='room-creator-form' onSubmit={ (e) => this.handleSubmit(e) }>
                        <h3>Create new room</h3>
                        <input className='new-room-name' type='text' value={this.state.newRoomName} onChange={ (e) => this.handleNewRoomNameChange(e) } />
                        <input className='new-room-button' type='submit' />
                    </form>
                </section>
                {
                    this.state.rooms.map( (room, index) =>
                    <section className='room-details' key={index} >
                        <button className='select-active-room' onClick={ (e) => this.props.selectActiveRoom(room) }>
                            <div>{room.name}</div>
                        </button>
                    </section>
                    )
                }

            </section>

        );
    }
}

export default RoomList;