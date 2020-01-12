import React, {Component} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {
  Container,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Content,
} from 'native-base';
// import LottieView from 'lottie-react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Donut from '../../components/Donut';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from "moment";

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);
    this.refId = props.navigation.getParam('refId');

    //set time length here
    this.result = {
      user: '/user/ele346347347',
      studySession: 120,
      startTime: '6:00:00 PM',
      endTime: '7:00:00 PM',
      pauseInterval: 1605,
      periods: '4',
      quality: '30',
      success: false,
      studyingInterval: 25,
      restInterval: 5,
    };

    // const { restInterval, studyInterval, periods } = this.settings;

    this.state = {
      loaded: false,
    };
  }

  async componentDidMount() {
    try {
      const dataRef = await firestore().collection('sessions').doc(this.refId).get();
      const data = dataRef.data();
      this.setState({
        loaded: true,
        ...data,
        startTime: new firestore.Timestamp(data.startTime.seconds, data.startTime.nanoseconds).toDate(),
        stopTime: new firestore.Timestamp(data.stopTime.seconds, data.stopTime.nanoseconds).toDate()
      })
      // console.log(documentRef.data());
    } catch(e) {
      console.log(e);
    }
  }

  minutesToHours(min) {
    let h = Math.floor(min / 60);
    let m = min - h * 60;
    if (h <= 0) {
      return m + ' minutes';
    } else {
      return h + ' hours ' + m + ' minutes';
    }
  }
  ////////////////////////////////// UI /////////////////////////////////////////////
  render() {
    // const {hours, mins, secs} = this.state;
    // console.log("here: " + this.state.startTime);
    if (this.state.loaded) {
      const duration = moment.duration(this.state.stopTime.getTime() - this.state.startTime.getTime());
      const badDuration = moment.duration(this.state.badPostureTime);
      return (
      <Container style={styles.bigContainer}>
        {/* <Container style={styles.container1}>
          <LottieView
            style={styles.animation}
            source={require('../../../src/assets/lottieJSON/failed.json')}
            autoPlay
            loop
          />
          <Text style={styles.result}>You Failed</Text>
        </Container> */}
        <Container style={styles.container2}>
          <ScrollView>
            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Quality:</Text>
                <View style={{alignSelf: 'center', flexDirection: 'column'}}>
                  <Donut size={150} percentage={this.state.quality} />
                  <View style={{position: 'absolute'}}>
                    <Text
                      style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        paddingVertical: 55,
                        paddingHorizontal: 43,
                      }}>
                      {Math.round(this.state.quality)}%
                    </Text>
                  </View>
                </View>
              </CardItem>
            </Card>
            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Start Time:</Text>
                <Text style={styles.text}>
                  {moment(this.state.startTime).calendar()}
                </Text>
              </CardItem>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>End Time:</Text>
                <Text style={styles.text}>
                  {moment(this.state.stopTime).calendar()}
                </Text>
              </CardItem>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Focus Duration</Text>
                <Text style={styles.text}>{`${duration.hours()} hours ${duration.minutes()} minutes ${duration.asSeconds()} seconds`}</Text>
              </CardItem>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Distract And Out of Posture Estimation</Text>
                <Text style={styles.text}>{`${badDuration.hours()} hours ${badDuration.minutes()} minutes ${badDuration.asSeconds()} seconds`}</Text>
              </CardItem>
            </Card>

            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Number of Periods:</Text>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>{this.state.periods}</Text>
                </View>
              </CardItem>
            </Card>

            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Rest Interval:</Text>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>
                    {this.minutesToHours(this.state.restInterval)}
                  </Text>
                </View>
              </CardItem>
            </Card>

            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Study Interval:</Text>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>
                    {this.minutesToHours(this.state.studyInterval)}
                  </Text>
                </View>
              </CardItem>
            </Card>
          </ScrollView>
        </Container>
        <View style={styles.buttonStyle}>
          <Button
            primary
            small
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text> Back to Home </Text>
          </Button>
        </View>
      </Container>
    );
      }
    return null;
  }
}

const styles = StyleSheet.create({
  bigContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonStyle: {
    // paddingTop: 50,
    height: 50,
    alignItems: 'center',
    alignContent: 'center',
  },

  container1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container2: {
    padding: 10,
    flex: 3,
    flexDirection: 'column',
    alignContent: 'center',
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
  },
});
