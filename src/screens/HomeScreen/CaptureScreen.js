import React from 'react';
// import { Container, Text } from 'native-base';
import {RNCamera} from 'react-native-camera';
import {Text, View, StyleSheet} from 'react-native';

const CaptureScreen = props => {
  return (
    <View style={styles.container}>
      <Text>Face detector</Text>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={face => {
          console.log(JSON.stringify(face));
          //
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
  },
});

export default CaptureScreen;
