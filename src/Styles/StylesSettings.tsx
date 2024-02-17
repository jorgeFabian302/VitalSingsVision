import { StyleSheet} from 'react-native';

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
    borderRadius: 30,
    paddingStart: 30,
    backgroundColor: '#F5F4F1',
  },
  ContainerButton:{
    flex: 1,
    width: '75%',
    padding: 50,
  },
  InputButtom:{
    height: 50,
    borderRadius: 30,
    alignItems:'center',
    justifyContent:'center',
  },
  TextButton:{
    fontSize: 24,
    //#A3A2A0
    //#ADACAA
    color: '#ffffff',
  },
  SubText:{
    fontSize: 17,
    color:'#ADACAA'
  }
})
