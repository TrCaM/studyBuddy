import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, FlatList } from 'react-native';
import {
  Container,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
} from 'native-base';
import LottieView from 'lottie-react-native';
import HistoryList from '../../components/HistoryList';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.data = HistoryList
  }

  minutesToHours(min) {
    let h = Math.floor(min / 60);
    let m = min - h * 60;
    if (h <= 0) {
      return m + 'm';
    } else {
      return h + 'h' + m + 'm';
    }
  }

  passOrFail(succeed){
    if (succeed == true){
      return(require('../../assets/checkIcon.png'))
    } else {
      return(require('../../assets/xIcon.png'))
    }
  }
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#166088' }}>
          <Body>
            <Text style={{ color: 'white' }}>History</Text>
          </Body>
        </Header>
        <FlatList
          data={this.data}
          renderItem={({ item }) => (
            <Card
              style={{height:55 ,display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }
              }>
              <Image
                source={this.passOrFail(item.succeed)}
                style={styles.image}
              ></Image>
              <Container style={{borderWidth:1 ,paddingLeft: 5,flex:2}}>
                <Text style={{fontSize: 13}}>
                  Quality:
                </Text>
                <Text style={{fontSize:30}}>
                  {item.quality}%
                </Text>
              </Container>

              <Container style={{borderWidth: 1 ,paddingLeft: 5,flex:6}}>
                <Text style={{fontSize: 13}}>
                  Date:
                </Text>
                <Text style={{fontSize:28}}>
                  {item.date}
                </Text>
              </Container>
            </Card>
          )}
        // keyExtractor={item => item}
        />
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 60,
  },

  cardContainer:{
    paddingLeft: 5,
  },
});
