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

export default class ResultScreen extends Component {
  constructor(props) {
    super(props);

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

    this.state = {};
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
    const {hours, mins, secs} = this.state;
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
                  <Donut percentage={this.result.quality} />
                  <View style={{position: 'absolute'}}>
                    <Text
                      style={{
                        fontSize: 35,
                        fontWeight: 'bold',
                        paddingVertical: 55,
                        paddingHorizontal: 50,
                      }}>
                      {this.result.quality}%
                    </Text>
                  </View>
                </View>
              </CardItem>
            </Card>
            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Start Time:</Text>
                <Text style={styles.text}>{this.result.startTime}</Text>
              </CardItem>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>End Time:</Text>
                <Text style={styles.text}>{this.result.endTime}</Text>
              </CardItem>
            </Card>

            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Number of Periods:</Text>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>{this.result.periods}</Text>
                </View>
              </CardItem>
            </Card>

            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Pause Interval:</Text>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>
                    {this.minutesToHours(this.result.pauseInterval)}
                  </Text>
                </View>
              </CardItem>
            </Card>

            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Studying Interval:</Text>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>
                    {this.minutesToHours(this.result.studyingInterval)}
                  </Text>
                </View>
              </CardItem>
            </Card>

            <Card>
              <CardItem
                style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                <Text style={styles.resultTitleText}>Rest Interval:</Text>
                <View style={{alignSelf: 'center'}}>
                  <Text style={{fontSize: 20}}>
                    {this.minutesToHours(this.result.restInterval)}
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
