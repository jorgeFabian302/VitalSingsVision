import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootStackParams } from '../Navigator/NavigatorControler';
import { useEffect, useState } from 'react';
import { Consulta, Data, Doctor, Paciente } from '../interfaces/interfaces';
import { ChatBotScreen } from '../Components/shared/ChatBot/ChatBotScreen';
import { ButtonChatbot } from '../Components';
import { StylesHomeSettings } from '../Styles/StylesHomeSettings';
import LinearGradient from 'react-native-linear-gradient';
import { Diagrams } from '../Components/shared/Diagrams';

export const DiagnosisScreen = () => {
  const params = useRoute<RouteProp<RootStackParams, 'DiagnosisScreen'>>().params;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [UserP, setUserP] = useState<Paciente>();
  const [UserD, setUserD] = useState<Doctor>();
  const [UserDPR, setUserDPR] = useState<Data>();
  const [ConsultData, setConsultData] = useState<Consulta>();
  const [ChatVisible, setChatVisible] = useState(false);

  useEffect(() => {
    if (params != undefined) {
      setUserP(params.RevisionCardiaca?.paciente);
      setUserD(params.RevisionCardiaca?.doctor);
      setConsultData(params.RevisionCardiaca);
      setUserDPR(params.UserDpr);
    }
  })


  return (
    <View style={{ flex: 1 }}>
      <View style={StylesSheetScreen.container}>
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('InfoUserSCreen', { User: UserP?.data })}>
            <LinearGradient
              colors={['#00668C', '#D4EAF7']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StylesHomeSettings.ButtonUser}
            >
              <Image source={require('../Image/User.png')} style={StylesHomeSettings.UserContainer} resizeMode='contain' />
              <Text style={{ fontSize: 25, marginTop: 10, color: '#FFFEFB' }}>Welcome Dr. {UserDPR?.Apellidos}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('InfoUserSCreen', { User: UserP?.data })}>
            <LinearGradient
              colors={['#00668C', '#D4EAF7']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StylesSheetScreen.ButtonDoctor}
            >
              <Image source={require('../Image/User.png')} style={StylesSheetScreen.DoctorContainer} resizeMode='contain' />
              <View style={{ height: '100%', marginHorizontal: 10 }}>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#FFFEFB', fontSize: 20 }}>Diagnosis made to:</Text>
                </View>
                <Text style={{ color: '#FFFEFB', fontSize: 19 }}>{UserP?.data.Nombre}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View>
          <Diagrams Consultas={ConsultData} />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('InfoUserSCreen', { User: UserD?.data })}>
            <LinearGradient
              colors={['#00668C', '#D4EAF7']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StylesSheetScreen.ButtonDoctor}
            >
              <Image source={require('../Image/User.png')} style={StylesSheetScreen.DoctorContainer} resizeMode='contain' />
              <View style={{ height: '100%', marginHorizontal: 10 }}>
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: '#FFFEFB', fontSize: 20 }}>Last diagnosis made by:</Text>
                </View>
                <Text style={{ color: '#FFFEFB', fontSize: 19 }}>{"Dr. " + UserD?.data.Nombre}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 35 }}>
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

export const StylesSheetScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ButtonDoctor: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    height: 65,
    width: Dimensions.get('window').width * 0.95, // Utiliza porcentaje en lugar de dimensiones fijas
  },
  DoctorContainer: {
    backgroundColor: '#FFFEFB',
    borderRadius: 100,
    marginHorizontal: 25,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
})