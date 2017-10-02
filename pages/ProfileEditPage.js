import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { ImagePicker } from 'expo';

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
      isModalVisible: false,
      image: user.image,
      uploading: false,
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

  showModal = () => this.setState({ isModalVisible: true })

  hideModal = () => this.setState({ isModalVisible: false })

  takePhoto = async () => {
    const pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });

    await this.handleImagePicked(pickerResult);
  };

  pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });
    await this.handleImagePicked(pickerResult);
  };

  handleImagePicked = async (pickerResult) => {
    this.setState({ uploading: true, isModalVisible: false });
    try {
      if (!pickerResult.cancelled) {
        const { image } = this.state;
        this.setState({
          image: {
            ...image,
            uri: pickerResult.uri,
          },
        });
      }
    } catch (e) {
      //
    } finally {
      this.setState({ uploading: false });
    }
  };

  render() {
    const { errors, values, updating, image } = this.state;
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

          <View style={{
            elevation: 2,
            shadowColor: COLORS.BLACK,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            backgroundColor: COLORS.WHITE,
            height: 70,
            width: 70,
            borderRadius: 35,
            marginVertical: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <TouchableOpacity onPress={this.showModal}>
              <Image
                source={image}
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 35,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>

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
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={this.hideModal}
        >
          <View
            style={{
              backgroundColor: COLORS.ALMOST_WHITE,
              borderRadius: 15,
              marginHorizontal: 40,
              paddingVertical: 10,
            }}
          >
            <Button
              text="Pick an Image"
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.SECONDARY,
                padding: 5,
                paddingHorizontal: 20,
              }}
              textStyle={{
                ...font(16),
                textAlign: 'center',
                color: COLORS.PRIMARY,
              }}
              onPress={this.pickImage}
            />
            <Button
              text="Take a Photo"
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.SECONDARY,
                padding: 5,
                paddingHorizontal: 20,
              }}
              textStyle={{
                ...font(16),
                textAlign: 'center',
                color: COLORS.PRIMARY,
              }}
              onPress={this.takePhoto}
            />
            <Button
              text="Close"
              style={{
                padding: 5,
                paddingHorizontal: 20,
              }}
              textStyle={{
                ...font(16),
                textAlign: 'center',
                color: COLORS.PRIMARY,
              }}
              onPress={this.hideModal}
            />
          </View>
        </Modal>
        <Modal
          isVisible={this.state.uploading}
        >
          <View
            style={{
              padding: 15,
              borderRadius: 10,
            }}
          >
            <ActivityIndicator size={Platform.OS === 'ios' ? 0 : 14} color={COLORS.PRIMARY} />
          </View>
        </Modal>
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
