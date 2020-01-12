import React, {useState} from 'react';
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

import {StyleSheet} from 'react-native';

const SettingScreen = props => {
  const [periods, setPeriods] = useState(2);
  const [studyInterval, setStudyInterval] = useState(25);
  const [restInterval, setRestInterval] = useState(5);
  const saveOnClick = () => console.log('SAVE is clicked');
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
            placeholder={periods.toString() + '\tperiods'}
            onChangeText={input => setPeriods(input)}
          />
        </Item>
        <Item>
          <Label style={styles.labelStyle}>Study Interval: </Label>
          <Input
            placeholder={studyInterval.toString() + '\tminutes'}
            onChangeText={input => setStudyInterval(input)}
          />
        </Item>
        <Item>
          <Label style={styles.labelStyle}>Rest Interval: </Label>
          <Input
            placeholder={restInterval.toString() + '\tminutes'}
            onChangeText={input => setRestInterval(input)}
          />
        </Item>
      </Form>
      <Container style={styles.buttonStyle}>
        <Button primary large onPress={saveOnClick}>
          <Text> Save Settings </Text>
        </Button>
      </Container>
    </Container>
  );
};

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

export default SettingScreen;
