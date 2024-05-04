import React, { useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Data, Doctor, Listconsults, Paciente } from '../interfaces/interfaces'
import { RootStackParams } from '../Navigator/NavigatorControler';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { StylesHomeSettings } from '../Styles/StylesHomeSettings';
import { ChatBotScreen } from '../Components/shared/ChatBot/ChatBotScreen';
import { ButtonChatbot } from '../Components';

export const InfoScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const params = useRoute<RouteProp<RootStackParams, 'InfoScreen'>>().params;
  const [Listconsults, setListconsults] = useState<Listconsults>();
  const [UserP, setUserP] = useState<Paciente>(params.UserP);
  const [UserD, setUserD] = useState<Data>(params.UserD);
  const [Estaus, setEstaus] = useState(false);
  const [ChatVisible, setChatVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheetScreen.ContainerPrincipal}>
        <View style={{ marginVertical: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate('InfoUserSCreen', { User: UserD })}>
            <LinearGradient
              colors={['#00668C', '#D4EAF7']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StylesHomeSettings.ButtonUser}
            >
              <Image source={require('../Image/User.png')} style={StylesHomeSettings.UserContainer} resizeMode='contain' />
              <Text style={{ fontSize: 25, marginTop: 10, color: '#FFFEFB' }}>Welcome Dr: {UserD.Apellidos}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={StylesHomeSettings.ContainerList}>
          <LinearGradient
            colors={['#00668C', '#D4EAF7']}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={StylesHomeSettings.ContainerFlatList}
          >
            { /*
              ListEstatus && (
                <View style={{ alignItems: 'center', marginTop: 5, }}>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 40, color: '#FFFEFB' }}>Patient List</Text>
                  </View>
                  <FlatList
                    data={ListPatient?.listpatient.pacientes}
                    renderItem={({ item }) => <PatientItem UserP={item} UserD={User} />}
                    keyExtractor={item => item.IdPaciente.toString()}
                  />
                </View>) */
            }
          </ LinearGradient>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LinearGradient
              colors={['#00668C', '#D4EAF7']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StylesHomeSettings.ButtomGeneral}
            >
              <Text style={{ fontSize: 20, color: '#FFFEFB' }}>Back</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
      {ChatVisible && (<View style={{
        position: 'absolute',
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').height * 0.75,
        backgroundColor: 'white',
        alignItems: 'center',
        marginHorizontal: 20
      }}>
        <ChatBotScreen />
      </View>)}
      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', marginEnd: 10 }}>
        <ButtonChatbot onPress={() => setChatVisible(!ChatVisible)} />
      </View>
    </View>
  )
}

export const StyleSheetScreen = StyleSheet.create({
  ContainerPrincipal: {
    alignItems: 'center',
    flex: 1,
  },
})

