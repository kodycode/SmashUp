import { StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  EditFormContainer: {
    flexDirection: 'column',
    marginTop: -(height * 0.7)
  },
  textBoxStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    padding: 5,
    width: '50%'
  },
  bioTextBoxStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: (width * 0.9),
    padding: 5
  },
  textMargin: {
    marginTop: 20,
    fontFamily: 'gotham'
  },
  editButtonMargin: {
    width: '30%',
    height: '10%',
    marginTop: 40,
    borderWidth: 0.5,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  closeButtonContainer: {
    flex: 1,
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
