import React, { Component } from 'react';
import { Alert, Text, View, StyleSheet, ScrollView, Image, FlatList, List } from 'react-native';
import moment from 'moment';
import { Card, Icon, ListItem  } from 'react-native-elements';
import { Button, Container, Input, Item, Form, Label } from 'native-base';
import TimerLoader from './TimerLoader';


export default class Timer extends Component {

  constructor(props) {
    super(props);

    //set time length here
    this.restInterval = 1
    this.studyInterval = 3
    this.roundNum = 1

    this.state = {
      eventDate: moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: this.studyInterval}),
      hours: 0,
      mins: 0,
      secs: this.studyInterval,
      status: 'Studying',
      roundLeft: this.roundNum,
    }
  };

  statusChanging() {
    if (this.state.roundLeft == 0 && this.state.status == 'Resting'){
      //  Alert.alert("Congratulations!!! You've finished your study interval!!")
    } else {
      if (this.state.status == 'Studying') {
        this.setState({
          status: 'Resting',
          secs: this.restInterval,
          eventDate: moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: this.restInterval }),
        })
        this.updateTimer()
      } else if (this.state.status == 'Resting') {
        this.setState({
          status: 'Studying',
          secs: this.studyInterval,
          eventDate: moment.duration().add({ days: 0, hours: 0, minutes: 0, seconds: this.studyInterval }),
          roundLeft: this.state.roundLeft - 1
        })
        this.updateTimer()
      }
    }
  }

  onTimeout() {
    this.statusChanging();
  }

  updateTimer = () => {

    this.x = setInterval(() => {
      let { eventDate } = this.state

      if (eventDate <= 0) {
        clearInterval(this.x);
        this.onTimeout();
      } else {
        eventDate = eventDate.subtract(1, "s")
        const hours = eventDate.hours()
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()

        this.setState({
          hours,
          mins,
          secs,
          eventDate
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.x)
  }

  componentDidMount() {
    this.updateTimer()
  }

  timeStringGenerateor(hours, mins, secs) {
    if (hours < 10) {
      hours = '0' + hours
    }
    if (mins < 10) {
      mins = '0' + mins
    }
    if (secs < 10) {
      secs = '0' + secs
    }
    return `${hours}:${mins}:${secs}`
  }


////////////////////////////////// UI /////////////////////////////////////////////
  render() {
    const { hours, mins, secs } = this.state
    return (
      <Container>
        <Text>
          Round Left: {this.state.roundLeft}
        </Text>

        <View style={styles.container}>
          <Text style={styles.timerText}>
            {this.timeStringGenerateor(hours, mins, secs)}
          </Text>
          <TimerLoader></TimerLoader>

          <Text style={styles.statusText}>
            {this.state.status}
          </Text>
        </View>

        <Form>
          <Item stackedLabel>
            <Label>Studying Time (mins):</Label>
            <Input onChangeText={studyInterval => this.setState({studyInterval})}/>
          </Item>

          <Item stackedLabel>
            <Label>Resting Time (mins):</Label>
            <Input onChangeText={restInterval => this.setState({restInterval})}/>
          </Item>

          <Item stackedLabel>
            <Label>Number of Intervals:</Label>
            <Input onChangeText={roundNum => this.setState({roundNum})}/>
          </Item>
        </Form>
        <Button large style={styles.buttonStyle}>
          <Text style={styles.buttonText}>
            ENTER
          </Text>
        </Button>
      </Container>
    );
  };
};

/////////////////////////////////// Style ////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    fontSize: 50,
  },

  statusText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  
  buttonStyle:{
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})