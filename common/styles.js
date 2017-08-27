import { StyleSheet, Dimensions } from 'react-native';
import COLORS, { alpha } from './colors';

const {width: fullWidth, height: fullHeight } = Dimensions.get('window');

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
    fontSize: 24,
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
    fontSize: 16,
    color: COLORS.PRIMARY,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems:'center',
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
});

export const landingPageStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY,
  },
  brandText: {
    fontSize: 40,
    color: COLORS.WHITE,
  },
  logo: {
    marginVertical: 50,
    height: 110,
    width: 110,
  },
  typeText: {
    color: COLORS.WHITE,
    fontSize: 24,
    marginHorizontal: 40,
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 20,
  }
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
    marginVertical: 35,
    height: 60,
    width: 60,
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
    fontSize: 40,
    marginTop: 15,
    color: COLORS.WHITE,
    marginBottom: 20,
  },
  logo: {
    marginVertical: 35,
    height: 60,
    width: 60,
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
    marginVertical: 35,
    height: 60,
    width: 60,
  },
  button: {
   marginTop: fullHeight - 500,
  },
});