import React from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
// import { ImagePicker } from 'expo';

import IMAGES from '../common/images';
import { Button, IconButton, Input } from '../components';
import { commonStyle as cs, editPageStyle as s, font } from '../common/styles';
import { validGraduationYear } from '../common/helper';
import COLORS, { alpha } from '../common/colors';
// import { STUDENT_ROLE } from '../common/constants';
import { setLoggedInUser } from '../store/actions';
import { editUserAPI, userAPI, uploadImageAPI } from '../common/api';


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
        firstName: user.firstName,
        lastName: user.lastName,
        sex: user.sex,
        dateOfBirth: user.dateOfBirth,
        id: user.id,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
      errors: {
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        email: '',
        mobileNumber: '',
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
        firstName: '',
        lastName: '',
        sex: '',
        dateOfBirth: '',
        email: '',
        mobileNumber: '',
      },
    }, this.validate);
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  validate = () => {
    const {
      firstName,
      lastName,
      sex,
      dateOfBirth,
      mobileNumber,
    } = this.state.values;
    const errors = {
      firstName: firstName ? '' : 'First Name is required',
      lastName: lastName ? '' : 'Last Name is required',
      sex: sex ? '' : 'Sex is required',
      dateOfBirth: dateOfBirth ? '' : 'Date of Birth is required',
      mobileNumber: mobileNumber ? '' : 'Mobile Number is required',
    };

    if (mobileNumber && !validGraduationYear(mobileNumber)) {
      errors.mobileNumber = 'Not a valid mobile Number';
    }

    this.setState({
      errors,
    }, () => {
      if (Object.values(errors).every(value => value === '')) { this.update(); } else { this.setState({ updating: false }); }
    });
  }

  update = async () => {
    const { firstName, lastName, sex, dateOfBirth, mobileNumber } = this.state.values;
    const { authToken, setUser, navigation } = this.props;
    const response = await editUserAPI(authToken, firstName, lastName, sex,
      dateOfBirth, mobileNumber);
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
    // const pickerResult = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [3, 3],
    //   quality: 0,
    // });
    // await this.handleImagePicked(pickerResult);
  };

  pickImage = async () => {
    // const pickerResult = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   aspect: [3, 3],
    //   quality: 0,
    // });
    // await this.handleImagePicked(pickerResult);
  };

  handleImagePicked = async (pickerResult) => {
    const { authToken, setUser } = this.props;
    this.setState({ uploading: true, isModalVisible: false });
    try {
      if (!pickerResult.cancelled) {
        const { image } = this.state;
        const response = await uploadImageAPI(pickerResult.uri, authToken);
        if (response.success !== false) {
          this.setState({
            image: {
              ...image,
              uri: pickerResult.uri,
            },
          });
          const user = await userAPI(authToken);
          if (user.success !== false) {
            setUser(user);
          }
        }
      }
    } catch (e) {
      //
    } finally {
      this.setState({ uploading: false });
    }
  };

  render() {
    const { errors, values, updating, image } = this.state;
    const { firstName, lastName, sex, dateOfBirth, mobileNumber, email } = values;
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
              placeholder: 'First Name',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.firstName}
            value={firstName}
            ref={this.addInput('firstName')}
            onChange={this.onValueChange('firstName')}
            showLabel
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Last Name',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.lastName}
            value={lastName}
            ref={this.addInput('lastName')}
            onChange={this.onValueChange('lastName')}
            showLabel
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Sex',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.sex}
            value={sex}
            ref={this.addInput('sex')}
            onChange={this.onValueChange('sex')}
            showLabel
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Date Of Birth',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.dateOfBirth}
            value={dateOfBirth}
            ref={this.addInput('dateOfBirth')}
            onChange={this.onValueChange('dateOfBirth')}
            showLabel
          />
          <Input
            inputProps={{
              ...commonInputProps,
              placeholder: 'Mobile Number',
            }}
            wrapperStyle={cs.inputWrapper}
            error={errors.mobileNumber}
            value={mobileNumber}
            ref={this.addInput('mobileNumber')}
            onChange={this.onValueChange('mobileNumber')}
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
              backgroundColor: COLORS.MODAL_BG,
              borderRadius: 15,
              marginHorizontal: 20,
              paddingVertical: 10,
              alignItems: 'stretch',
            }}
          >
            <Button
              text="Pick an Image"
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.MODAL_BORDER,
                padding: 5,
              }}
              textStyle={{
                ...font(20),
                textAlign: 'center',
                lineHeight: 32,
                color: COLORS.PRIMARY,
              }}
              onPress={this.pickImage}
            />
            <Button
              text="Take a Photo"
              style={{
                borderBottomWidth: 1,
                borderColor: COLORS.MODAL_BORDER,
                padding: 5,
              }}
              textStyle={{
                ...font(20),
                textAlign: 'center',
                lineHeight: 32,
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
                lineHeight: 32,
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
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size={Platform.OS === 'ios' ? 0 : 14} color={COLORS.PRIMARY} />
            <Text style={{ ...font(12), color: COLORS.ALMOST_WHITE }}> Uploading Image ... </Text>
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
