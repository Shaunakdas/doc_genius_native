import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
export default class CalendarPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "01-05-2006",
    };
  }
  render() {
    return (
      <DatePicker
        style={{ justifyContent: 'center' }}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD-MM-YYYY"
        minDate="01-05-2003"
        maxDate="01-06-2009"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      );
  }
}