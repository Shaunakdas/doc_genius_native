import { StyleSheet, Dimensions } from 'react-native';
import COLORS, { alpha } from './colors';

export const { width: fullWidth, height: fullHeight } = Dimensions.get('window');

export const font = (fontSize, fontWeight = 'regular', fontFamily = 'firasans') => ({
  fontSize,
  fontFamily: `${fontFamily}-${fontWeight}`,
});

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
  },
  scrollContent: {
    alignItems: 'center',
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 50,
    width: fullWidth - 100,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  buttonText: {
    ...font(20),
    color: COLORS.WHITE,
  },
  getStartedButton: {
    marginHorizontal: 50,
    width: fullWidth - 100,
    paddingVertical: 20,
    borderRadius: 4,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginBottom: 20,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },

  getStartedButtonText: {
    ...font(14),
    color: COLORS.PRIMARY,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 35,
  },
  headerBackButton: {
    top: 25,
  },
  backImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    ...font(18),
    color: COLORS.WHITE,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    width: fullWidth - 100,
    borderColor: COLORS.WHITE,
    borderRadius: 4,
    borderWidth: 1,
    paddingVertical: 8,
    marginBottom: 20,
  },
  navigationBar: {
    width: fullWidth,
    flexDirection: 'row',
    shadowColor: alpha(COLORS.BLACK, 0.4),
    shadowOffset: { height: -1 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
    justifyContent: 'space-around',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.SECONDARY,
    borderTopWidth: 1,
    height: 50,
  },
  tabImage: {
    marginTop: 8,
    height: 16,
    width: 16,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  chatBotImage: {
    height: 24,
    width: 24,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center',
  },
  tabText: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    ...font(10),
  },
  header: {
    paddingTop: 36,
    paddingBottom: 13,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  headerText: {
    ...font(13),
    textAlign: 'center',
    color: COLORS.WHITE,
    backgroundColor: COLORS.TRANSPARENT,
  },
  headerImage: {
    position: 'absolute',
    width: fullWidth,
    height: 40,
    resizeMode: 'cover',
    bottom: 0,
  },
});

export const splashPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  brandText: {
    marginTop: 70,
    fontSize: 40,
    color: COLORS.WHITE,
  },
  logo: {
    marginVertical: 50,
    height: 150,
    width: 150,
  },
});

export const landingPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  brandText: {
    marginTop: 50,
    ...font(40),
    color: COLORS.WHITE,
  },
  logo: {
    marginVertical: 50,
    height: 150,
    width: 150,
  },
  typeText: {
    color: COLORS.WHITE,
    ...font(20),
    marginHorizontal: 40,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 20,
  },
});

export const selectionPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  mainText: {
    ...font(40),
    marginTop: 15,
    color: COLORS.WHITE,
    marginBottom: 40,
  },
  logo: {
    marginTop: 45,
    marginBottom: 35,
    height: 55,
    width: 55,
  },
  button: {
    marginVertical: 30,
  },
});

export const signupPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  mainText: {
    ...font(35),
    marginTop: 15,
    color: COLORS.WHITE,
    marginBottom: 20,
  },
  logo: {
    marginTop: 45,
    marginBottom: 35,
    height: 55,
    width: 55,
  },
  button: {
    marginVertical: 30,
  },
});

export const loginPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  mainText: {
    ...font(40),
    marginTop: 15,
    color: COLORS.WHITE,
    marginBottom: 20,
  },
  logo: {
    marginTop: 45,
    marginBottom: 35,
    height: 55,
    width: 55,
  },
  button: {
    marginTop: fullHeight - 540,
  },
  forgotPasswordButton: {
    marginTop: 15,
  },
  forgotPasswordButtonText: {
    ...font(14),
    textAlign: 'center',
    color: COLORS.WHITE,
  },
});

