import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  ListItem,
  Left,
  Icon,
  Body,
} from 'native-base';
import {
  View,
} from 'react-native';
import { VictoryAxis, VictoryChart, VictoryBar, VictoryTheme } from 'victory-native';

// const data = [
//   {quarter: 1, earnings: 4},
//   {quarter: 2, earnings: 5},
//   {quarter: 3, earnings: 1},
//   {quarter: 4, earnings: 3},
// ];
// const animation = {
//     duration: 3000,
//     onLoad: { duration: 1000 }
// }
export default class BarGraph extends Component {
  static propTypes = {
    data: PropTypes.any,
    animation: PropTypes.any,
  }

  static defaultProps = {
    data: [
      { x: 'a', y: 2 },
      { x: 'b', y: 3 },
      { x: 'c', y: 5 },
      { x: 'd', y: 4 },
      { x: 'e', y: 7 },
    ],
    animation: {
      duration: 1000,
    },
  }


  render() {
    const {
      data,
      animation } = this.props;
    return (
      <Card style={{ backgroundColor: '#00bfff' }}>
        <CardItem style={{ backgroundColor: '#00bfff' }}  cardBody>
          <View >
            <ListItem avatar  style={{ backgroundColor: '#00bfff' }}>
              <Left>
                <Icon name='timer' />
              </Left>
              <Body>
                <Text>Average Solving time</Text>
                <Text note>High Score : 9700</Text>
              </Body>
            </ListItem>
            <VictoryChart
            animate={ animation }
              theme={VictoryTheme.material}
              height={250}
              style={{ parent: { maxWidth: '100%' } }}
            >
              <VictoryAxis 
                tickValues={[1, 2]}
                tickFormat={['You', 'Other Players\n\n  (average)']}
                domain={[0.5, 2.5]}
              />
              <VictoryAxis
                dependentAxis
                tickCount={3}
                style ={{
                  grid: {stroke: (t) => t > 0.5 ? 'red' : 'grey'},
                  ticks: {stroke: 'grey', size: 5},
                }}
              />
              <VictoryBar
                style={{
                  data: {fill: 'blue'}
                }}
                data={ data }
                x='user'
                y='time'
              />
            </VictoryChart>
          </View>
        </CardItem>
      </Card>
    );
  }
}