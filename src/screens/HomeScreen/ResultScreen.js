import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Text, Button, Card, CardItem, Body, Content } from 'native-base';
import LottieView from 'lottie-react-native';



export default class ResultScreen extends Component {

  constructor(props) {
    super(props);

    //set time length here
    this.result = {
      user: '/user/ele346347347',
      startTime: 'January 11, 2020 at 6:00:00 PM UTC-5',
      endTime: 'January 11, 2020 at 7:00:00 PM UTC-5',
      pauseInterval: '1605',
      periods: '4',
      quality: '30',
      success: false,
    }

    // const { restInterval, studyInterval, periods } = this.settings;

    this.state = {
    }
  };

  buttonPauseStyleChange(){
  }
////////////////////////////////// UI /////////////////////////////////////////////
  render() {
    const { hours, mins, secs } = this.state
    return (
    <Container style={styles.bigContainer}>
      <Container style={styles.container1}>
        <LottieView style={styles.animation} source={require('../../../src/assets/lottieJSON/failed.json')} autoPlay loop />
        <Text style={styles.result}>You Failed</Text>
      </Container>
      <Container style={styles.container2}>
        <Card>
          <CardItem style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <View>
              <Text style={styles.resultTitleText}>
                Quality: 
              </Text>
            </View>
            <View style={{alignSelf:'center'}}>
              <Text style={{fontSize:40}}>
                {this.result.quality}%
              </Text>
            </View>
          </CardItem>
        </Card>
        <Card>
          <CardItem style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <Text style={styles.resultTitleText}>
              Start Time: 
            </Text>
            <Text style={styles.text}>
              {this.result.startTime}
            </Text>
            <Text style={styles.resultTitleText}>
              End Time: 
            </Text>
            <Text style={styles.text}>
              {this.result.endTime}
            </Text>
          </CardItem>
        </Card>

        <Card>
          <CardItem style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <Text style={styles.resultTitleText}>
              Time: 
            </Text>
            <Text style={styles.text}>
              {this.result.startTime}
            </Text>
          </CardItem>
        </Card>
      </Container>
    </Container>
    );
  };
};

const styles = StyleSheet.create({
  bigContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  container1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container2: {
    padding: 10,
    flex: 2,
    flexDirection: 'column',
    alignContent: 'center'
  },
  
  animation: {
    height: 100,
  },

  result: {
    fontSize: 40,
  },
  
  text: {
    fontSize: 17,
  },

  resultTitleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EF767A',
  }
});
