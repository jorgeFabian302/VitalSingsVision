import { useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ButtonChatbot } from '../../Components'
import { Diagrams } from '../../Components/shared/Diagrams'
import { StylesHomeSettings } from '../../Styles/StylesHomeSettings'
import { ChatBotScreen } from '../../Components/shared/ChatBot/ChatBotScreen'
import { ConsultaClass, Data, Doctor } from '../../interfaces/interfaces';
import { RootStackParams } from '../../Navigator/NavigatorControler';


interface Props {
    UserP: Data,
    RevisionCardiaca?: ConsultaClass,
    UserD?: Doctor,

}

const HomeSCreenDataP = ({ UserP, RevisionCardiaca, UserD }: Props) => {
    const [ChatVisible, setChatVisible] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={StylesHomeSettings.mainContainer}>
                <View style={{ marginVertical: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('InfoUserSCreen', { User: UserP })}>
                        <LinearGradient
                            colors={['#00668C', '#D4EAF7']}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={StylesHomeSettings.ButtonUser}
                        >
                            <Image source={require('../../Image/User.png')} style={StylesHomeSettings.UserContainer} resizeMode='contain' />
                            <Text style={{ fontSize: 25, marginTop: 10, color: '#FFFEFB' }}>Welcome: {UserP.Nombre}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View>
                    {/* Saldra el diagrma si se encuentra alguna consulta hecha a los pacientes */}
                    <Diagrams Consultas={RevisionCardiaca?.consulta} />
                </View>
                <View style={{ marginTop: 30 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('InfoUserSCreen', { User: UserD?.data })}>
                        <LinearGradient
                            colors={['#00668C', '#D4EAF7']}
                            start={{ x: 1, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            style={StylesHomeSettings.ButtonDoctor}
                        >
                            <Image source={require('../../Image/User.png')} style={StylesHomeSettings.DoctorContainer} resizeMode='contain' />
                            <View style={{ height: '100%', marginHorizontal: 10 }}>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ color: '#FFFEFB', fontSize: 20 }}>Last diagnosis made by:</Text>
                                </View>
                                <Text style={{ color: '#FFFEFB', fontSize: 19 }}>{"Dr. " + UserD?.data.Nombre}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginTop: 45 }}>
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

export default HomeSCreenDataP