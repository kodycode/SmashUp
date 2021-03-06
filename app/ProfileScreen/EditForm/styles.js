import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  EditFormContainer: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    marginTop: (width * 0.2)
  },
  textBoxStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 5,
    width: width * 0.94
  },
  textMargin: {
    marginTop: 20,
    fontFamily: 'gotham'
  },
  doneButtonMargin: {
    marginTop: 15,
    width: width * 0.3,
    height: height * 0.1,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  closeButtonContainer: {
    alignItems: 'flex-end'
  },
  closeButtonMargin: {
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15
  },
  tempfix: {
    height: height / 2
  }
})

module.exports = styles
