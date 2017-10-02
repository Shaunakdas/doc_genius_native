import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import IMAGES from '../common/images';
import { Button, IconButton, Input } from '../components';
import { commonStyle as cs, editPageStyle as s, font } from '../common/styles';
import { validGraduationYear } from '../common/helper';
import COLORS, { alpha } from '../common/colors';
import { STUDENT_ROLE } from '../common/constants';
import { setLoggedInUser } from '../store/actions';
import { editUserAPI, userAPI } from '../common/api';


const commonInputProps = {
  style: cs.input,
  autoCorrect: false,
  returnKeyType: 'next',
  placeholderTextColor: alpha(COLORS.WHITE, 0.4),
  selectionColor: COLORS.WHITE,
  maxLength: 30,
  autoCapitalize: 'none',
};

class ProfileEditPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    currentUser: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props);
    const { currentUser: user } = props;
    this.inputs = {};
    this.state = {
      values: {
        fullName: user.name,
        graduationYear: user.graduation_year,
        role: user.role,
        id: user.id,
        schoolCode: user.school_code,
        school: user.school_name,
        username: user.username,
        email: user.email,
      },
      errors: {
        fullName: '',
        graduationYear: '',
        schoolCode: '',
        school: '',
        username: '',
        email: '',
        overall: '',
      },
      updating: false,
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

  getStarted = () => {
    this.setState({
      updating: true,
      errors: {
        fullName: '',
        graduationYear: '',
        schoolCode: '',
        school: '',
        username: '',
        email: '',
        overall: '',
      },
    }, this.validate);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validate = () => {
    const {
      fullName,
      graduationYear,
    } = this.state.values;
    const errors = {
      fullName: fullName ? '' : 'Full Name is required',
      graduationYear: graduationYear ? '' : 'Graduation year is required',
    };

    if (graduationYear && !validGraduationYear(graduationYear)) {
      errors.graduationYear = 'Not a valid graduation year';
    }

    this.setState({
      errors,
    }, () => {
      if (Object.values(errors).every(value => value === '')) { this.update(); } else { this.setState({ updating: false }); }
    });
  }

  update = async () => {
    const { fullName, graduationYear, role } = this.state.values;
    const { authToken, setUser, navigation } = this.props;
    const response = await editUserAPI(authToken, fullName, graduationYear, role);
    if (response.success !== false) {
      const user = await userAPI(authToken);
      if (user.success !== false) {
        setUser(user);
        navigation.goBack();
      }
    }
    this.setState({ updating: false });
  }

  addInput = fieldName => (input) => {
    this.inputs[fieldName] = input;
  }

  render() {
    const { errors, values, updating } = this.state;
    const { fullName, graduationYear, role, school, schoolCode, username, email } = values;
    return (
      <View
        style={[cs.container, { backgroundColor: COLORS.PRIMARY }]}
      >
        <View style={s.header}>
          <Text style={s.headerText}> Edit Profile </Text>
          <IconButton
            source={IMAGES.BACK}
            onPress={this.goBack}
            style={[cs.backButton, cs.headerBackButton]}
            imageStyle={cs.backImage}
          />
        </View>
        <ScrollView
          alwaysBounceVertical={false}
          style={cs.scroll}
          contentContainerStyle={cs.scrollContent}
        >
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
            showLabel
          />
          {role === STUDENT_ROLE ? <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Graduation Year',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.graduationYear}
            value={graduationYear}
            ref={this.addInput('graduationYear')}
            onChange={this.onValueChange('graduationYear')}
            showLabel
          /> : null}
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'School Name',
              editable: false,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.school}
            value={school}
            ref={this.addInput('school')}
            showLabel
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'School Code',
              editable: false,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.schoolCode}
            value={schoolCode}
            ref={this.addInput('schoolCode')}
            showLabel
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Username',
              editable: false,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.username}
            value={username}
            ref={this.addInput('username')}
            showLabel
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Email',
              editable: false,
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.email}
            value={email}
            ref={this.addInput('email')}
            showLabel
          />
          {errors.overall ? <Text style={{
            color: alpha(COLORS.RED, 0.7),
            marginTop: 3,
            marginBottom: 20,
            ...font(10),
          }}
          >{errors.overall}</Text> : null}
          <Button
            text="Save Changes"
            style={cs.getStartedButton}
            textStyle={[cs.getStartedButtonText]}
            onPress={this.getStarted}
            isLoading={updating}
            loadingColor={COLORS.PRIMARY}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({
  currentUser,
  loginState: { authToken },
}) =>
  ({ currentUser, authToken });

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setLoggedInUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
