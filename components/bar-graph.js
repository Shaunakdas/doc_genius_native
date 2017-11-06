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
import { VictoryScatter, VictoryArea, VictoryLine, VictoryTheme, VictoryGroup, VictoryLabel } from "victory-native";

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
export default class App extends Component {
  render() {
    return (
      <Container style={{ marginTop: 25, paddingTop: 10, backgroundColor: '#000080' }}>
        <Content  style={{ paddingHorizontal: 25 }}>
          <Card style={{ backgroundColor: '#00bfff' }}>
            <CardItem style={{ backgroundColor: '#00bfff' }}>
            <View >
              <ListItem avatar  style={{ backgroundColor: '#00bfff' }}>
                <Left>
                  <Icon name='school' />
                </Left>
                <Body>
                  <Text>Memory</Text>
                  <Text note>High Score : 9700</Text>
                </Body>
              </ListItem>
              <VictoryGroup
              animate={{animation}}
                data={[{x: "a", y: 2}, {x: "b", y: 3}, {x: "c", y: 5}, {x: "d", y: 4}, {x: "e", y: 7}]}
                color="blue"
                style={{ parent: { maxWidth: "100%" } }}
              >
                <VictoryLine />
                <VictoryArea style={{ data: { fill: "#0000ff" } }}/>
                <VictoryScatter size={6} symbol="circle"
                style={{ data: { fill: "#ffffff" }, labels: { fill: "white", fontSize: 20 } }}
                labels={['','','','',"11th Best\n\n2500"]} 
                labelComponent={<VictoryLabel renderInPortal dx={-40} dy={20}/>}/>
              </VictoryGroup>
              </View>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}