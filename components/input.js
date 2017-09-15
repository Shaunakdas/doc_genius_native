import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Text,
} from 'react-native';
import COLORS, { alpha } from '../common/colors';
import { font } from '../common/styles';

export default class Input extends Component {
  static propTypes = {
    inputProps: PropTypes.any.isRequired,
    wrapperStyle: PropTypes.any,
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    wrapperStyle: null,
    error: '',
  }

  focus = () => {
    this.input.focus();
  }

  render() {
    const errorStyle = {
      borderColor: alpha(COLORS.RED, 0.7),
      marginBottom: 0,
    };
    const { error, value, onChange, onSubmit } = this.props;
    return (
      <View>
        <View style={[this.props.wrapperStyle, error ? errorStyle : null]}>
          <TextInput
            ref={input => this.input = input} // eslint-disable-line no-return-assign
            underlineColorAndroid={COLORS.TRANSPARENT}
            {...this.props.inputProps}
            value={value}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
          />
        </View>
        {error ?
          <Text
            style={{
              color: alpha(COLORS.RED, 0.7),
              marginTop: 3,
              marginBottom: 20,
              ...font(10),
            }}
          >
            {error}
          </Text>
          : null}
      </View>
    );
  }
}
