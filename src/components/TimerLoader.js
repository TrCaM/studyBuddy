import React, { Component } from 'react';
import * as Progress from 'react-native-progress';
import { View } from 'native-base';


export default class TimerLoader extends Component {
  render() {
    return (
      <View>
        <Progress.Bar 
          progress = {0.8} 
          width = { 250} 
        />
      </View>
    );
  };
};