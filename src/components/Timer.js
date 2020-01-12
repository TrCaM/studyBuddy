import React, {Component} from 'react';
import {
  Alert,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  List,
} from 'react-native';
import moment from 'moment';
import {Card, ListItem} from 'react-native-elements';
import {
  Button,
  Container,
  Input,
  Item,
  Form,
  Label,
  Content,
} from 'native-base';
import TimerLoader from './TimerLoader';
import Icon from 'react-native-vector-icons/FontAwesome';
import Donut from './Donut';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    //set time length here
    this.settings = props.settings;
    // this.restInterval = props.setting
    // this.studyInterval = 3
    // this.roundNum = 1
    const {restInterval, studyInterval, periods} = this.settings;

    this.state = {
      eventDate: moment
        .duration()
        .add({days: 0, hours: 0, minutes: studyInterval, seconds: 0}),
      hours: 0,
      mins: studyInterval,
      secs: 0,
      status: 'Studying',
      roundLeft: periods,

      buttonPauseIcon: 'pause',
      buttonPauseBG: '#9CEC5B',
      buttonPauseTitle: 'Pause',
      buttonPauseStyle: styles.pauseButtonStyle,
    };
  }

  statusChanging() {
    const {restInterval, studyInterval, periods} = this.settings;
    if (this.state.roundLeft == 0 && this.state.status == 'Resting') {
      //  Alert.alert("Congratulations!!! You've finished your study interval!!")
    } else {
      if (this.state.status == 'Studying') {
        this.setState({
          status: 'Resting',
          secs: restInterval,
          eventDate: moment
            .duration()
            .add({days: 0, hours: 0, minutes: 0, seconds: restInterval}),
        });
        this.updateTimer();
      } else if (this.state.status == 'Resting') {
        this.setState({
          status: 'Studying',
          secs: studyInterval,
          eventDate: moment
            .duration()
            .add({days: 0, hours: 0, minutes: 0, seconds: studyInterval}),
          roundLeft: this.state.roundLeft - 1,
        });
        this.updateTimer();
      }
    }
  }

  onTimeout() {
    this.statusChanging();
  }

  updateTimer = () => {
    this.x = setInterval(() => {
      let {eventDate} = this.state;

      if (eventDate <= 0) {
        clearInterval(this.x);
        this.onTimeout();
      } else {
        eventDate = eventDate.subtract(1, 's');
        const hours = eventDate.hours();
        const mins = eventDate.minutes();
        const secs = eventDate.seconds();

        this.setState({
          hours,
          mins,
          secs,
          eventDate,
        });
      }
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.x);
  }

  componentDidMount() {
    this.updateTimer();
  }

  timeStringGenerateor(hours, mins, secs) {
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (mins < 10) {
      mins = '0' + mins;
    }
    if (secs < 10) {
      secs = '0' + secs;
    }
    return `${hours}:${mins}:${secs}`;
  }

  buttonPauseStyleChange() {
    if (this.state.buttonPauseTitle == 'Pause') {
      clearInterval(this.x),
        this.setState({
          buttonPauseIcon: 'play',
          buttonPauseTitle: 'Resume',
          buttonPauseStyle: styles.playButtonStyle,
        });
    } else if (this.state.buttonPauseTitle == 'Resume') {
      this.updateTimer();
      this.setState({
        buttonPauseIcon: 'pause',
        buttonPauseBG: '#9CEC5B',
        buttonPauseTitle: 'Pause',
        buttonPauseStyle: styles.pauseButtonStyle,
      });
    }
  }
  ////////////////////////////////// UI /////////////////////////////////////////////
  render() {
    const {hours, mins, secs} = this.state;
    return (
      <Container style={styles.container}>
        <View style={styles.timer}>
          <View style={{position: 'absolute'}}>
            <Donut
              percentage={
                ((this.state.mins * 60 + this.state.secs) /
                  (this.settings.studyInterval * 60)) *
                100
              }
            />
          </View>
          <Text style={styles.timerText}>
            {this.timeStringGenerateor(hours, mins, secs)}
          </Text>
          {/* <TimerLoader /> */}

          <Text style={styles.statusText}>{this.state.status}</Text>
        </View>
        {/* //////////////////// Buttons ///////////////////////// */}
        <View style={styles.buttonContainer}>
          {/* ///////////////// Pause Button ////////////////// */}
          <Button
            large
            rounded
            style={this.state.buttonPauseStyle}
            onPress={() => {
              this.buttonPauseStyleChange();
              if (this.state.buttonPauseTitle == 'Pause') {
                this.props.onPause();
              } else if (this.state.buttonPauseTitle == 'Resume') {
                this.props.onResume();
              }
            }}>
            <Icon name={this.state.buttonPauseIcon} color="white" size={30} />
            <Text style={styles.buttonText}>{this.state.buttonPauseTitle}</Text>
          </Button>

          {/* ///////////////// Stop Button ////////////////// */}
          <Button
            large
            rounded
            style={styles.stopButtonStyle}
            onPress={() => {
              clearInterval(this.x);
              this.props.gotoResult();
            }}>
            <Icon name="stop" color="white" size={30} />
            <Text style={styles.buttonText}>Stop</Text>
          </Button>
        </View>
        <View style={{paddingBottom: 10}}>
          <Text style={styles.statusText}>
            Round left: {this.state.roundLeft}
          </Text>
        </View>
      </Container>
    );
  }
}

/////////////////////////////////// Style ////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  timer: {
    // flex: 3,
    paddingTop: 60,
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

  pauseButtonStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    width: 130,
    backgroundColor: '#EDAE49',
  },

  playButtonStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    width: 130,
    backgroundColor: '#9CEC5B',
  },

  stopButtonStyle: {
    display: 'flex',
    justifyContent: 'space-around',
    width: 130,
    backgroundColor: '#F67E7D',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  buttonContainer: {
    flex: 1,
    paddingTop: 420,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // flexWrap: 'wrap',
  },
});
