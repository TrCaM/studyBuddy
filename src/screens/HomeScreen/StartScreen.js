import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';

// import { Container, Text } from 'native-base';
import * as Animatable from 'react-native-animatable';

const StartScreen = props => {
  const playOnPress = () => props.navigation.navigate('Camera');
  return (
    <View style={styles.container}>
      <ImageBackground style={{
        flex: 1,
        width: '100%',
        height: '150%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
      }} source={require('../../assets/bg3.jpg')} >
        <Text style={{paddingTop: 80, flex: 1, fontSize: 30, fontWeight: 'bold' }}>
          Press To Start Timer
      </Text>
        <Animatable.View
          //   duration='1000'
          style={{ flex: 3 }}
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 80,
    alignItems: 'center',
  },
  imageStyle: {
    width: 250,
    height: 250,
  },
});

export default StartScreen;
