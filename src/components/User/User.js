import React, { Component } from 'react';
import './User.css';

class User extends Component {

    handleSignInClick() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOutClick() {
        this.props.firebase.auth().signOut();
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }

    displayUserName() {
        if(this.props.user) {
            return this.props.user.displayName;
        } {
            return 'Guest';
        }
    }

    render() {
        return (
            <div className='log-in-box'>
                <section className='sign-in-out'>
                    <button className='sign-in-button' type='button' onClick={ () => this.handleSignInClick() } >Sign in</button>
                    <button className='sign-out-button' type='button' onClick={ () => this.handleSignOutClick() } >Sign Out</button>
                </section>
                <h4 className='display-name'>{this.displayUserName()}</h4>
            </div>
        );
    }
}

export default User;