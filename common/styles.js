import { StyleSheet } from 'react-native';
import COLORS from './colors';

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
  },
  centerAlign: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 50,
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
})