import { Dimensions, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  backButton: {
    marginLeft: 10,
    color: 'white',
    fontSize: (height * 0.1) / 2
  },
  topBar: {
    backgroundColor: 'gray',
    marginTop: getStatusBarHeight(),
    height: height * 0.1
  },
  nameContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: width,
    height: height * 0.1
  },
  nameTextStyle: {
    fontFamily: 'gotham-medium',
    color: 'white',
    fontSize: 25
  }
})

module.exports = styles
