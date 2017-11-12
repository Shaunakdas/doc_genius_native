import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Input,
} from 'native-base';
export default class CalendarPicker extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     date: "01-05-2006",
  //   };
  // }
  static propTypes = {
    inputProps: PropTypes.any,
    wrapperStyle: PropTypes.any,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    showLabel: PropTypes.bool,
  }

  static defaultProps = {
    wrapperStyle: null,
    error: '',
    onSubmit: () => {},
    onChange: () => {},
    showLabel: false,
  }
  
  focus = () => {
    this.input.focus();
  }

  render() {
    const { error, value, onChange, onSubmit, inputProps, showLabel } = this.props;
    return (
      <Input
        ref={input => this.input = input} // eslint-disable-line no-return-assign
        {...inputProps}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
      />
      );
  }
}