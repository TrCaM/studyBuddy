import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

// import { Container, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';

const StartScreen = props => {
  const playOnPress = () => console.log('PLAY button is press');
  return (
    <View style={styles.container}>
      <Animatable.View
        //   duration='1000'
        animation="bounceIn"
        iterationCount={'infinite'}
        direction="alternate">
        <TouchableOpacity onPress={playOnPress}>
          <Image
            source={require('../../assets/Play.png')}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 200,
    alignItems: 'center',
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
});

export default StartScreen;
