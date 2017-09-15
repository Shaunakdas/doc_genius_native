import React from 'react';
import { Text, Image, ScrollView, View, KeyboardAvoidingView } from 'react-native';
import { PropTypes } from 'prop-types';

import { commonStyle as cs, signupPageStyle as s } from '../common/styles';
import { Button, IconButton, Input } from '../components';
import IMAGES from '../common/images';
import { validateEmail, validGraduationYear } from '../common/helper';
import COLORS, { alpha } from '../common/colors';
import { STUDENT_ROLE, COUNSELOR_ROLE } from '../common/constants';

const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
};

export default class SignupPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const { navigation = {} } = props;
    const { params = {} } = navigation.state;
    const { role = STUDENT_ROLE } = params;
    this.inputs = {};
    this.state = {
      values: {
        schoolCode: '',
        counselorCode: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
      },
      errors: {
        schoolCode: '',
        counselorCode: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
      },
      role,
    };
  }

  onValueChange = fieldName => (value) => {
    this.setState({
      values: {
        ...this.state.values,
        [fieldName]: value,
      },
      errors: {
        ...this.state.errors,
        [fieldName]: '',
      },
    });
  }

  onSubmit = nextFieldName => () => {
    if (nextFieldName) { this.inputs[nextFieldName].focus(); }
  }

  getStarted = () => {
    this.setState({
      errors: {
        schoolCode: '',
        counselorCode: '',
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        graduationYear: '',
      },
    }, this.validate);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validate = () => {
    const { role } = this.state;
    const {
      schoolCode,
      counselorCode,
      fullName,
      email,
      username,
      password,
      confirmPassword,
      graduationYear,
    } = this.state.values;
    const errors = {
      schoolCode: schoolCode ? '' : 'School Code is required',
      counselorCode: counselorCode || role === STUDENT_ROLE ? '' : 'Counselor Code is required',
      fullName: fullName ? '' : 'Full Name is required',
      email: email ? '' : 'Email is required',
      username: username ? '' : 'Username is required',
      password: password ? '' : 'Password is required',
      confirmPassword: confirmPassword ? '' : 'Password is required',
      graduationYear: graduationYear || role === COUNSELOR_ROLE ? '' : 'Graduation year is required',
    };

    if (graduationYear && !validGraduationYear(graduationYear)) {
      errors.graduationYear = 'Not a valid graduation year';
    }

    if (email && !validateEmail(email)) {
      errors.email = 'Please enter a valid email';
    }

    if (password && password.length < 10) {
      errors.password = 'Must be atleast 10 characters';
    }

    if (password && confirmPassword && password !== confirmPassword) {
      errors.confirmPassword = "Passwords didn't match";
    }
    this.setState({
      errors,
    });
  }

  addInput = fieldName => (input) => {
    this.inputs[fieldName] = input;
  }

  render() {
    const { role, errors } = this.state;
    const {
      schoolCode,
      counselorCode,
      fullName,
      email,
      username,
      password,
      confirmPassword,
      graduationYear,
    } = this.state.values;
    return (
      <KeyboardAvoidingView
        style={[cs.container, s.container]}
        behavior="padding"
      >
        <ScrollView
          style={cs.scroll}
          contentContainerStyle={cs.scrollContent}
        >
          <Image
            style={s.logo}
            source={IMAGES.LOGO}
          />
          <Text style={s.mainText}>{role} Sign-Up</Text>
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'School Code',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.schoolCode}
            value={schoolCode}
            ref={this.addInput('schoolCode')}
            onChange={this.onValueChange('schoolCode')}
            onSubmit={this.onSubmit(role === STUDENT_ROLE ? 'graduationYear' : 'counselorCode')}
          />
          {role === STUDENT_ROLE ? <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Graduation Year',
              keyboardType: 'numeric',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.graduationYear}
            value={graduationYear}
            ref={this.addInput('graduationYear')}
            onChange={this.onValueChange('graduationYear')}
            onSubmit={this.onSubmit('fullName')}
          /> : null}
          {role === COUNSELOR_ROLE ? <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Counselor Code',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.counselorCode}
            value={counselorCode}
            ref={this.addInput('counselorCode')}
            onChange={this.onValueChange('counselorCode')}
            onSubmit={this.onSubmit('fullName')}
          /> : null}
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Full Name',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.fullName}
            value={fullName}
            ref={this.addInput('fullName')}
            onChange={this.onValueChange('fullName')}
            onSubmit={this.onSubmit('email')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Email',
              keyboardType: 'email-address',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.email}
            value={email}
            ref={this.addInput('email')}
            onChange={this.onValueChange('email')}
            onSubmit={this.onSubmit('username')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Username',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.username}
            value={username}
            ref={this.addInput('username')}
            onChange={this.onValueChange('username')}
            onSubmit={this.onSubmit('password')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Password',
              secureTextEntry: true,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.password}
            value={password}
            ref={this.addInput('password')}
            onChange={this.onValueChange('password')}
            onSubmit={this.onSubmit('confirmPassword')}
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Re-type Password',
              secureTextEntry: true,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.confirmPassword}
            value={confirmPassword}
            ref={this.addInput('confirmPassword')}
            onChange={this.onValueChange('confirmPassword')}
            onSubmit={this.onSubmit('')}
          />
          <Button
            text="Get Started"
            style={[cs.getStartedButton, s.button]}
            textStyle={[cs.getStartedButtonText]}
            onPress={this.getStarted}
          />
          <View style={{ height: 60 }} />
        </ScrollView>
        <IconButton
          source={IMAGES.BACK}
          style={cs.backButton}
          imageStyle={cs.backImage}
          onPress={this.goBack}
        />
      </KeyboardAvoidingView>
    );
  }
}
