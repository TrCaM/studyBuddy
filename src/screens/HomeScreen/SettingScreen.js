import React, {Component} from 'react';
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

import {StyleSheet} from 'react-native';

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
      this.setState({settings: userData.data().settings});
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
        .update({settings: this.state.settings});
    } catch (e) {
      console.log(e.message);
    }
    this.gotoStart();
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Settings</Title>
          </Body>
        </Header>
        <Form style={styles.container}>
          <Item>
            <Label style={styles.labelStyle}>Number of Periods: </Label>
            <Input
              placeholder={(this.state.settings.periods || '') + '\tperiods'}
              onChangeText={input =>
                this.setState({
                  settings: {...this.state.settings, periods: input},
                })
              }
            />
          </Item>
          <Item>
            <Label style={styles.labelStyle}>Study Interval: </Label>
            <Input
              placeholder={
                (this.state.settings.studyInterval || '') + '\tminutes'
              }
              onChangeText={input =>
                this.setState({
                  settings: {...this.state.settings, studyInterval: input},
                })
              }
            />
          </Item>
          <Item>
            <Label style={styles.labelStyle}>Rest Interval: </Label>
            <Input
              placeholder={
                (this.state.settings.restInterval || '') + '\tminutes'
              }
              onChangeText={input =>
                this.setState({
                  settings: {...this.state.settings, restInterval: input},
                })
              }
            />
          </Item>
          <Item>
            <Label style={styles.labelStyle}>Max Pause Time: </Label>
            <Input
              placeholder={
                (this.state.settings.maxPauseInterval || '') + '\tminutes'
              }
              onChangeText={input =>
                this.setState({
                  settings: {...this.state.settings, maxPauseInterval: input},
                })
              }
            />
          </Item>
        </Form>
        <Container style={styles.buttonStyle}>
          <Button primary large onPress={this.saveOnClick.bind(this)}>
            <Text> Save Settings </Text>
          </Button>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  labelStyle: {
    width: 250,
  },
  buttonStyle: {
    paddingTop: 50,
    alignItems: 'center',
  },
});
