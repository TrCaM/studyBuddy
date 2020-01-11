import React from 'react';
import { Container, Text } from 'native-base';
import Timer from '../../../src/components/Timer';

const TimerScreen = props => {
  return (
    <Container>
      <Timer/>
    </Container>
  );
};

export default TimerScreen;