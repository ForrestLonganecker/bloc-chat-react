import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/RoomList';
import MessageList from './components/MessageList/MessageList';
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
      activeRoom: ''
    };
  }

  render() {
    return (
      <div className="App">
        <section className="chat-room-bar">
          <RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}

          />
          <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
          />
        </section>
      </div>
    );
  }
}

export default App;
