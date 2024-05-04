import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { ButtonChatbot } from '../../Components'
import { Data } from '../../interfaces/interfaces'
import { StylesHomeSettings } from '../../Styles/StylesHomeSettings'
import { ChatBotScreen } from '../../Components/shared/ChatBot/ChatBotScreen'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../Navigator/NavigatorControler'


interface Props {
    UserP: Data,
}

const HomeScreenDataU = ({ UserP }: Props) => {
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
                <View style={{ flex: 1, marginTop: 480 }}>
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

export default HomeScreenDataU