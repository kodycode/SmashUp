import { StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

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
  }
})

module.exports = styles
