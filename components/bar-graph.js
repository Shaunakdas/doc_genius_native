import React, { Component } from 'react';
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
import { VictoryAxis, VictoryChart, VictoryBar, VictoryTheme } from "victory-native";

const data = [
  {quarter: 1, earnings: 4},
  {quarter: 2, earnings: 5},
  {quarter: 3, earnings: 1},
  {quarter: 4, earnings: 3},
];
const animation = {
    duration: 3000,
    onLoad: { duration: 1000 }
}
export default class BarGraph extends Component {
  render() {
    return (
      <Container style={{ marginTop: 25, paddingTop: 10, backgroundColor: '#000080' }}>
        <Content  style={{ paddingHorizontal: 25 }}>
          <Card style={{ backgroundColor: '#00bfff' }}>
            <CardItem style={{ backgroundColor: '#00bfff' }}>
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
              theme={VictoryTheme.material}
                  height={300}
                  style={{ parent: { maxWidth: "100%" } }}
              >
                <VictoryAxis 
                  tickValues={[1, 2]}
                  tickFormat={["You", "Other Players\n\n  (average)"]}
                  domain={[0.5, 2.5]}
                />
                <VictoryAxis
                  dependentAxis
                  tickCount={3}
                  style ={{
                    grid: {stroke: (t) => t > 0.5 ? "red" : "grey"},
                    ticks: {stroke: "grey", size: 5},
                  }}
                />
                <VictoryBar
                  style={{
                    data: {fill: "blue"}
                  }}
                  data={[
                {user: 1, time: 3.0},
                {user: 2, time: 6.5}
              ]}
                  x="user"
                  y="time"
                />
              </VictoryChart>
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}