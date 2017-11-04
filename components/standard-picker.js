import React, { Component } from "react";
import { Platform } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item as FormItem } from "native-base";
const Item = Picker.Item;
export default class StandardPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  render() {
    return (
      <Picker
        style={{ color: '#0FF' }}
        mode="dropdown"
        placeholder="Select One"
        selectedValue={this.state.selected2}
        onValueChange={this.onValueChange2.bind(this)}
      >
        <Item label="Standard" value="key0" />
        <Item label="6th Class" value="key1" />
        <Item label="7th Class" value="key2" />
        <Item label="8th Class" value="key3" />
        <Item label="9th Class" value="key4" />
      </Picker>
    );
  }
}