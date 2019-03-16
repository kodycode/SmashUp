import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const styles = StyleSheet.create({
  LoginFormContainer: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBoxStyle: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  textMargin: {
    marginTop: 20
  },
  loginButtonMargin: {
    width: '30%',
    height: '10%',
    marginTop: 40,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButtonMargin: {
    width: '30%',
    height: '10%',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = styles
