import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import StartScreen from './StartScreen';
import TimerScreen from './TimerScreen';
import CaptureScreen from './CaptureScreen';
import AccountScreen from './AccountScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Start: StartScreen,
    Timer: TimerScreen,
    Camera: CaptureScreen,
    Account: AccountScreen
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const HomeNavigator = createAppContainer(TabNavigator);

export default HomeNavigator;
