import React, { Component } from 'react';
import { Alert ,Text, View, StyleSheet, ScrollView, Image, FlatList, List } from 'react-native';
import moment from 'moment';
import { Card, Icon, ListItem } from 'react-native-elements';
import { Button, Container } from 'native-base';


export default class Timer extends Component {

    constructor(props) {
      super(props);

      //set time length here
      this.restInterval = 2
      this.studyInterval= 5 
      
      this.state ={ 
        eventDate: moment.duration().add({days:0,hours: 0,minutes: 0,seconds: this.studyInterval}), 
        hours: 0,
        mins: 0,
        secs: this.studyInterval,
        status: 'Studying',
      }
    };

    statusChanging(){
      if (this.state.status == 'Studying'){
        this.setState({
            status: 'Resting', 
            secs: this.restInterval, 
            eventDate: moment.duration().add({days:0,hours: 0,minutes: 0,seconds: this.restInterval}),
        })
        this.updateTimer()
      } else if (this.state.status == 'Resting'){
        this.setState({
            status: 'Studying', 
            secs: this.studyInterval, 
            eventDate: moment.duration().add({days:0,hours: 0,minutes: 0,seconds: this.studyInterval}),
        })
        this.updateTimer()
      }
    }

    onTimeout() {
      this.statusChanging();
    }
    
    updateTimer=()=>{
    
      this.x = setInterval(()=>{
        let { eventDate } = this.state

        if(eventDate <=0){
          clearInterval(this.x);
          this.onTimeout();
        }else {
          eventDate = eventDate.subtract(1,"s")
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
      },1000)
    }

    componentWillUnmount() {
        clearInterval(this.x)
    }
    
    componentDidMount(){
     this.updateTimer()
    }


    component


    timeStringGenerateor(hours, mins, secs){
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
    


    render() {
      const { hours, mins, secs } = this.state
      return (
        <View style={styles.container}>
          <Text style={styles.timerText}>
            {this.timeStringGenerateor(hours, mins,secs)}
          </Text>
          <Text style={styles.statusText}>
            {this.state.status}
          </Text>
        </View>
      );
    };
  };

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText:{
    fontSize: 50,
  },

  statusText:{
    fontSize: 30,
  }
})