export const chatPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 8,
  },
  headerText: {
    marginLeft: fullWidth / 2 - 120,
    flex: 1,
  },
  postButton: {
    paddingVertical: 4,
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor: COLORS.WHITE,
    shadowColor: alpha(COLORS.BLACK, 0.4),
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 2,
    marginRight: 15,
  },
  postButtonText: {
    ...font(15),
    color: COLORS.PRIMARY,
  },
  hintView: {
    backgroundColor: alpha(COLORS.PRIMARY, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  hintText: {
    ...font(12),
    color: COLORS.DARK_TEXT,
    textAlign: 'center',
  },
  upArrowImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 20,
  },
  chatScroll: {
    backgroundColor: COLORS.WHITE,
  },
  chatContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  botBubbleImage: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    left: 40,
  },
  userBubbleImage: {
    height: 14,
    width: 14,
    position: 'absolute',
    resizeMode: 'contain',
    bottom: -3,
    right: 34,
  },
  chatImage: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginHorizontal: 5,
  },
  chatBotTextContainer: {
    backgroundColor: COLORS.PRIMARY,
    padding: 8,
    borderRadius: 15,
    marginLeft: 5,
  },
  chatUserTextContainer: {
    backgroundColor: COLORS.CHAT_BG,
    padding: 8,
    borderRadius: 15,
    marginLeft: 45,
    marginRight: 5,
  },
  chatBotText: {
    ...font(17),
    backgroundColor: COLORS.TRANSPARENT,
    color: COLORS.WHITE,
    width: fullWidth - 120,
  },
  chatUserText: {
    ...font(17),
    backgroundColor: COLORS.TRANSPARENT,
    width: fullWidth - 120,
  },
  chatButtonContainer: {
    flexDirection: 'row',
    marginLeft: 70,
  },
  chatButton: {
    backgroundColor: COLORS.CHAT_BG,
    borderColor: COLORS.PRIMARY,
    padding: 5,
    paddingHorizontal: 30,
    marginRight: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: 12,
  },
  chatButtonText: {
    ...font(14),
    color: COLORS.PRIMARY,
  },
  chatInputContainer: {
    backgroundColor: COLORS.ALMOST_WHITE,
    marginHorizontal: 20,
    paddingRight: 5,
    paddingLeft: 10,
    minHeight: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.CHAT_INPUT_BORDER,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInput: {
    width: fullWidth - 85,
    maxWidth: fullWidth - 85,
    ...font(16),
  },
  chatSendButton: {
    marginLeft: 10,
    marginBottom: 4,
    alignSelf: 'flex-end',
  },
  chatSendImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export const questionPageStyle = StyleSheet.create({
  inputWrapper: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 5,
  },
  inputContainer: {
    backgroundColor: COLORS.ALMOST_WHITE,
    marginHorizontal: 10,
    paddingRight: 5,
    paddingLeft: 10,
    minHeight: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.CHAT_INPUT_BORDER,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: fullWidth - 75,
    maxWidth: fullWidth - 75,
    ...font(16),
  },
  sendButton: {
    marginLeft: 10,
    marginBottom: 4,
    alignSelf: 'flex-end',
  },
  sendImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export const categorySelectionPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  backButton: {
    top: 22,
  },
});


export const askQuestionPageStyle = StyleSheet.create({
  container: {
    backgroundColor: alpha(COLORS.PRIMARY, 0.05),
  },
  hintView: {
    backgroundColor: alpha(COLORS.PRIMARY, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  hintText: {
    ...font(fullWidth < 350 ? 9 : 11),
    color: COLORS.DARK_TEXT,
    textAlign: 'center',
  },
  questionContainer: {
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.WHITE,
    width: fullWidth - 16,
    alignSelf: 'center',
    marginVertical: 10,
  },
  topLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: COLORS.SECONDARY,
    ...font(16),
  },
  textInputContainer: {
    borderColor: COLORS.SECONDARY,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
    padding: 5,
  },
  countLine: {
    textAlign: 'right',
    marginRight: 10,
    ...font(12),
    color: COLORS.SECONDARY,
    marginVertical: 4,
  },
  textInput: {
    height: 100,
    ...font(14),
  },
  askButton: {
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    marginVertical: 5,
    paddingVertical: 15,
  },
  askButtonText: {
    color: COLORS.WHITE,
  },
});

export const categoryDrawerStyle = StyleSheet.create({
  header: {
    paddingTop: 36,
    paddingBottom: 13,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    flexDirection: 'row',
  },
  headerText: {
    ...font(13),
    textAlign: 'center',
    color: COLORS.WHITE,
    backgroundColor: COLORS.TRANSPARENT,
    marginLeft: 50,
    flex: 1,
  },
  headerImage: {
    position: 'absolute',
    width: 280,
    height: 40,
    resizeMode: 'cover',
    bottom: 0,
  },
  postButton: {
    paddingVertical: 4,
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor: COLORS.WHITE,
    shadowColor: alpha(COLORS.BLACK, 0.4),
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 2,
    marginRight: 15,
  },
  postButtonText: {
    ...font(12),
    color: COLORS.PRIMARY,
  },
});

export const profilePageStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    position: 'absolute',
    width: fullWidth,
    height: 150,
    resizeMode: 'cover',
    bottom: 0,
  },
});
