import React from 'react';
import { Text, Alert } from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

import { firebase } from '@react-native-firebase/auth';

export default class GoogleSignIn extends React.Component {

  constructor(props) {
    super(props);
    this.onSuccess = props.onSuccess;
    this.onFailed = props.onFailed;
  }

  componentDidMount() {
    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/contacts.readonly'],
        webClientId: '887648564013-g4tq04ur65s209eab8g2ang3ijb1ktal.apps.googleusercontent.com', // required
        offlineAccess: true,
    });
  }

  // Somewhere in your code
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken, accessToken } = await GoogleSignin.getTokens();
      const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
      const userData = await firebase.auth().signInWithCredential(credential);
      this.onSuccess(userData);
    } catch (error) {
      this.onFailed(error);
    }
  };

  // _syncUserWithStateAsync = async () => {
  //   const user = await GoogleSignIn.signInSilentlyAsync();
  //   this.setState({ user });
  // };

  // signOutAsync = async () => {
  //   await GoogleSignIn.signOutAsync();
  //   this.setState({ user: null });
  // };

  // signInAsync = async () => {
  //   try {
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     const { type, user } = await GoogleSignIn.signInAsync();
  //     if (type === 'success') {
  //       this._syncUserWithStateAsync();
  //     }
  //   } catch ({ message }) {
  //     alert('login: Error:' + message);
  //   }
  // };

  render() {
    return (
      <GoogleSigninButton
          style={{ width: 200, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this.signIn}/>
    );
  }
}