import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import LoginScreen from './screens/LoginScreen.js';
import HomeNavigator from './screens/HomeScreen/HomeNavigator';

const MainNavigator = createSwitchNavigator({
  Login: {screen: LoginScreen},
  Home: {screen: HomeNavigator},
});

export default createAppContainer(MainNavigator);
