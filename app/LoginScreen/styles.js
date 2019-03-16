import { StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { dimHeight, dimWidth } = Dimensions.get('window')

const styles = StyleSheet.create({
  ViewContainer: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    flexDirection: 'column',
    alignItems: 'center'
  },
  LoginMessageStyle: {
    textAlign: 'center',
    fontFamily: 'gotham-medium',
    fontSize: 20
  },
  SmashballContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  LoginButton: {
    width: '50%',
    height: '10%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'white'
  },
  LoginText: {
    color: 'white',
    fontFamily: 'gotham'
  }
})

module.exports = styles
