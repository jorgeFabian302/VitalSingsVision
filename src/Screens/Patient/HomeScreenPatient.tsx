import React, { useState } from 'react'
import {Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import { StylesHomeSettings } from '../../Styles/StylesHomeSettings';
import { Diagrams } from '../../Components/shared/Diagrams';
import { ButtonChatbot } from '../../Components';
import { ChatBotScreen } from '../../Components/shared/ChatBot/ChatBotScreen';


export const HomeScreenPatient = () => {
    const [ChatVisible, setChatVisible] = useState(false);
    const [Nombre, setNombre] = useState('Pedro Diaz');
    return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
        <View style={StylesHomeSettings.mainContainer}>
            <View style={{marginVertical:30}}>
                <TouchableOpacity>
                    <LinearGradient
                        colors={['#00668C', '#D4EAF7']}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0  }}
                        style={StylesHomeSettings.ButtonUser}
                    >
                        <View style={StylesHomeSettings.UserContainer}>
                            <Image  source={require('../../Image/User.png')}/>
                        </View>
                        <Text style={{ fontSize: 25, marginTop: 10, color: '#FFFEFB' }}>Bienvenido: {Nombre}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View>
                <Diagrams />
            </View>
        </View>
        { ChatVisible && (<View style={{
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


