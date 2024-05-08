import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { ChatBotScreen } from '../../Components/shared/ChatBot/ChatBotScreen';
import { ButtonChatbot } from '../../Components';
import { Data, ListPatient, Paciente } from '../../interfaces/interfaces';
import LinearGradient from 'react-native-linear-gradient';
import { StylesHomeSettings } from '../../Styles/StylesHomeSettings';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../Navigator/NavigatorControler';
import { PatientItem } from '../../Components/shared/List/PatientItem';

interface Props {
  User: Data,
}

export const HomeScreenDoctor = ({ User }: Props) => {
  const [ChatVisible, setChatVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [ListPatient, setListPatient] = useState<ListPatient>();
  const [ListEstatus, setListEstatus] = useState(false);

  const ObtencionListaPaicente = async () => {
    if (!ListEstatus) {
      const response = await globalThis.fetch('http://10.0.2.2:4000/pacientes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const responseData = await response.json();
      if (responseData.code === 200) {
        setListPatient(responseData);
        setListEstatus(true);
      }
    }
  }

  useEffect(() => {
    ObtencionListaPaicente();
  }, [])


  return (
    <View style={{ flex: 1,  justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems:'center' }}>
        <View style={{ marginVertical: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate('InfoUserSCreen', { User: User })}>
            <LinearGradient
              colors={['#00668C', '#D4EAF7']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StylesHomeSettings.ButtonUser}
            >
              <Image source={require('../../Image/User.png')} style={StylesHomeSettings.UserContainer} resizeMode='contain' />
              <Text style={{ fontSize: 25, marginTop: 10, color: '#FFFEFB' }}>Welcome: {User.Apellidos}</Text>
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
            {
              ListEstatus && (
                <View style={{ alignItems: 'center', marginTop: 5, }}>
                  <View style={{ marginVertical: 10 }}>
                    <Text style={{ fontSize: 40, color: '#FFFEFB' }}>Patient List</Text>
                  </View>
                  <FlatList
                    data={ListPatient?.listpatient.pacientes}
                    renderItem={({ item }) => <PatientItem UserP={item} UserD={User} FlagCreateConsult={true}/>}
                    keyExtractor={item => item.IdPaciente.toString()}
                  />
                </View>)
            }
          </ LinearGradient>
        </View>
        <View style={{ flex: 1, marginTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <LinearGradient
              colors={['#941C20', '#FB3D61']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StylesHomeSettings.ButtomGeneral}
            >
              <Text style={{ fontSize: 20, color: '#FFFEFB' }}>Exit</Text>
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
