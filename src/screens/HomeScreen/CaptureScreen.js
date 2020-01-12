import React from 'react';
// import { Container, Text } from 'native-base';
import {Overlay} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import {Text, View, StyleSheet, Button, Vibration} from 'react-native';
import Sound from 'react-native-sound';
import TimerScreen from './TimerScreen';

import {Toast} from 'native-base';
import Svg, {Line, Rect} from 'react-native-svg';

const VIBRATION_DURATION = 1000;

const CaptureScreen = props => {
  const [detected, setDetected] = React.useState(false);
  const [frameData, setFrame] = React.useState({});
  const [lowLine, setLowLine] = React.useState(0);
  const [isStart, setStart] = React.useState(false);
  const [sideLineLeft, setSideLineLeft] = React.useState(0);
  const [sideLineRight, setSideLineRight] = React.useState(0);
  const [lockFrame, setLockFrame] = React.useState(false);
  const [badPosture, setBadPosture] = React.useState(false);
  const [currentPostureBad, setCurrentPosture] = React.useState(false);
  const [postureChangeTime, setPostureChangeTime] = React.useState(null);
  const [alertSound, setAlertSound] = React.useState(null);
  const [successSound, setSuccessSound] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [showStart, setShowStart] = React.useState(true);

  React.useEffect(() => {
    Sound.setCategory('Playback');
    setAlertSound(new Sound('alert.mp3', Sound.MAIN_BUNDLE));
    setSuccessSound(new Sound('success.mp3', Sound.MAIN_BUNDLE));
  }, []);

  const onFacesDetected = face => {
    if (!lockFrame && face.faces.length) {
      setDetected(true);
      const faceData = face.faces[0].bounds;
      setFrame({
        x: faceData.origin.x - 30,
        y: faceData.origin.y,
        height: faceData.size.height,
        width: faceData.size.width,
      });
      setLowLine(frameData.y + frameData.height * 0.22);
      setSideLineLeft(frameData.x - frameData.width * 0.4);
      setSideLineRight(frameData.x + frameData.width + frameData.width * 0.4);
      // console.log(JSON.stringify(face.faces[0].bounds));
    } else if (!lockFrame && detected && !face.faces.length) {
      setDetected(false);
    } else if (lockFrame) {
      const faceData = face.faces[0] && face.faces[0].bounds;
      if (faceData) {
        setFrame({
          x: faceData.origin.x - 30,
          y: faceData.origin.y,
          height: faceData.size.height,
          width: faceData.size.width,
        });
      }
      setBadPosture(checkPosture());
    }
  };
  const frame = (
    <Svg height="100%" width="100%">
      <Rect
        x={frameData.x || 0}
        y={frameData.y || 0}
        width={frameData.width || 0}
        height={frameData.height || 0}
        stroke="red"
        strokeWidth="2"
        fill="transparent"
      />
      <Line
        x1="0"
        y1={lowLine || 0}
        x2="100"
        y2={lowLine || 0}
        stroke="red"
        strokeWidth="2"
      />
      <Line
        x1={sideLineLeft || 0}
        y1={frameData.y || 0}
        x2={sideLineLeft || 0}
        y2={frameData.y + frameData.height || 0}
        stroke="red"
        strokeWidth="2"
      />
      <Line
        x1={sideLineRight || 0}
        y1={frameData.y || 0}
        x2={sideLineRight || 0}
        y2={frameData.y + frameData.height || 0}
        stroke="red"
        strokeWidth="2"
      />
    </Svg>
  );

  const startTracking = () => {
    setLockFrame(!lockFrame);
  };

  const checkPosture = () => {
    const bad =
      frameData.y > lowLine ||
      frameData.x + frameData.width * 0.2 < sideLineLeft ||
      frameData.x + frameData.width * 0.8 > sideLineRight;
    let result = badPosture;
    setCurrentPosture(bad);
    if (currentPostureBad != bad) {
      setPostureChangeTime(new Date().getTime());
    } else if (currentPostureBad != badPosture) {
      const delay = new Date().getTime() - postureChangeTime;
      result = (delay > (badPosture ? 2000 : 2001)) ^ badPosture;
      console.log(delay);
    }
    if (result != badPosture) {
      const text = !badPosture ? 'Please fix your posture' : 'Thank you!';
      Toast.show({
        text,
        textStyle: {color: !badPosture ? 'red' : 'green'},
        buttonText: 'close',
        duration: 3000,
        position: 'top',
      });
      if (!badPosture) {
        Vibration.vibrate(VIBRATION_DURATION);
        if (alertSound) alertSound.play();
      } else {
        if (successSound) successSound.play();
      }
    }
    return result;
  };

  return (
    <View style={styles.container}>
      <Overlay
        isVisible={isStart}
        overlayBackgroundColor="transparent"
        fullScreen>
        <TimerScreen
          onPause={startTracking}
          onResume={startTracking}
          navigation={props.navigation}
        />
      </Overlay>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={onFacesDetected}
        // onFacesDetected={face => {
        //   console.log(JSON.stringify(face));
        // }}
      >
        <Text style={{color: 'red'}}>
          {badPosture ? 'Bad Posture!' : 'Good Posture!'}
        </Text>
        {detected ? frame : null}
      </RNCamera>
      {showStart ? (
        <Button
          title="start"
          onPress={() => {
            startTracking();
            setStart(true);
            setStartTime(new Date());
            setShowStart(false);
          }}
        />
      ) : null}
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
