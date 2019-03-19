import { StyleSheet, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  DirectionContainer: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    width: '100%'
  },
  TextStyle: {
    fontFamily: 'gotham-medium'
  },
  rejectButtonTextStyle: {
    fontFamily: 'gotham-medium',
    fontSize: 50,
    color: '#FF6347'
  },
  requestButtonTextStyle: {
    fontFamily: 'gotham-medium',
    fontSize: 50,
    color: 'lightseagreen'
  },
  profileContainer: {
    width: '100%',
    height: '80%'
  },
  buttonContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingLeft: 30,
    paddingRight: 30
  },
  buttonStyle: {
    width: width * 0.2,
    height: height * 0.1,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height: '100%'
  }
})

module.exports = styles
