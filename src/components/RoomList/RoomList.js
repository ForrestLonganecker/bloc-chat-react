import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            rooms: [],
            newRoomName: '',
            activeRoom: ''
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

    createRoom() {
        const newRoomName= this.state.newRoomName;
        this.roomsRef.push({
            name:newRoomName
        });
    }

    selectActiveRoom(e) {
        this.setState({ activeRoom: e.target.value.index});
        console.log(this.state.activeRoom);
    }

    render() {
        return (
            <section className='room-list'>
                <section className='creator-container'>
                    <form className='room-creator-form' onSubmit={ (e) => this.createRoom(e) }>
                        <h3>Create new room</h3>
                        <input className='new-room-name' type='text' value={this.state.newRoomName} onChange={ (e) => this.handleNewRoomNameChange(e) } />
                        <input className='new-room-button' type='submit' />
                    </form>
                </section>
                {
                    this.state.rooms.map( (room, index) =>
                    <section className='room-details' key={index} >
                        <div>{room.name}</div>
                        <div>Room: {index + 1}</div>
                        <button className='select-active-room' type='button' onClick={ (e) => this.selectActiveRoom(e) } />
                    </section>
                    )
                }

            </section>

        );
    }
}

export default RoomList;