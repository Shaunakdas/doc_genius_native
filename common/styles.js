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
  scroll: {
    flex: 1,
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
  backImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    fontSize: 18,
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
    backgroundColor: COLORS.PALE_GREY,
    borderColor: alpha(COLORS.BLACK, 0.3),
    borderTopWidth: 1,
    height: 50,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabText: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
  },
  headerText: {
    fontSize: 14,
    textAlign: 'center',
    color: COLORS.WHITE,
  },
});

export const splashPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  brandText: {
    marginTop: 70,
    fontSize: 48,
    color: COLORS.WHITE,
  },
  logo: {
    marginTop: 50,
    height: 180,
    width: 180,
  },
});

export const landingPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  brandText: {
    marginTop: 70,
    ...font(48),
    color: COLORS.WHITE,
  },
  logo: {
    marginVertical: 50,
    height: 180,
    width: 180,
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
    fontSize: 40,
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
    fontSize: 35,
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
    fontSize: 40,
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
    marginTop: fullHeight - 450,
  },
});

export const chatPageStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: fullWidth / 2 - 145,
    flex: 1,
  },
  postButton: {
    paddingVertical: 4,
    borderRadius: 2,
    paddingHorizontal: 12,
    backgroundColor: COLORS.WHITE,
    shadowColor: alpha(COLORS.BLACK, 0.4),
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 2,
    marginRight: 5,
  },
  postButtonText: {
    fontSize: 15,
    color: COLORS.PRIMARY,
  },
});
