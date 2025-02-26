import { Dimensions, StyleSheet} from 'react-native';

export const StylesSettings = StyleSheet.create({

  mainContainer:{
    flex: 1,
    backgroundColor: '#FFFEFB',
  },
  Container:{
    flex: 2,
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
    color:'black',
  },
  InputBox1:{
    height: 50,
    width: '80%',
    padding: 10,
    fontSize: 20,
    borderRadius: 30,
    paddingStart: 30,
    backgroundColor: '#F5F4F1',
    color:'black',
  },
  ContainerButton:{
    flex: 1,
    width: '60%',
    marginTop: 30,
    height: 40,
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
  },
  dropdown: {
    width: Dimensions.get('window').width * 0.8, // Utiliza porcentaje en lugar de dimensiones fijas
    height: 50,
    backgroundColor: '#F5F4F1',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 30,
    marginTop: 20,
  },
  PikckerStyle: {
    fontSize: 20, 
    color: '#626260',
  },
})
