import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Data, Listconsults, Paciente } from '../../../interfaces/interfaces'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParams } from '../../../Navigator/NavigatorControler'

interface Props {
  UserP: Paciente,
  UserD: Data
}

export const PatientItem = ({ UserP, UserD }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [Estatus, setEstatus] = useState(false);
  const [ListconsultsP, setListconsultsP] = useState<Listconsults>();

  const ObtencionListaConsultas = async () => {
    if (!Estatus) {
      const response = await globalThis.fetch('http://10.0.2.2:4000/consultas', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ IdFPaciente:  UserP.IdPaciente}),
      });
      const responseData = await response.json();
      if(responseData.code === 200){
        setListconsultsP(responseData);
        setEstatus(true);
      }
    }
  }

  useEffect(() => {
    ObtencionListaConsultas();
  })
  


  return (
    <TouchableOpacity
      style={StylesSheet.ContinerTouchableOpacity}
      onPress={() => navigation.navigate('InfoScreen', { UserP: UserP, UserD: UserD, Listconsults: ListconsultsP })}>
      <View style={StylesSheet.Container}>
        <View style={StylesSheet.Containerimg}>
          <Image source={require('../../../Image/User.png')} style={StylesSheet.img} resizeMode='contain' />
        </View>
        <View style={StylesSheet.Containertext}>
          <Text style={StylesSheet.textitem}>{UserP.data.Nombre + " " + UserP.data.Apellidos}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const StylesSheet = StyleSheet.create({
  ContinerTouchableOpacity: {
    backgroundColor: '#F5F4F1',
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 5,
    height: 50,
    width: 360,
  },
  Container: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  Containertext: {
    justifyContent: 'center',
  },
  textitem: {
    fontSize: 15,
  },
  Containerimg: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  img: {
    backgroundColor: '#FFFEFB',
    borderRadius: 100,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
})
