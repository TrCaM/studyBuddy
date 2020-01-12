import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LoginScreen from './screens/LoginScreen.js';
import HomeNavigator from './screens/HomeScreen/HomeNavigator';
import CaptureScreen from './screens/HomeScreen/CaptureScreen';
import ResultScreen from './screens/HomeScreen/ResultScreen';
import TimerScreen from './screens/HomeScreen/TimerScreen';

const MainNavigator = createSwitchNavigator({
  Login: {screen: LoginScreen},
  Home: {screen: HomeNavigator},
  Camera: {screen: CaptureScreen},
  Result: {screen: ResultScreen},
  // Timer: {screen: TimerScreen},
});

export default createAppContainer(MainNavigator);
