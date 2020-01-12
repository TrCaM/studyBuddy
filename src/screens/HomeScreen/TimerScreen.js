import React from 'react';
import { Container, Text } from 'native-base';
import Timer from '../../../src/components/Timer';  
import SettingScreen from './SettingScreen';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const TimerScreen = props => {
  const [settings, setSettings] = React.useState({});
  const [load, setLoad] = React.useState(false);
  React.useEffect(() => {
    const func = async () => {
    const user = auth().currentUser;
    const userData = await firestore()
      .collection('users')
      .doc(user.uid)
      .get();
    setSettings(userData.data().settings);
    setLoad(true);
    };
    func();
  }, []);

  const timer = (<Timer
      badPostureTime={props.badPostureTime}
      startTime={props.startTime}
      onPause = {props.onPause}
      onResume = {props.onResume}
      settings={settings}
      gotoResult={() => props.navigation.navigate('Result')}
  />);

  return load ? timer : null;
};

export default TimerScreen;