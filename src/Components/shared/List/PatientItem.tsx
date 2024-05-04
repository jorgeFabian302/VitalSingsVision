import { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Data, Doctor, Listconsults, Paciente } from '../../../interfaces/interfaces'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParams } from '../../../Navigator/NavigatorControler'

interface Props {
  UserP: Paciente,
  UserD: Data
}

export const PatientItem = ({ UserP, UserD }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <TouchableOpacity
      style={StylesSheet.ContinerTouchableOpacity}
      onPress={() => navigation.navigate('InfoScreen', { UserP: UserP, UserD:UserD })}>
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
