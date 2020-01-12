import React from 'react';
// import { Container, Text } from 'native-base';
import {View, StyleSheet, ImageBackground} from 'react-native';

import {Text, Button, Toast} from 'native-base';

import auth from '@react-native-firebase/auth';

const AccountScreen = props => {
  const logOut = async () => {
    try {
      await auth().signOut();
      Toast.show({
        text: 'You has successfully signed out!',
        textStyle: {color: 'green'},
        buttonText: 'close',
        duration: 3000,
      });
      props.navigation.navigate('Login');
    } catch (e) {
      console.log('Sign out failed!');
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={{
        flex: 1,
        width: '100%',
        height: '150%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
      }} source={require('../../assets/BG4.jpg')} >
      <Button style={styles.button} dark onPress={logOut}>
        <Text>Sign out</Text>
      </Button>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
  },
});

export default AccountScreen;
