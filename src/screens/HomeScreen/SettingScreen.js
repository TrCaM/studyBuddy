import React, { Component } from 'react';
import {
  Container,
  Text,
  Header,
  Title,
  Body,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {},
    };
  }

  gotoStart() {
    this.props.navigation.navigate('Start');
  }

  async componentDidMount() {
    try {
      this.user = auth().currentUser;
      const userData = await firestore()
        .collection('users')
        .doc(this.user.uid)
        .get();
      this.setState({ settings: userData.data().settings });
    } catch (e) {
      console.log(e.message);
    }
  }

  async saveOnClick() {
    console.log(this.state);
    const user = auth().currentUser;
    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .update({ settings: this.state.settings });
    } catch (e) {
      console.log(e.message);
    }
    this.gotoStart();
  }

  render() {
    return (
      <Container style={{ display: 'flex' }}>

        <Header style={{ backgroundColor: '#166088' }}>
          <Body>
            <Title>Settings</Title>
          </Body>
        </Header>
        <ScrollView>
          <Form style={styles.container}>
            <Item stackedLabel>
              <Label style={styles.labelStyle}>
                Number of Periods (periods): {"\n"}(Last choice: {this.state.settings.periods} periods)
              </Label>
              <Input
                // placeholder={(this.state.settings.periods || '') + '\tperiods'}
                keyboardType='numeric'
                onChangeText={input =>
                  this.setState({
                    settings: { ...this.state.settings, periods: input },
                  })
                }
              />
            </Item>
            <Item stackedLabel>
              <Label style={styles.labelStyle}>
                Study Interval (minutes): {"\n"}(Last choice: {this.state.settings.studyInterval} min)
              </Label>
              <Input
                // placeholder={
                //   (this.state.settings.studyInterval || '') + '\tminutes'
                // }
                keyboardType='numeric'
                onChangeText={input =>
                  this.setState({
                    settings: { ...this.state.settings, studyInterval: input },
                  })
                }
              />
            </Item>
            <Item stackedLabel>
              <Label style={styles.labelStyle}>
                Rest Interval (minutes): {"\n"}(Last choice: {this.state.settings.restInterval} min)
              </Label>
              <Input
                // placeholder={
                //   (this.state.settings.restInterval || '') + '\tminutes'
                // }
                keyboardType='numeric'
                onChangeText={input =>
                  this.setState({
                    settings: { ...this.state.settings, restInterval: input },
                  })
                }
              />
            </Item>
            {/* <Item stackedLabel>
              <Label style={styles.labelStyle}>
                Max Pause Time (times): {"\n"}(Last choice: {this.state.settings.maxPauseInterval} times)
              </Label>
              <Input
                // placeholder={
                //   (this.state.settings.maxPauseInterval || '') + '\tminutes'
                // }
                keyboardType='numeric'
                onChangeText={input =>
                  this.setState({
                    settings: { ...this.state.settings, maxPauseInterval: input },
                  })
                }
              />
            </Item> */}
          </Form>
        </ScrollView>
        <Container style={styles.buttonStyle}>
          <Button style={{ backgroundColor: '#166088' }} primary rounded large onPress={this.saveOnClick.bind(this)}>
            <Text> Save Settings </Text>
          </Button>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
  },
  labelStyle: {
    width: 250,
  },
  buttonStyle: {
    flex: 3,
    alignItems: 'center',
  },
});
