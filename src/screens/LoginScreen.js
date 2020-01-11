import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet } from 'react-native';

import {Text, Button, Item, Input, Form, Toast} from 'native-base';
import GoogleSignIn from '../components/GoogleSignIn';

import auth from '@react-native-firebase/auth';

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

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goToHome = userData => {
    console.log(userData);
    props.navigation.navigate('Home', {
      message: 'message from screen 1',
    });
  };

  const register = async () => {
    try {
      Toast.show({
        text: 'Signing up...',
      });;
      await auth().createUserWithEmailAndPassword(email, password);
      Toast.show({
        text: 'Your account was created',
        textStyle: {color: 'green'},
        buttonText: 'close',
        duration: 3000,
      });;
    } catch (e) {
      console.log(e);
      onFailed(e);
    }
  };

  const signIn = async () => {
    try {
      Toast.show({
        text: 'Signing in...',
      });;
      const userData =  await auth().signInWithEmailAndPassword(email, password);
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
      <Image style={styles.logo} source={require('../assets/Android.png')} />
      <Form style={styles.loginForm}>
        <Item>
          <Input placeholder="Email" onChangeText={email => setEmail(email)} />
        </Item>
        <Item last>
          <Input
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => setPassword(password)}
          />
        </Item>
        <Button style={styles.button} dark onPress={signIn}>
          <Text>Login</Text>
        </Button>
        <Button style={styles.button} dark onPress={register}>
          <Text>Sign up</Text>
        </Button>
        <GoogleSignIn onSuccess={goToHome} onFailed={onFailed} />
      </Form>
    </View>
  );
};

export default LoginScreen;
