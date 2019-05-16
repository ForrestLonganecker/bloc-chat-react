import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/RoomList';
import MessageList from './components/MessageList/MessageList';
import User from './components/User/User';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAix9IqYEhOqbgrrZd-b3PUGj1O60mRR34",
  authDomain: "bloc-chat-27788.firebaseapp.com",
  databaseURL: "https://bloc-chat-27788.firebaseio.com",
  projectId: "bloc-chat-27788",
  storageBucket: "bloc-chat-27788.appspot.com",
  messagingSenderId: "887882509838"
};
firebase.initializeApp(config);

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state= {
      activeRoom: {
        key: '1',
        name: 'Welcome'
      },
      user: {
        displayName: ''
      }
    };
  }

  selectActiveRoom(e) {
    this.setState({ activeRoom: e });
    console.log(this.state.activeRoom);
  }

  setUser(e) {
    this.setState({ user: e });
    //console.log(this.state.user);
  }

  render() {
    return (
      <div className='App'>
        <div className='top-bar'>
          <div className='Logo'>
            <header>Bloc Toc</header>
          </div>
          <section className='log-in-field'>
            <User
              firebase={firebase}
              setUser={(e) => this.setUser(e)}
              user={this.state.user}
            />
          </section>
        </div>
        <section className='chat-area'>
          <section className='chat-rooms'>
            <RoomList
              firebase={firebase}
              selectActiveRoom={(e) => this.selectActiveRoom(e)}
              activeRoom={this.state.activeRoom}
              user={this.state.user}
            />
          </section>
          
          <section className='chat-messages'>
            <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              activeRoomName={this.state.activeRoom.name}
              user={this.state.user}
            />
          </section>
        </section>
      </div>
    );
  }
}

export default App;
