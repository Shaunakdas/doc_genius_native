import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Platform } from "react-native";
import { Container, Header, Title, Content, Button, Icon, Text, Right, Body, Left, Picker, Form, Item as FormItem } from "native-base";
const Item = Picker.Item;
export default class StandardPicker extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selected2: '8',
  //   };
  // }
  // onValueChange2(value: string) {
  //   this.setState({
  //     selected2: value,
  //   });
  //   console.log(value);
  // }
  static propTypes = {
    standards: PropTypes.any,
    selected: PropTypes.string,
    onValueChange: PropTypes.func,
  }

  static defaultProps = {
    standards: [
      { label: '6th Class', key: '6' },
      { label: '7th Class', key: '7' },
      { label: '8th Class', key: '8' },
      { label: '9th Class', key: '9' },
      { label: '10th Class', key: '10' },
    ],
    selected: '6',
    onValueChange: null,
  }


  render() {
    const {
      standards,
      selected,
      onValueChange } = this.props;
    const options = standards.map((item) =>
      <Item label={item.label} value={item.key} />);
    return (
      <Picker
        style={{ color: '#0FF' }}
        mode="dropdown"
        placeholder="Select One"
        selectedValue={selected}
        onValueChange={onValueChange.bind(this)}
      >
        {options}
      </Picker>
    );
  }
}