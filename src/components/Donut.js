// import DonutChart from 'react-donut-chart';
import React from 'react';
import {
  Container,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Content,
} from 'native-base';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

//things I would never do:

const Donut = props => {
  return (
    <AnimatedCircularProgress
      size={props.size}
      width={15}
      fill={props.percentage}
      tintColor="#00e0ff"
      backgroundColor='grey'
    />
  );
};

export default Donut;
