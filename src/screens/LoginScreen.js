import React, {useState} from 'react';
import {View, Image, StyleSheet, ImageBackground} from 'react-native';

import {
  Text,
  Button,
  Item,
  Input,
  Form,
  Toast,
  Header,
  Body,
  Title,
} from 'native-base';
import GoogleSignIn from '../components/GoogleSignIn';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as Animatable from 'react-native-animatable';

// import auth from '@react-native-firebase/auth';

// TODO: disable buttons when email and password is empty/incorrect format
// TODO: Spinner when it's loading
// TODO: Our own icon for the app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 2,
    resizeMode: 'contain',
  },
  loginForm: {
    flex: 2,
    width: 200,
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
  },
});

const DEFAULT_SETTINGS = {
  periods: 2,
  studyInterval: 25,
  restInterval: 5,
  maxPauseInterval: 10,
};

const LoginScreen = props => {
  const [email, setEmail] = useState('qhienlee@gmail.com');
  const [password, setPassword] = useState('banana');

  const loadDefaultSettings = async () => {
    try {
      this.user = auth().currentUser;
      const userData = await firestore()
        .collection('users')
        .doc(this.user.uid)
        .get();
      if (!userData.exists) {
        console.log(userData);
        await firestore()
          .collection('users')
          .doc(this.user.uid)
          .set({settings: DEFAULT_SETTINGS});
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const goToHome = async userData => {
    console.log(userData);
    await loadDefaultSettings();
    props.navigation.navigate('Home', {
      message: 'message from screen 1',
    });
  };

  const register = async () => {
    try {
      Toast.show({
        text: 'Signing up...',
      });
      await auth().createUserWithEmailAndPassword(email, password);
      Toast.show({
        text: 'Your account was created',
        textStyle: {color: 'green'},
        buttonText: 'close',
        duration: 3000,
      });
    } catch (e) {
      console.log(e);
      onFailed(e);
    }
  };

  const signIn = async () => {
    try {
      Toast.show({
        text: 'Signing in...',
      });
      const userData = await auth().signInWithEmailAndPassword(email, password);
      Toast.hide();
      goToHome(userData);
    } catch (e) {
      onFailed(e);
    }
  };

  const onFailed = e =>
    Toast.show({
      text: `Failed to log in: ${e.message}`,
      textStyle: {color: 'red'},
      buttonText: 'close',
      duration: 3000,
    });

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.7,
        }}
        source={require('../assets/resultBG.jpg')}>
        <Image
          style={styles.logo}
          source={require('../assets/StudyBuddyLogo.png')}
        />
        <Form style={styles.loginForm}>
          <Item>
            <Input
              placeholder="Email"
              onChangeText={email => setEmail(email)}
            />
          </Item>
          <Item last>
            <Input
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={password => setPassword(password)}
            />
          </Item>
          <Animatable.View animation="slideInLeft" iterationCount={1}>
            <Button style={styles.button} dark onPress={signIn}>
              <Text>Login</Text>
            </Button>
          </Animatable.View>
          <Animatable.View animation="slideInRight" iterationCount={1}>
            <Button style={styles.button} dark onPress={register}>
              <Text>Sign up</Text>
            </Button>
          </Animatable.View>
          <Animatable.View animation="slideInDown" iterationCount={1}>
            <GoogleSignIn onSuccess={goToHome} onFailed={onFailed} />
          </Animatable.View>
        </Form>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
