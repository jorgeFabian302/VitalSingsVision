import { StyleSheet } from 'react-native'

export const StylesSettings = StyleSheet.create({

  mainContainer:{
    flex: 1,
    backgroundColor: '#FFFEFB',
  },
  Container:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSVG:{
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  Titlee:{
    fontSize: 80,
    color: '#373435',
    fontWeight: 'bold',

  },
  SubTitle:{
    fontSize:10,
  },
  InputBox:{
    height: 50,
    width: '80%',
    padding: 10,
    fontSize: 20,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    paddingStart: 30,
    borderColor: '#F5F4F1',
    backgroundColor: '#F5F4F1',
  }
})
