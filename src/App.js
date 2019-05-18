import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList/RoomList';
import MessageList from './components/MessageList/MessageList';
import User from './components/User/User';
import Header from './components/Header/Header';
import * as firebase from 'firebase';

import logIn from './assets/images/agreement-2548138_1920.jpg';

var config = {
  apiKey: 'AIzaSyAix9IqYEhOqbgrrZd-b3PUGj1O60mRR34',
  authDomain: 'bloc-chat-27788.firebaseapp.com',
  databaseURL: 'https://bloc-chat-27788.firebaseio.com',
  projectId: 'bloc-chat-27788',
  storageBucket: 'bloc-chat-27788.appspot.com',
  messagingSenderId: '887882509838',
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {
        key: '1',
        name: 'Welcome',
      },
      user: {
        displayName: '',
      },
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

  displayUserName() {
    if(this.state.user){
      return this.state.user.displayName;
    } else {
      return 'Log in/ Sign up to start Chatting!'
    }
  }

  displayContent() {
    if(this.state.user){
      return(
        <section className="chat-area">
          <section className="chat-rooms">
            <RoomList
              firebase={firebase}
              selectActiveRoom={e => this.selectActiveRoom(e)}
              activeRoom={this.state.activeRoom}
              user={this.state.user}
            />
          </section>

          <section className="chat-messages">
            <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              activeRoomName={this.state.activeRoom.name}
              user={this.state.user}
            />
          </section>
        </section>
      )
    } else {
      return (
        <img src={logIn} alt="Log-in image" />
      )
    }
  }


  render() {
    return (
      <div className="App">
        <div className="top-bar">
          <div className="Logo">
            <Header />
          </div>
          <div className="user-name">
            {this.displayUserName()}
          </div>
          <div className="log-in-field">
            <User
              firebase={firebase}
              setUser={e => this.setUser(e)}
              user={this.state.user}
            />
          </div>
        </div>
        <section className="chat-area">
        <section className="chat-rooms">
          <RoomList
            firebase={firebase}
            selectActiveRoom={e => this.selectActiveRoom(e)}
            activeRoom={this.state.activeRoom}
            user={this.state.user}
          />
        </section>

        <section className="chat-messages">
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


