import React from 'react';
import { Container, Text } from 'native-base';
import Timer from '../../../src/components/Timer';

const TimerScreen = props => {
  const settings = {
    restInterval: 1,
    studyInterval: 3,
    periods: 2,
  }
  return (
    <Container>
      <Timer settings={settings} />
    </Container>
  );
};

export default TimerScreen;